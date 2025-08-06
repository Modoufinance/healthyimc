import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Users,
  Activity
} from "lucide-react";

interface AdminAnalyticsProps {
  dateRange: string;
  advanced?: boolean;
}

const AdminAnalytics = ({ dateRange, advanced = false }: AdminAnalyticsProps) => {
  const [activeChart, setActiveChart] = useState("overview");

  // Données simulées pour les graphiques
  const overviewData = [
    { name: 'Lun', users: 420, sessions: 280, conversions: 45 },
    { name: 'Mar', users: 380, sessions: 320, conversions: 52 },
    { name: 'Mer', users: 520, sessions: 450, conversions: 38 },
    { name: 'Jeu', users: 680, sessions: 590, conversions: 67 },
    { name: 'Ven', users: 750, sessions: 640, conversions: 74 },
    { name: 'Sam', users: 590, sessions: 520, conversions: 58 },
    { name: 'Dim', users: 450, sessions: 380, conversions: 42 }
  ];

  const bmiCalculationsData = [
    { name: 'Normal', value: 45, color: '#10b981' },
    { name: 'Surpoids', value: 30, color: '#f59e0b' },
    { name: 'Obésité', value: 20, color: '#ef4444' },
    { name: 'Maigreur', value: 5, color: '#6366f1' }
  ];

  const predictiveData = [
    { month: 'Jan', predicted: 1200, actual: 1180, confidence: 95 },
    { month: 'Fév', predicted: 1350, actual: 1320, confidence: 92 },
    { month: 'Mar', predicted: 1500, actual: 1480, confidence: 88 },
    { month: 'Avr', predicted: 1650, actual: null, confidence: 85 },
    { month: 'Mai', predicted: 1800, actual: null, confidence: 82 }
  ];

  const performanceMetrics = [
    {
      title: "Prédictions IA",
      value: "94.2%",
      description: "Précision des analyses prédictives",
      icon: Brain,
      trend: "+2.1%",
      color: "text-purple-600"
    },
    {
      title: "Taux d'Engagement",
      value: "68.5%",
      description: "Utilisateurs actifs engagés",
      icon: Target,
      trend: "+5.3%",
      color: "text-blue-600"
    },
    {
      title: "Score de Satisfaction",
      value: "4.7/5",
      description: "Feedback utilisateurs moyen",
      icon: CheckCircle,
      trend: "+0.2",
      color: "text-green-600"
    },
    {
      title: "Alertes Détectées",
      value: "3",
      description: "Anomalies identifiées aujourd'hui",
      icon: AlertTriangle,
      trend: "-2",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Métriques de performance */}
      {advanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.description}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                  </div>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {metric.trend}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Tabs value={activeChart} onValueChange={setActiveChart}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="bmi">Calculs IMC</TabsTrigger>
          <TabsTrigger value="predictive">Prédictif</TabsTrigger>
          <TabsTrigger value="realtime">Temps Réel</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activité Globale
              </CardTitle>
              <CardDescription>
                Evolution des métriques principales sur {dateRange}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                    name="Utilisateurs"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sessions" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.6}
                    name="Sessions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bmi" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Catégories IMC</CardTitle>
                <CardDescription>
                  Distribution des résultats de calculs IMC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bmiCalculationsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bmiCalculationsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendances Hebdomadaires</CardTitle>
                <CardDescription>
                  Evolution des calculs par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conversions" fill="#8884d8" name="Calculs IMC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Analyses Prédictives
              </CardTitle>
              <CardDescription>
                Prévisions basées sur l'IA et machine learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8884d8" 
                    strokeDasharray="5 5"
                    name="Prédiction"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#82ca9d" 
                    name="Réel"
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                {predictiveData.slice(-3).map((data, index) => (
                  <div key={index} className="text-center p-3 border rounded-lg">
                    <p className="text-sm font-medium">{data.month}</p>
                    <p className="text-lg font-bold">{data.predicted}</p>
                    <Badge variant="secondary">
                      {data.confidence}% confiance
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Données Temps Réel
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse ml-2" />
              </CardTitle>
              <CardDescription>
                Mise à jour en continu des métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">127</p>
                  <p className="text-sm text-muted-foreground">Actifs maintenant</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-muted-foreground">Calculs/min</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">3.2s</p>
                  <p className="text-sm text-muted-foreground">Temps réponse</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-600">99.8%</p>
                  <p className="text-sm text-muted-foreground">Disponibilité</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Nouveau calcul IMC</span>
                  <Badge variant="secondary">Il y a 2s</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Utilisateur connecté</span>
                  <Badge variant="secondary">Il y a 15s</Badge>
                </div>
                <div className="flex justify-between items-center p-2 border rounded">
                  <span className="text-sm">Article lu complet</span>
                  <Badge variant="secondary">Il y a 32s</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;