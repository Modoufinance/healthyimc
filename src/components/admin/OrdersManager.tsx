import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Eye,
  Calendar
} from "lucide-react";
import { OrderWithItems } from '@/types/ecommerce';
import { ecommerceService } from '@/services/ecommerceService';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await ecommerceService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payé';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      case 'refunded':
        return 'Remboursé';
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    paid: orders.filter(o => o.status === 'paid').length,
    pending: orders.filter(o => o.status === 'pending').length,
    failed: orders.filter(o => o.status === 'failed').length,
    revenue: orders
      .filter(o => o.status === 'paid')
      .reduce((sum, o) => sum + o.total_amount, 0),
  };

  if (loading) {
    return <div className="p-6">Chargement des commandes...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <ShoppingBag className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
          <p className="text-muted-foreground">
            {orders.length} commande{orders.length !== 1 ? 's' : ''} au total
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Payées</p>
                <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Échouées</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenus</p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(stats.revenue, 'eur')}
                </p>
              </div>
              <div className="text-primary">€</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
            <p className="text-muted-foreground">
              Les commandes apparaîtront ici une fois que les clients commenceront à acheter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold">
                        Commande #{order.id.slice(0, 8)}
                      </h3>
                      <Badge variant={getStatusVariant(order.status)} className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{getStatusLabel(order.status)}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Client</p>
                        <p className="font-medium">{order.customer_email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(order.created_at)}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Montant</p>
                        <p className="font-bold text-lg text-primary">
                          {formatPrice(order.total_amount, order.currency)}
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Produits ({order.order_items.length})
                      </p>
                      <div className="space-y-2">
                        {order.order_items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 text-sm">
                            {item.product?.image_url && (
                              <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.product.image_url} 
                                  alt={item.product.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <span className="flex-1">{item.product?.title}</span>
                            <span className="text-muted-foreground">x{item.quantity}</span>
                            <span className="font-medium">
                              {formatPrice(item.price * item.quantity, order.currency)}
                            </span>
                          </div>
                        ))}
                        {order.order_items.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{order.order_items.length - 2} autre{order.order_items.length - 2 !== 1 ? 's' : ''} produit{order.order_items.length - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                    className="ml-4"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Détails de la commande #{selectedOrder.id.slice(0, 8)}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <Badge variant={getStatusVariant(selectedOrder.status)} className="flex items-center space-x-1 w-fit">
                    {getStatusIcon(selectedOrder.status)}
                    <span>{getStatusLabel(selectedOrder.status)}</span>
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date de commande</p>
                  <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email client</p>
                  <p className="font-medium">{selectedOrder.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Stripe</p>
                  <p className="font-mono text-xs">{selectedOrder.stripe_session_id || 'N/A'}</p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-4">Produits commandés</h4>
                <div className="space-y-3">
                  {selectedOrder.order_items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                      {item.product?.image_url && (
                        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image_url} 
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.product?.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price, selectedOrder.currency)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity, selectedOrder.currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {formatPrice(selectedOrder.total_amount, selectedOrder.currency)}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};