
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
        className: "bg-green-500 text-white"
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIntelligence = () => {
    toast({
      title: "Assistant intelligent",
      description: "Notre assistant intelligent analysera votre message pour une réponse plus rapide et personnalisée.",
      className: "bg-blue-500 text-white"
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold mb-6">Contactez-nous</h3>
        
        <div className="flex items-center space-x-4 mt-6">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">contact.Healthyimc@gmail.com</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700">
            Envoyez-nous un message via le formulaire et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            className="flex items-center gap-2" 
            onClick={handleIntelligence}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Intelligence</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
