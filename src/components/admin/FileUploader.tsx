import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, File, Trash2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploaderProps {
  currentFile?: string;
  onFileChange: (filePath: string | null) => void;
  label?: string;
  bucketName?: string;
  acceptedFormats?: string;
}

const FileUploader = ({ 
  currentFile, 
  onFileChange, 
  label = "Fichier digital",
  bucketName = "digital-products",
  acceptedFormats = ".pdf,.epub,.zip,.mp3,.mp4"
}: FileUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "Le fichier ne doit pas dépasser 100MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Upload error:", error);
        throw error;
      }

      onFileChange(fileName);
      
      toast({
        title: "Fichier téléchargé",
        description: "Le fichier a été téléchargé avec succès",
      });
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "Erreur",
        description: error?.message || "Impossible de télécharger le fichier",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const removeFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = () => {
    if (!currentFile) return <FileText className="h-12 w-12" />;
    
    const ext = currentFile.split('.').pop()?.toLowerCase();
    return <FileText className="h-12 w-12" />;
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {currentFile ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 text-primary">
                {getFileIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentFile}</p>
                <p className="text-xs text-muted-foreground">Fichier stocké dans {bucketName}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-600">
              Glissez-déposez votre fichier ici
            </p>
            <p className="text-sm text-gray-500">
              ou cliquez pour sélectionner un fichier
            </p>
            <p className="text-xs text-gray-400">
              PDF, EPUB, ZIP, MP3, MP4 jusqu'à 100MB
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-4"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Téléchargement..." : "Choisir un fichier"}
            </Button>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default FileUploader;
