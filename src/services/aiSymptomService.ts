
interface AIAnalysisResponse {
  analysis: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export const analyzeSymptoms = async (symptoms: string): Promise<AIAnalysisResponse> => {
  // For now, we'll use a mock response until we integrate with an actual AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      const response: AIAnalysisResponse = {
        analysis: "D'après vos symptômes décrits, il pourrait s'agir d'une condition non-urgente. Cependant, une consultation médicale est recommandée pour un diagnostic précis.",
        severity: "medium",
        recommendations: [
          "Prenez du repos",
          "Restez hydraté(e)",
          "Surveillez l'évolution de vos symptômes",
          "Consultez un médecin si les symptômes persistent"
        ]
      };
      resolve(response);
    }, 1500);
  });
};
