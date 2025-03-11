
import { Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const VideoExplication = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Comprendre l'importance de l'IMC
        </h2>
        
        <div className="relative aspect-video bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-lg overflow-hidden group mb-6">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="absolute inset-0 flex items-center justify-center w-full h-full cursor-pointer">
                <div className="bg-white/90 rounded-full p-4 flex items-center justify-center 
                             group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="h-10 w-10 text-primary fill-primary" />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
              <div className="aspect-video w-full">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="IMC Expliqué" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center p-4 backdrop-blur-sm bg-black/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Vidéo explicative : L'IMC en 2 minutes</h3>
              <p>Découvrez comment calculer et interpréter votre indice de masse corporelle</p>
            </div>
          </div>
        </div>
        
        <div className="text-white/90 text-center">
          <p>Cette vidéo vous explique clairement :</p>
          <ul className="mt-4 inline-block text-left">
            <li className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 rounded-full p-1">
                <Play className="h-4 w-4" />
              </span>
              <span>Qu'est-ce que l'Indice de Masse Corporelle</span>
            </li>
            <li className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 rounded-full p-1">
                <Play className="h-4 w-4" />
              </span>
              <span>Comment l'IMC est calculé scientifiquement</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-white/20 rounded-full p-1">
                <Play className="h-4 w-4" />
              </span>
              <span>Comment interpréter votre résultat IMC</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VideoExplication;
