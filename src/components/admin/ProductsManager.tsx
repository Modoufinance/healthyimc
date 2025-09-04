import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Package,
  Eye,
  EyeOff
} from "lucide-react";
import { Product } from '@/types/ecommerce';
import { ecommerceService } from '@/services/ecommerceService';
import { toast } from "sonner";

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'eur',
    category: 'digital',
    active: true,
    image_url: '',
    file_url: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ecommerceService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      currency: 'eur',
      category: 'digital',
      active: true,
      image_url: '',
      file_url: '',
    });
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreating(true);
  };

  const openEditDialog = (product: Product) => {
    setFormData({
      title: product.title,
      description: product.description || '',
      price: (product.price / 100).toString(),
      currency: product.currency,
      category: product.category || 'digital',
      active: product.active,
      image_url: product.image_url || '',
      file_url: product.file_url || '',
    });
    setEditingProduct(product);
  };

  const closeDialog = () => {
    setIsCreating(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const priceInCents = Math.round(parseFloat(formData.price) * 100);
      
      if (isNaN(priceInCents) || priceInCents <= 0) {
        toast.error('Veuillez entrer un prix valide');
        return;
      }

      const productData = {
        title: formData.title,
        description: formData.description || null,
        price: priceInCents,
        currency: formData.currency,
        category: formData.category,
        active: formData.active,
        image_url: formData.image_url || null,
        file_url: formData.file_url || null,
      };

      if (editingProduct) {
        await ecommerceService.updateProduct(editingProduct.id, productData);
        toast.success('Produit mis à jour avec succès');
      } else {
        await ecommerceService.createProduct(productData);
        toast.success('Produit créé avec succès');
      }

      closeDialog();
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      await ecommerceService.deleteProduct(id);
      toast.success('Produit supprimé avec succès');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100);
  };

  if (loading) {
    return <div className="p-6">Chargement des produits...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Package className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Gestion des Produits</h2>
            <p className="text-muted-foreground">
              {products.length} produit{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <Button onClick={openCreateDialog} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nouveau Produit</span>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit</h3>
            <p className="text-muted-foreground mb-4">
              Commencez par créer votre premier produit digital.
            </p>
            <Button onClick={openCreateDialog}>Créer un produit</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4 flex-1">
                    {product.image_url && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={product.image_url} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold truncate">
                          {product.title}
                        </h3>
                        <Badge 
                          variant={product.active ? "default" : "secondary"}
                          className="flex items-center space-x-1"
                        >
                          {product.active ? (
                            <><Eye className="h-3 w-3" /> Actif</>
                          ) : (
                            <><EyeOff className="h-3 w-3" /> Inactif</>
                          )}
                        </Badge>
                      </div>
                      
                      <div className="text-2xl font-bold text-primary mb-2">
                        {formatPrice(product.price, product.currency)}
                      </div>
                      
                      {product.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Catégorie: {product.category || 'Non définie'}</span>
                        <span>•</span>
                        <span>
                          Créé le {new Date(product.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreating || !!editingProduct} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Modifier le produit' : 'Créer un nouveau produit'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="price">Prix (€) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="file_url">Chemin du fichier dans Storage</Label>
                <Input
                  id="file_url"
                  value={formData.file_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, file_url: e.target.value }))}
                  placeholder="ebooks/mon-ebook.pdf"
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="active">Produit actif</Label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Annuler
              </Button>
              <Button type="submit">
                {editingProduct ? 'Mettre à jour' : 'Créer'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};