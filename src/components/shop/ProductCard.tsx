import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from '@/types/ecommerce';
import { useCart } from '@/contexts/CartContext';
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addItem } = useCart();

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.title} ajouté au panier`);
  };

  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105" onClick={onClick}>
      {product.image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {product.category || 'Digital'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {product.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            {formatPrice(product.price, product.currency)}
          </div>
          
          <Button onClick={handleAddToCart} size="sm" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};