import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  twoFactorEnabled: boolean;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (username: string, password: string, totpCode?: string, recaptchaToken?: string) => Promise<{ success: boolean; error?: string; requires2FA?: boolean; requiresCaptcha?: boolean }>;
  logout: () => Promise<void>;
  loading: boolean;
  setupTwoFactor: () => Promise<{ secret: string; qrCode: string }>;
  verifyTwoFactor: (totpCode: string) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifySession();
  }, []);

  const verifySession = async () => {
    const token = localStorage.getItem('admin_session_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth/verify-session', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!error && data?.success) {
        setAdminUser(data.user);
      } else {
        localStorage.removeItem('admin_session_token');
      }
    } catch (error) {
      console.error('Session verification error:', error);
      localStorage.removeItem('admin_session_token');
    }

    setLoading(false);
  };

  const login = async (username: string, password: string, totpCode?: string, recaptchaToken?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth/login', {
        body: {
          username,
          password,
          totpCode,
          recaptchaToken,
        },
      });

      if (!error && data?.success) {
        localStorage.setItem('admin_session_token', data.sessionToken);
        setAdminUser(data.user);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data?.error || 'Erreur de connexion',
          requires2FA: data?.requires2FA,
          requiresCaptcha: data?.requiresCaptcha
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('admin_session_token');
    if (token) {
      try {
        await supabase.functions.invoke('admin-auth/logout', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('admin_session_token');
    setAdminUser(null);
  };

  const setupTwoFactor = async () => {
    const token = localStorage.getItem('admin_session_token');
    if (!token) throw new Error('Non autorisé');

    const { data, error } = await supabase.functions.invoke('admin-auth/setup-2fa', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (error) {
      throw new Error('Erreur lors de la configuration 2FA');
    }

    return { secret: data.secret, qrCode: data.qrCode };
  };

  const verifyTwoFactor = async (totpCode: string) => {
    const token = localStorage.getItem('admin_session_token');
    if (!token) return false;

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth/verify-2fa', {
        body: { totpCode },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!error && data?.success) {
        // Update user state to reflect 2FA is now enabled
        if (adminUser) {
          setAdminUser({ ...adminUser, twoFactorEnabled: true });
        }
        return true;
      }
    } catch (error) {
      console.error('2FA verification error:', error);
    }

    return false;
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      login,
      logout,
      loading,
      setupTwoFactor,
      verifyTwoFactor,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};