import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CMSService } from "@/services/cmsService";
import {
  Upload,
  X,
  Image as ImageIcon,
  Star,
  StarOff,
  Move,
  Eye,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProductImageUploadProps {
  images: string[];
  featuredImage?: string;
  onImagesChange: (images: string[]) => void;
  onFeaturedImageChange: (imageUrl: string | null) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
}

interface UploadingImage {
  file: File;
  progress: number;
  url?: string;
  error?: string;
}

const ProductImageUpload = ({
  images = [],
  featuredImage,
  onImagesChange,
  onFeaturedImageChange,
  maxImages = 10,
  maxFileSize = 5
}: ProductImageUploadProps) => {
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `Type de fichier non supporté. Utilisez: JPG, PNG, WebP`;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `Fichier trop volumineux. Maximum ${maxFileSize}MB`;
    }
    
    if (images.length + uploadingImages.length >= maxImages) {
      return `Maximum ${maxImages} images autorisées`;
    }
    
    return null;
  };

  const handleFileUpload = useCallback(async (files: File[]) => {
    const validFiles: File[] = [];
    
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        toast({
          title: "Erreur de fichier",
          description: `${file.name}: ${error}`,
          variant: "destructive",
        });
        continue;
      }
      validFiles.push(file);
    }
    
    if (validFiles.length === 0) return;

    // Initialiser les objets de téléchargement
    const newUploading = validFiles.map(file => ({
      file,
      progress: 0
    }));
    
    setUploadingImages(prev => [...prev, ...newUploading]);

    // Télécharger les fichiers
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      
      try {
        // Simuler la progression
        const progressInterval = setInterval(() => {
          setUploadingImages(prev =>
            prev.map((img, idx) =>
              img.file === file && idx >= prev.length - validFiles.length
                ? { ...img, progress: Math.min(img.progress + 10, 90) }
                : img
            )
          );
        }, 200);

        const url = await CMSService.uploadFile(file, 'products');
        
        clearInterval(progressInterval);
        
        if (url) {
          // Succès du téléchargement
          setUploadingImages(prev =>
            prev.map(img =>
              img.file === file
                ? { ...img, progress: 100, url }
                : img
            )
          );

          // Ajouter à la liste des images
          const newImages = [...images, url];
          onImagesChange(newImages);
          
          // Si c'est la première image, la définir comme image vedette
          if (images.length === 0 && !featuredImage) {
            onFeaturedImageChange(url);
          }

          toast({
            title: "Succès",
            description: `Image ${file.name} téléchargée avec succès`,
          });
        } else {
          throw new Error("Échec du téléchargement");
        }
      } catch (error) {
        setUploadingImages(prev =>
          prev.map(img =>
            img.file === file
              ? { ...img, error: "Erreur de téléchargement", progress: 0 }
              : img
          )
        );
        
        toast({
          title: "Erreur",
          description: `Impossible de télécharger ${file.name}`,
          variant: "destructive",
        });
      }
    }

    // Nettoyer les téléchargements terminés après un délai
    setTimeout(() => {
      setUploadingImages(prev => 
        prev.filter(img => !img.url && !img.error)
      );
    }, 2000);
  }, [images, featuredImage, maxImages, onImagesChange, onFeaturedImageChange, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
      e.target.value = '';
    }
  };

  const removeImage = async (imageUrl: string) => {
    try {
      // Supprimer du stockage
      await CMSService.deleteFile(imageUrl);
      
      // Retirer de la liste
      const newImages = images.filter(img => img !== imageUrl);
      onImagesChange(newImages);
      
      // Si c'était l'image vedette, réinitialiser
      if (featuredImage === imageUrl) {
        const nextFeatured = newImages.length > 0 ? newImages[0] : null;
        onFeaturedImageChange(nextFeatured);
      }
      
      toast({
        title: "Image supprimée",
        description: "L'image a été supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'image",
        variant: "destructive",
      });
    }
  };

  const setFeaturedImage = (imageUrl: string) => {
    onFeaturedImageChange(imageUrl);
    toast({
      title: "Image vedette modifiée",
      description: "L'image vedette a été mise à jour",
    });
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Images du Produit
        </CardTitle>
        <CardDescription>
          Téléchargez jusqu'à {maxImages} images (JPG, PNG, WebP - max {maxFileSize}MB chacune)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Zone de téléchargement */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${dragActive 
              ? 'border-primary bg-primary/10' 
              : 'border-muted-foreground/25 hover:border-primary/50'
            }
            ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => {
            if (images.length < maxImages) {
              fileInputRef.current?.click();
            }
          }}
        >
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {images.length >= maxImages 
              ? `Limite atteinte (${maxImages} images max)`
              : "Glissez vos images ici ou cliquez pour sélectionner"
            }
          </h3>
          <p className="text-muted-foreground">
            Formats supportés: JPG, PNG, WebP (max {maxFileSize}MB)
          </p>
          
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept={allowedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            disabled={images.length >= maxImages}
          />
        </div>

        {/* Images en cours de téléchargement */}
        {uploadingImages.length > 0 && (
          <div className="space-y-2">
            <Label>Téléchargement en cours...</Label>
            {uploadingImages.map((img, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded">
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                  {img.error ? (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{img.file.name}</p>
                  {img.error ? (
                    <p className="text-sm text-destructive">{img.error}</p>
                  ) : (
                    <div className="space-y-1">
                      <Progress value={img.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {img.progress}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Images téléchargées */}
        {images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Images téléchargées ({images.length}/{maxImages})</Label>
              {featuredImage && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Image vedette définie
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((imageUrl, index) => (
                <div key={imageUrl} className="relative group">
                  <div className="aspect-square border rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imageUrl}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay avec actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(imageUrl, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setFeaturedImage(imageUrl)}
                        disabled={featuredImage === imageUrl}
                      >
                        {featuredImage === imageUrl ? (
                          <Star className="h-4 w-4 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(imageUrl)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Indicateur image vedette */}
                    {featuredImage === imageUrl && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Vedette
                        </Badge>
                      </div>
                    )}

                    {/* Contrôles de réorganisation */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col space-y-1">
                        {index > 0 && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => moveImage(index, index - 1)}
                          >
                            <Move className="h-3 w-3" />
                          </Button>
                        )}
                        {index < images.length - 1 && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => moveImage(index, index + 1)}
                          >
                            <Move className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Numéro d'ordre */}
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && uploadingImages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucune image téléchargée pour le moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductImageUpload;