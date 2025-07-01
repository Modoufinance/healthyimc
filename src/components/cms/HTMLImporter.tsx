
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, FileText, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HTMLImporterProps {
  onImport: (data: {
    title: string;
    content: string;
    excerpt?: string;
  }) => void;
  onClose: () => void;
}

const HTMLImporter = ({ onImport, onClose }: HTMLImporterProps) => {
  const [importedContent, setImportedContent] = useState("");
  const [extractedTitle, setExtractedTitle] = useState("");
  const [extractedExcerpt, setExtractedExcerpt] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const extractContentFromHTML = (htmlContent: string) => {
    // Créer un parser DOM temporaire
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extraire le titre
    let title = "";
    const titleElement = doc.querySelector('title') || doc.querySelector('h1');
    if (titleElement) {
      title = titleElement.textContent?.trim() || "";
    }
    
    // Extraire le contenu principal
    let content = "";
    const bodyElement = doc.querySelector('body') || doc.querySelector('main') || doc.querySelector('article');
    if (bodyElement) {
      content = bodyElement.innerHTML;
    } else {
      content = htmlContent;
    }
    
    // Nettoyer le contenu (supprimer les scripts, styles, etc.)
    const cleanContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<link[^>]*>/gi, '')
      .replace(/<meta[^>]*>/gi, '')
      .trim();
    
    // Extraire un extrait depuis le premier paragraphe
    const firstParagraph = doc.querySelector('p');
    const excerpt = firstParagraph?.textContent?.substring(0, 200) + "..." || "";
    
    return { title, content: cleanContent, excerpt };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
      toast({
        title: "Format invalide",
        description: "Veuillez sélectionner un fichier HTML (.html ou .htm)",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const htmlContent = e.target?.result as string;
      setImportedContent(htmlContent);
      
      // Extraire automatiquement le titre, contenu et extrait
      const extracted = extractContentFromHTML(htmlContent);
      setExtractedTitle(extracted.title);
      setExtractedExcerpt(extracted.excerpt);
      
      toast({
        title: "Fichier importé",
        description: `Le fichier "${file.name}" a été importé avec succès`,
      });
    };
    
    reader.onerror = () => {
      toast({
        title: "Erreur",
        description: "Impossible de lire le fichier",
        variant: "destructive",
      });
    };
    
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!importedContent.trim()) {
      toast({
        title: "Contenu vide",
        description: "Veuillez importer un fichier HTML ou saisir du contenu",
        variant: "destructive",
      });
      return;
    }

    if (!extractedTitle.trim()) {
      toast({
        title: "Titre manquant",
        description: "Veuillez saisir un titre pour l'article",
        variant: "destructive",
      });
      return;
    }

    onImport({
      title: extractedTitle,
      content: importedContent,
      excerpt: extractedExcerpt,
    });

    toast({
      title: "Article importé",
      description: "L'article HTML a été importé dans l'éditeur",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const htmlFile = files.find(file => 
      file.name.toLowerCase().endsWith('.html') || 
      file.name.toLowerCase().endsWith('.htm')
    );
    
    if (htmlFile && fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(htmlFile);
      fileInputRef.current.files = dt.files;
      
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Importer un article HTML
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Zone de téléchargement */}
        <div className="space-y-4">
          <Label>Sélectionner un fichier HTML</Label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Glissez-déposez votre fichier HTML ici
              </p>
              <p className="text-sm text-gray-500">
                ou cliquez pour sélectionner un fichier
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choisir un fichier
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <FileText className="h-4 w-4" />
              Fichier sélectionné: {fileName}
            </div>
          )}
        </div>

        {/* Aperçu et édition du contenu importé */}
        {importedContent && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="extracted-title">Titre extrait</Label>
                <Input
                  id="extracted-title"
                  value={extractedTitle}
                  onChange={(e) => setExtractedTitle(e.target.value)}
                  placeholder="Titre de l'article"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extracted-excerpt">Extrait généré</Label>
                <Input
                  id="extracted-excerpt"
                  value={extractedExcerpt}
                  onChange={(e) => setExtractedExcerpt(e.target.value)}
                  placeholder="Extrait de l'article"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="html-content">Contenu HTML</Label>
              <Textarea
                id="html-content"
                value={importedContent}
                onChange={(e) => setImportedContent(e.target.value)}
                rows={15}
                className="font-mono text-sm"
                placeholder="Le contenu HTML apparaîtra ici..."
              />
              <p className="text-xs text-gray-500">
                Vous pouvez modifier le contenu HTML avant de l'importer.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {importedContent.length} caractères importés
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button onClick={handleImport}>
                  <Download className="h-4 w-4 mr-2" />
                  Importer dans l'éditeur
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HTMLImporter;
