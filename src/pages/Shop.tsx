import React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { ProductsList } from '@/components/shop/ProductsList';
import { CartSidebar } from '@/components/shop/CartSidebar';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import AdSense from '@/components/AdSense';

const Shop: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CartProvider>
      <SEO 
        title="Boutique - Produits Santé Digitaux | IMC Santé"
        description="Découvrez notre sélection de produits digitaux pour votre santé : e-books, programmes personnalisés, guides nutrition et plus encore."
        keywords="boutique santé, produits digitaux, ebooks santé, programmes fitness, guides nutrition, IMC"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
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
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Boutique Santé</h1>
                  <p className="text-muted-foreground">Produits digitaux pour votre bien-être</p>
                </div>
              </div>
            </div>
            
            <CartSidebar />
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">
                Transformez votre santé avec nos produits digitaux
              </h2>
              <p className="text-muted-foreground text-lg">
                Découvrez notre collection exclusive d'e-books, programmes d'entraînement personnalisés, 
                guides nutrition et vidéos d'experts pour atteindre vos objectifs santé.
              </p>
            </div>
          </div>

          {/* AdSense avant les produits */}
          <div className="mb-8 flex justify-center">
            <AdSense 
              adSlot="5555555555"
              adFormat="horizontal"
              className="max-w-4xl"
              style={{ minHeight: '100px' }}
            />
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Nos Produits</h3>
            <ProductsList />
          </div>

          {/* AdSense après les produits */}
          <div className="mb-8 flex justify-center">
            <AdSense 
              adSlot="6666666666"
              adFormat="auto"
              className="max-w-2xl"
              style={{ minHeight: '200px' }}
            />
          </div>

          {/* Footer Info */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <h4 className="font-semibold text-lg mb-2">🔒 Achat 100% Sécurisé</h4>
            <p className="text-muted-foreground text-sm">
              Paiement sécurisé par Stripe • Téléchargement instantané • Support client 24/7
            </p>
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default Shop;