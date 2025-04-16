
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle, Search } from "lucide-react";
import VoiceSearch from './VoiceSearch';
import { useToast } from '@/components/ui/use-toast';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  keywords?: string[];
}

interface EnhancedFAQProps {
  title?: string;
  description?: string;
  faqItems: FAQItem[];
  className?: string;
}

const EnhancedFAQ = ({ 
  title = "Questions fréquentes", 
  description,
  faqItems,
  className = ""
}: EnhancedFAQProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<FAQItem[]>(faqItems);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      setFilteredItems(faqItems);
      setSearchQuery('');
      return;
    }
    
    setSearchQuery(normalizedQuery);
    
    // Filtrer les questions qui correspondent à la recherche
    const filtered = faqItems.filter(item => {
      // Recherche dans la question
      if (item.question.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      
      // Recherche dans la réponse
      if (item.answer.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      
      // Recherche dans les mots-clés
      if (item.keywords && item.keywords.some(keyword => 
        keyword.toLowerCase().includes(normalizedQuery)
      )) {
        return true;
      }
      
      return false;
    });
    
    setFilteredItems(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "Aucun résultat",
        description: `Aucune question ne correspond à "${query}". Essayez une autre recherche.`,
      });
    } else {
      toast({
        title: `${filtered.length} résultat(s) trouvé(s)`,
        description: `Votre recherche "${query}" a retourné ${filtered.length} résultat(s).`,
      });
    }
  };

  return (
    <Card className={`p-8 shadow-lg rounded-lg backdrop-blur-lg ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <VoiceSearch 
          onSearch={handleSearch} 
          placeholder="Rechercher une question ou un mot-clé..."
        />
      </div>
      
      {filteredItems.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-primary/5 rounded-lg overflow-hidden border border-primary/10"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                <span dangerouslySetInnerHTML={{ 
                  __html: searchQuery ? 
                    item.question.replace(
                      new RegExp(`(${searchQuery})`, 'gi'), 
                      '<mark class="bg-yellow-200 rounded px-1">$1</mark>'
                    ) : 
                    item.question 
                }} />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p dangerouslySetInnerHTML={{ 
                  __html: searchQuery ? 
                    item.answer.replace(
                      new RegExp(`(${searchQuery})`, 'gi'), 
                      '<mark class="bg-yellow-200 rounded px-1">$1</mark>'
                    ) : 
                    item.answer 
                }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-8">
          <Search className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">Aucun résultat trouvé</h3>
          <p className="text-muted-foreground">
            Essayez d'autres termes de recherche ou consultez toutes les questions.
          </p>
        </div>
      )}
    </Card>
  );
};

export default EnhancedFAQ;
