import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, CheckCircle, Clock, Mail } from "lucide-react";
import { OrderWithItems } from '@/types/ecommerce';
import { ecommerceService } from '@/services/ecommerceService';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from '@/components/SEO';

const MyPurchases: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check for success parameters
    const success = searchParams.get('success');
    const orderId = searchParams.get('order_id');
    
    if (success === 'true' && orderId) {
      // Verify payment
      verifyPayment(orderId);
      toast.success("Paiement confirmé ! Vos produits sont maintenant disponibles.");
    }

    loadUserAndOrders();
  }, [searchParams]);

  const loadUserAndOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setError("Vous devez être connecté pour voir vos achats.");
        return;
      }

      setUser(session.user);
      
      // Load orders
      const ordersData = await ecommerceService.getUserOrders(session.user.email);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Impossible de charger vos achats. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (orderId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order?.stripe_session_id) return;

      await supabase.functions.invoke('verify-payment', {
        body: {
          sessionId: order.stripe_session_id,
          orderId: orderId,
        },
      });

      // Reload orders to get updated status
      loadUserAndOrders();
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const handleDownload = async (productId: string, productTitle: string) => {
    if (!user?.email) {
      toast.error("Email utilisateur non disponible");
      return;
    }

    setDownloadingIds(prev => new Set(prev).add(productId));

    try {
      const { data, error } = await supabase.functions.invoke('get-download-link', {
        body: {
          productId,
          customerEmail: user.email,
        },
      });

      if (error) throw error;

      if (data.downloadUrl) {
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = productTitle;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success(`Téléchargement de "${productTitle}" démarré`);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Erreur lors du téléchargement");
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <SEO 
        title="Mes Achats - Téléchargements | IMC Santé"
        description="Accédez à tous vos produits digitaux achetés : e-books, programmes, guides. Téléchargement sécurisé et illimité."
        keywords="mes achats, téléchargements, produits digitaux, espace client"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mes Achats</h1>
              <p className="text-muted-foreground">
                Accédez à vos produits digitaux
              </p>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!user && !error && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Connexion requise</h3>
              <p className="text-muted-foreground mb-4">
                Vous devez être connecté pour accéder à vos achats.
              </p>
              <Button onClick={() => navigate('/auth')}>
                Se connecter
              </Button>
            </CardContent>
          </Card>
        )}

        {user && orders.length === 0 && !loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="p-3 bg-muted rounded-full w-fit mx-auto mb-4">
                <Download className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun achat</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore effectué d'achat.
              </p>
              <Button onClick={() => navigate('/boutique')}>
                Découvrir nos produits
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Commande du {formatDate(order.created_at)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Commande #{order.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={order.status === 'paid' ? 'default' : 'secondary'}
                        className="mb-2"
                      >
                        {order.status === 'paid' ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Payé</>
                        ) : (
                          <><Clock className="h-3 w-3 mr-1" /> En attente</>
                        )}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">
                      {formatPrice(order.total_amount, order.currency)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        {item.product?.image_url && (
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image_url} 
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium">{item.product?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantité: {item.quantity} • {formatPrice(item.price, order.currency)}
                          </p>
                        </div>
                      </div>
                      
                      {order.status === 'paid' && item.product && (
                        <Button 
                          onClick={() => handleDownload(item.product!.id, item.product!.title)}
                          disabled={downloadingIds.has(item.product.id)}
                          className="flex items-center space-x-2"
                        >
                          <Download className="h-4 w-4" />
                          <span>
                            {downloadingIds.has(item.product.id) 
                              ? 'Téléchargement...' 
                              : 'Télécharger'
                            }
                          </span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;