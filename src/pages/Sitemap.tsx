import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Sitemap = () => {
  const { language } = useLanguage();
  const langPrefix = language !== 'fr' ? `/${language}` : '';

  const pageCategories = [
    {
      title: "Pages principales",
      pages: [
        {
          path: `${langPrefix}/`,
          title: "Accueil principal",
          description: "Page d'accueil avec présentation générale"
        },
        {
          path: `${langPrefix}/accueil`,
          title: "Page d'accueil",
          description: "Page d'accueil complète avec tous les outils"
        }
      ]
    },
    {
      title: "Calculateurs de santé",
      pages: [
        {
          path: `${langPrefix}/calculateur-imc`,
          title: "Calculateur IMC",
          description: "Calculez votre Indice de Masse Corporelle"
        },
        {
          path: `${langPrefix}/calculateur-imc-enfants`,
          title: "Calculateur IMC Enfants",
          description: "Calculateur IMC spécialement adapté aux enfants"
        },
        {
          path: `${langPrefix}/calculateur-graisse-corporelle`,
          title: "Calculateur de graisse corporelle",
          description: "Estimez votre pourcentage de graisse corporelle"
        },
        {
          path: `${langPrefix}/calculateur-calories`,
          title: "Calculateur de calories",
          description: "Calculez vos besoins caloriques quotidiens"
        }
      ]
    },
    {
      title: "Pages spécialisées IMC",
      pages: [
        {
          path: `${langPrefix}/calcul-imc-femme`,
          title: "IMC pour femmes",
          description: "Calculateur IMC spécialement adapté aux femmes"
        },
        {
          path: `${langPrefix}/calcul-imc-homme`,
          title: "IMC pour hommes",
          description: "Calculateur IMC spécialement adapté aux hommes"
        },
        {
          path: `${langPrefix}/poids-ideal-calcul`,
          title: "Calcul du poids idéal",
          description: "Calculez votre poids idéal selon différentes méthodes"
        },
        {
          path: `${langPrefix}/indice-masse-corporelle`,
          title: "Éducation sur l'IMC",
          description: "Tout savoir sur l'Indice de Masse Corporelle"
        },
        {
          path: `${langPrefix}/imc-normal`,
          title: "IMC Normal",
          description: "Informations sur un IMC dans la norme"
        },
        {
          path: `${langPrefix}/imc-surpoids`,
          title: "IMC Surpoids",
          description: "Conseils et informations sur le surpoids"
        },
        {
          path: `${langPrefix}/imc-obesite`,
          title: "IMC Obésité",
          description: "Informations et conseils sur l'obésité"
        }
      ]
    },
    {
      title: "Assistants santé IA",
      pages: [
        {
          path: `${langPrefix}/analyseur-symptomes`,
          title: "Analyseur de symptômes",
          description: "Analysez vos symptômes avec l'IA"
        },
        {
          path: `${langPrefix}/assistant-sante-ia`,
          title: "Assistant santé IA",
          description: "Votre assistant personnel de santé"
        },
        {
          path: `${langPrefix}/bien-etre`,
          title: "Compagnon bien-être",
          description: "Conseils personnalisés pour votre bien-être"
        },
        {
          path: `${langPrefix}/programme-fitness-ia`,
          title: "Programme fitness IA",
          description: "Programme de fitness personnalisé par IA"
        }
      ]
    },
    {
      title: "Contenu et blog",
      pages: [
        {
          path: `${langPrefix}/blog`,
          title: "Blog santé",
          description: "Articles et conseils sur la santé et le bien-être"
        }
      ]
    },
    {
      title: "E-commerce",
      pages: [
        {
          path: "/boutique",
          title: "Boutique",
          description: "Produits digitaux santé : ebooks, programmes, vidéos"
        },
        {
          path: "/mes-achats",
          title: "Mes achats",
          description: "Accédez à vos achats et téléchargements"
        }
      ]
    },
    {
      title: "Pages légales et informatives",
      pages: [
        {
          path: `${langPrefix}/a-propos`,
          title: "À propos",
          description: "En savoir plus sur notre équipe et mission"
        },
        {
          path: `${langPrefix}/confidentialite`,
          title: "Politique de confidentialité",
          description: "Notre politique de protection des données"
        }
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HealthyIMC - Plan du site",
    "description": "Toutes les pages disponibles sur HealthyIMC",
    "url": "https://healthyimc.com/plan-du-site"
  };

  return (
    <>
      <SEO
        title="Plan du site - Toutes les pages HealthyIMC"
        description="Découvrez toutes les pages et fonctionnalités disponibles sur HealthyIMC : calculateurs, assistants IA, blog santé et boutique."
        keywords="plan du site, pages healthyimc, calculateur imc, assistant santé, boutique santé"
        canonicalUrl="https://healthyimc.com/plan-du-site"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Plan du site HealthyIMC
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez toutes les pages et fonctionnalités disponibles sur notre plateforme de santé et bien-être
            </p>
          </div>

          <div className="space-y-8">
            {pageCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.pages.map((page, pageIndex) => (
                      <Link
                        key={pageIndex}
                        to={page.path}
                        className="block p-4 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-200 bg-card hover:bg-accent/50"
                      >
                        <h3 className="font-semibold text-foreground mb-2">
                          {page.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {page.description}
                        </p>
                        <div className="mt-3 flex items-center text-primary text-sm font-medium">
                          Visiter la page →
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl">Administration</CardTitle>
                <CardDescription>
                  Accès réservé aux administrateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link
                    to="/admin/login"
                    className="block p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-200 bg-card hover:bg-accent/50"
                  >
                    <span className="font-semibold">Connexion administrateur</span>
                  </Link>
                  <Link
                    to="/admin/cms"
                    className="block p-3 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-200 bg-card hover:bg-accent/50"
                  >
                    <span className="font-semibold">Panneau d'administration</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sitemap;