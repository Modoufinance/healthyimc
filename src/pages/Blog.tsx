
import SEO from "@/components/SEO";
import AdSense from "@/components/AdSense";
import BlogContent from "@/components/blog/BlogContent";

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Santé et IMC - HealthyIMC",
    "description": "Articles et conseils sur la santé, l'IMC, la nutrition et le bien-être",
    "url": "https://healthyimc.com/blog"
  };

  return (
    <>
      <SEO
        title="Blog Santé et IMC | Articles sur le Poids Idéal et l'Indice de Masse Corporelle"
        description="Découvrez des articles et conseils sur l'IMC, le poids idéal, la nutrition et le bien-être. Informations fiables rédigées par des professionnels de santé."
        keywords="blog santé, articles imc, conseils poids, nutrition, bien-être, masse corporelle, santé physique, perte de poids, sport"
        canonicalUrl="https://healthyimc.com/blog"
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Annonce AdSense en haut du blog */}
        <div className="mb-8 flex justify-center">
          <AdSense 
            adSlot="1111111111"
            adFormat="horizontal"
            className="max-w-4xl"
            style={{ minHeight: '100px' }}
          />
        </div>
        
        <BlogContent />
        
        {/* Annonce AdSense en bas du blog */}
        <div className="mt-8 flex justify-center">
          <AdSense 
            adSlot="2222222222"
            adFormat="auto"
            className="max-w-2xl"
            style={{ minHeight: '200px' }}
          />
        </div>
      </div>
    </>
  );
};

export default Blog;
