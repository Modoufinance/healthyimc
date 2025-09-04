import React, { useState, useEffect } from 'react';
import { Product } from '@/types/ecommerce';
import { ProductCard } from './ProductCard';
import { ecommerceService } from '@/services/ecommerceService';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { toast } from "sonner";

export const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ecommerceService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Impossible de charger les produits. Veuillez réessayer.');
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

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.title} ajouté au panier`);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">
          Aucun produit disponible pour le moment
        </h3>
        <p className="text-muted-foreground mt-2">
          Revenez bientôt pour découvrir nos produits digitaux !
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {selectedProduct.image_url && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={selectedProduct.image_url} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(selectedProduct.price, selectedProduct.currency)}
                </div>
                
                {selectedProduct.description && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {selectedProduct.description}
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="w-full"
                  size="lg"
                >
                  Ajouter au panier - {formatPrice(selectedProduct.price, selectedProduct.currency)}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};