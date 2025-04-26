
import SEO from "@/components/SEO";

interface HomeSEOProps {
  faqItems: {
    question: string;
    answer: string;
  }[];
}

const HomeSEO = ({ faqItems }: HomeSEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Free BMI Calculator Online - Body Mass Index Calculator",
    "description": "Calculate your BMI (Body Mass Index) online for free. Accurate tool for men, women, and children with personalized interpretation and health advice. Simple and free BMI calculator.",
    "url": "https://healthyimc.com",
    "keywords": [
      "bmi calculator",
      "body mass index",
      "bmi calculator women",
      "bmi calculator men",
      "body mass index calculator",
      "bmi chart",
      "bmi index chart",
      "bmi formula",
      "ideal weight calculator",
      "body fat index",
      "bmi scale",
      "bmi calculator by age",
      "bmi calculator female",
      "bmi calculator male",
      "nhs bmi",
      "bmi test",
      "imc calculator",
      "body mass index chart",
      "calculate bmi formula",
      "ideal body weight calculator"
    ].join(", "),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://healthyimc.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <SEO
      title="Free BMI Calculator Online | Body Mass Index Calculator"
      description="Calculate your BMI online for free. Accurate Body Mass Index (BMI) calculator tool. Perfect for men, women, and children with personalized tracking, BMI interpretation, and health advice. Free BMI calculation for overweight, obesity, and normal weight ranges."
      keywords="bmi calculator, body mass index, bmi calculator women, bmi calculator men, body mass index calculator, bmi chart, ideal weight calculator, overweight, obesity, bmi formula, online bmi, calculator tool, healthy weight, free bmi, bmi calculation, body mass calculation, normal bmi, overweight bmi, how to calculate bmi, simple bmi calculator"
      canonicalUrl="https://healthyimc.com"
      structuredData={structuredData}
      hasFAQ={true}
      faqItems={faqItems}
    />
  );
};

export default HomeSEO;
