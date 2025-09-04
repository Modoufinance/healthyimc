import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from 'react';

export const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100);
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    setIsProcessing(true);

    try {
      // Get user session for email
      const { data: { session } } = await supabase.auth.getSession();
      let customerEmail = session?.user?.email;

      // If no session, prompt for email
      if (!customerEmail) {
        customerEmail = prompt("Veuillez entrer votre email pour continuer:");
        if (!customerEmail) {
          setIsProcessing(false);
          return;
        }
      }

      const checkoutItems = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      const { data, error } = await supabase.functions.invoke('create-product-checkout', {
        body: {
          items: checkoutItems,
          customerEmail,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      if (data.url) {
        window.open(data.url, '_blank');
        clearCart();
        toast.success("Redirection vers le paiement...");
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Erreur lors du processus de paiement");
    } finally {
      setIsProcessing(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Panier ({totalItems} article{totalItems !== 1 ? 's' : ''})</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full pt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Votre panier est vide
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      {item.product.image_url && (
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image_url} 
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.product.title}
                        </h4>
                        <p className="text-lg font-semibold text-primary">
                          {formatPrice(item.product.price, item.product.currency)}
                        </p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </div>
                    </div>
                    
                    <Separator />
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">
                    {formatPrice(getTotalPrice(), items[0]?.product.currency || 'eur')}
                  </span>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                >
                  {isProcessing ? 'Traitement...' : 'Procéder au paiement'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearCart}
                  disabled={items.length === 0}
                >
                  Vider le panier
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};