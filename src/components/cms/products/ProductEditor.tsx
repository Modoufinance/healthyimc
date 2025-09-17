import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CMSService } from "@/services/cmsService";
import { CMSProduct } from "@/types/cms";
import ProductImageUpload from "./ProductImageUpload";
import {
  Save,
  X,
  Package,
  DollarSign,
  Tag,
  Truck,
  BarChart3,
  Globe,
  Star,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Minus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductEditorProps {
  product?: CMSProduct | null;
  onClose: () => void;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  sku: string;
  price: number;
  sale_price?: number;
  category: string;
  subcategory: string;
  brand: string;
  tags: string[];
  images: string[];
  featured_image?: string;
  stock_quantity?: number;
  stock_status: 'in_stock' | 'out_of_stock' | 'on_backorder';
  weight?: number;
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
  };
  attributes: { [key: string]: string };
  meta_title: string;
  meta_description: string;
  featured: boolean;
  published: boolean;
}

const ProductEditor = ({ product, onClose }: ProductEditorProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [newTag, setNewTag] = useState("");
  const [newAttributeKey, setNewAttributeKey] = useState("");
  const [newAttributeValue, setNewAttributeValue] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    description: "",
    short_description: "",
    sku: "",
    price: 0,
    sale_price: undefined,
    category: "",
    subcategory: "",
    brand: "",
    tags: [],
    images: [],
    featured_image: undefined,
    stock_quantity: undefined,
    stock_status: 'in_stock',
    weight: undefined,
    dimensions: {
      length: undefined,
      width: undefined,
      height: undefined
    },
    attributes: {},
    meta_title: "",
    meta_description: "",
    featured: false,
    published: false
  });

  // Catégories prédéfinies (peut être remplacé par un appel API)
  const categories = [
    "Suppléments",
    "Équipement fitness",
    "Vêtements",
    "Nutrition",
    "Bien-être",
    "Accessoires"
  ];

  const stockStatuses = [
    { value: 'in_stock', label: 'En stock' },
    { value: 'out_of_stock', label: 'Rupture de stock' },
    { value: 'on_backorder', label: 'En commande' }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        short_description: product.short_description || "",
        sku: product.sku || "",
        price: product.price || 0,
        sale_price: product.sale_price || undefined,
        category: product.category || "",
        subcategory: product.subcategory || "",
        brand: product.brand || "",
        tags: product.tags || [],
        images: product.images || [],
        featured_image: product.featured_image || undefined,
        stock_quantity: product.stock_quantity || undefined,
        stock_status: product.stock_status || 'in_stock',
        weight: product.weight || undefined,
        dimensions: product.dimensions || {
          length: undefined,
          width: undefined,
          height: undefined
        },
        attributes: product.attributes || {},
        meta_title: product.meta_title || "",
        meta_description: product.meta_description || "",
        featured: product.featured || false,
        published: product.published || false
      });
    }
  }, [product]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
      meta_title: prev.meta_title || name
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addAttribute = () => {
    if (newAttributeKey.trim() && newAttributeValue.trim()) {
      setFormData(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [newAttributeKey.trim()]: newAttributeValue.trim()
        }
      }));
      setNewAttributeKey("");
      setNewAttributeValue("");
    }
  };

  const removeAttribute = (keyToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      attributes: Object.fromEntries(
        Object.entries(prev.attributes).filter(([key]) => key !== keyToRemove)
      )
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du produit est obligatoire",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.sku.trim()) {
      toast({
        title: "Erreur",
        description: "Le SKU est obligatoire",
        variant: "destructive",
      });
      return false;
    }

    if (formData.price <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être supérieur à 0",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.category) {
      toast({
        title: "Erreur",
        description: "La catégorie est obligatoire",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const productData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
        tags: formData.tags.length > 0 ? formData.tags : null,
        images: formData.images.length > 0 ? formData.images : null,
        featured_image: formData.featured_image || (formData.images[0] || null),
        dimensions: (formData.dimensions.length || formData.dimensions.width || formData.dimensions.height) 
          ? formData.dimensions 
          : null,
        attributes: Object.keys(formData.attributes).length > 0 ? formData.attributes : null,
        sale_price: formData.sale_price || null,
        stock_quantity: formData.stock_quantity || null,
        weight: formData.weight || null,
        subcategory: formData.subcategory || null,
        brand: formData.brand || null,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null
      };

      let result;
      if (product) {
        result = await CMSService.updateProduct(product.id, productData);
      } else {
        result = await CMSService.createProduct(productData);
      }

      if (result) {
        toast({
          title: "Succès",
          description: product ? "Produit mis à jour avec succès" : "Produit créé avec succès",
        });
        onClose();
      } else {
        throw new Error("Échec de l'opération");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: product ? "Impossible de mettre à jour le produit" : "Impossible de créer le produit",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8" />
            {product ? "Modifier le Produit" : "Nouveau Produit"}
          </h1>
          <p className="text-muted-foreground">
            {product ? "Modifiez les informations du produit" : "Créez un nouveau produit pour votre boutique"}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Package className="h-4 w-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="images">
            <Eye className="h-4 w-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <BarChart3 className="h-4 w-4 mr-2" />
            Inventaire
          </TabsTrigger>
          <TabsTrigger value="attributes">
            <Tag className="h-4 w-4 mr-2" />
            Attributs
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Globe className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
        </TabsList>

        {/* Onglet Général */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations de base */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de Base</CardTitle>
                <CardDescription>
                  Informations principales du produit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom du Produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ex: Protéine Whey Premium"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug URL</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="proteine-whey-premium"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL: /products/{formData.slug}
                  </p>
                </div>

                <div>
                  <Label htmlFor="sku">SKU (Référence) *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="PWP-001"
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Marque</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="Ex: HealthyIMC"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prix et catégorie */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Prix et Catégorie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Prix Normal *</Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          price: parseFloat(e.target.value) || 0 
                        }))}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        €
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sale_price">Prix Promo</Label>
                    <div className="relative">
                      <Input
                        id="sale_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.sale_price || ""}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          sale_price: e.target.value ? parseFloat(e.target.value) : undefined
                        }))}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        €
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Sous-catégorie</Label>
                  <Input
                    id="subcategory"
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    placeholder="Ex: Protéines en poudre"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Produit Vedette
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                    />
                    <Label htmlFor="published" className="flex items-center gap-2">
                      {formData.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      Publié
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description du Produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="short_description">Description Courte</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                  placeholder="Résumé rapide du produit..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Description Complète</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description détaillée du produit, bénéfices, utilisation..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
              <CardDescription>
                Ajoutez des mots-clés pour améliorer la recherche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Ajouter un tag..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Images */}
        <TabsContent value="images">
          <ProductImageUpload
            images={formData.images}
            featuredImage={formData.featured_image}
            onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
            onFeaturedImageChange={(featuredImage) => 
              setFormData(prev => ({ ...prev, featured_image: featuredImage || undefined }))
            }
          />
        </TabsContent>

        {/* Onglet Inventaire */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Stock et Disponibilité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stock_quantity">Quantité en Stock</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    min="0"
                    value={formData.stock_quantity || ""}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      stock_quantity: e.target.value ? parseInt(e.target.value) : undefined
                    }))}
                    placeholder="Ex: 100"
                  />
                </div>

                <div>
                  <Label htmlFor="stock_status">Statut du Stock</Label>
                  <Select
                    value={formData.stock_status}
                    onValueChange={(value: 'in_stock' | 'out_of_stock' | 'on_backorder') => 
                      setFormData(prev => ({ ...prev, stock_status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stockStatuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Expédition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.weight || ""}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      weight: e.target.value ? parseFloat(e.target.value) : undefined
                    }))}
                    placeholder="Ex: 1.2"
                  />
                </div>

                <div>
                  <Label>Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.dimensions.length || ""}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        dimensions: {
                          ...prev.dimensions,
                          length: e.target.value ? parseFloat(e.target.value) : undefined
                        }
                      }))}
                      placeholder="Long."
                    />
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.dimensions.width || ""}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        dimensions: {
                          ...prev.dimensions,
                          width: e.target.value ? parseFloat(e.target.value) : undefined
                        }
                      }))}
                      placeholder="Larg."
                    />
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.dimensions.height || ""}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        dimensions: {
                          ...prev.dimensions,
                          height: e.target.value ? parseFloat(e.target.value) : undefined
                        }
                      }))}
                      placeholder="Haut."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Attributs */}
        <TabsContent value="attributes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attributs Personnalisés</CardTitle>
              <CardDescription>
                Ajoutez des caractéristiques spécifiques à votre produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newAttributeKey}
                  onChange={(e) => setNewAttributeKey(e.target.value)}
                  placeholder="Nom de l'attribut (ex: Goût)"
                />
                <Input
                  value={newAttributeValue}
                  onChange={(e) => setNewAttributeValue(e.target.value)}
                  placeholder="Valeur (ex: Vanille)"
                />
                <Button onClick={addAttribute} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {Object.entries(formData.attributes).length > 0 && (
                <div className="space-y-2">
                  {Object.entries(formData.attributes).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <span className="font-medium">{key}:</span>{" "}
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(key)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {Object.entries(formData.attributes).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun attribut défini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Optimisation SEO
              </CardTitle>
              <CardDescription>
                Améliorez la visibilité de votre produit dans les moteurs de recherche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Titre SEO</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="Titre optimisé pour les moteurs de recherche"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.meta_title.length}/60 caractères recommandés
                </p>
              </div>

              <div>
                <Label htmlFor="meta_description">Description SEO</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="Description pour les résultats de recherche"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.meta_description.length}/160 caractères recommandés
                </p>
              </div>

              {/* Aperçu du résultat de recherche */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-3">Aperçu Google</h4>
                <div className="space-y-2">
                  <div className="text-blue-600 text-lg">
                    {formData.meta_title || formData.name || "Titre du produit"}
                  </div>
                  <div className="text-green-600 text-sm">
                    votre-site.com/products/{formData.slug}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formData.meta_description || formData.short_description || "Description du produit..."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductEditor;