import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Eye, EyeOff, Shield, Lock, AlertTriangle, Smartphone } from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  
  const { login, adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (adminUser) {
      navigate('/admin/cms');
    }
  }, [adminUser, navigate]);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setRecaptchaLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const executeRecaptcha = async (): Promise<string> => {
    return new Promise((resolve) => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LcKrHQqAAAAAGbEw_Q8WpO_jF4kMzDnJ_example', { action: 'admin_login' })
            .then((token: string) => {
              resolve(token);
            });
        });
      } else {
        resolve('');
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (requires2FA && !totpCode) {
      setError('Code 2FA requis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let captchaToken = '';
      if (requiresCaptcha && recaptchaLoaded) {
        captchaToken = await executeRecaptcha();
        setRecaptchaToken(captchaToken);
      }

      const result = await login(username, password, totpCode, captchaToken);
      
      if (result.success) {
        toast({
          title: 'Connexion réussie',
          description: 'Bienvenue dans l\'administration',
        });
        navigate('/admin/cms');
      } else {
        setError(result.error || 'Erreur de connexion');
        
        if (result.requires2FA) {
          setRequires2FA(true);
        }
        
        if (result.requiresCaptcha) {
          setRequiresCaptcha(true);
        }
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Administration Sécurisée
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Accès réservé aux administrateurs autorisés
            </CardDescription>
          </div>
          
          {/* Security indicators */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary" className="text-xs">
              <Lock className="h-3 w-3 mr-1" />
              Chiffré
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Anti-bruteforce
            </Badge>
            {requiresCaptcha && (
              <Badge variant="outline" className="text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                reCAPTCHA
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom d'utilisateur"
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  disabled={loading}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 pr-10"
                  autoComplete="current-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-500" />
                  )}
                </Button>
              </div>
            </div>

            {requires2FA && (
              <div className="space-y-2">
                <Label htmlFor="totpCode" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Code de vérification 2FA
                </Label>
                <Input
                  id="totpCode"
                  type="text"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  disabled={loading}
                  className="text-center text-lg tracking-wider font-mono"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                <p className="text-xs text-slate-500 text-center">
                  Entrez le code à 6 chiffres de votre application d'authentification
                </p>
              </div>
            )}

            {requiresCaptcha && (
              <div className="text-center">
                <div 
                  className="g-recaptcha" 
                  data-sitekey="6LcKrHQqAAAAAGbEw_Q8WpO_jF4kMzDnJ_example"
                  data-size="compact"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Vérification reCAPTCHA requise après plusieurs tentatives
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500 space-y-2">
            <p>Connexion sécurisée avec chiffrement SSL/TLS</p>
            <p>Toutes les tentatives sont enregistrées et surveillées</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;