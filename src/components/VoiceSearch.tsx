
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const VoiceSearch = ({ onSearch, placeholder = "Rechercher..." }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier si la reconnaissance vocale est disponible
    if (!('webkitSpeechRecognition' in window) && 
        !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) {
      toast({
        title: "Fonctionnalité non supportée",
        description: "La reconnaissance vocale n'est pas disponible sur votre navigateur.",
        variant: "destructive",
      });
      return;
    }

    setIsListening(true);
    
    // @ts-ignore - Les types ne sont pas encore bien définis dans TypeScript
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      toast({
        title: "À l'écoute...",
        description: "Parlez maintenant, je vous écoute.",
      });
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      
      // Effectuer la recherche automatiquement
      onSearch(transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Erreur de reconnaissance vocale:', event.error);
      setIsListening(false);
      toast({
        title: "Erreur",
        description: "La reconnaissance vocale a rencontré un problème.",
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 rounded-lg w-full"
          aria-label="Champ de recherche"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button type="submit" variant="secondary">
        Rechercher
      </Button>
      {isSupported && (
        <Button 
          type="button" 
          variant={isListening ? "destructive" : "outline"}
          onClick={isListening ? stopListening : startListening}
          className="relative"
          title={isListening ? "Arrêter l'écoute" : "Recherche vocale"}
          aria-label={isListening ? "Arrêter l'écoute" : "Recherche vocale"}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
          {isListening && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          )}
        </Button>
      )}
    </form>
  );
};

export default VoiceSearch;
