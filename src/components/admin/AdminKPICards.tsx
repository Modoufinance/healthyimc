import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Target, 
  DollarSign,
  Activity,
  Globe,
  Heart,
  Calculator
} from "lucide-react";

interface AdminKPICardsProps {
  realTimeData: {
    activeUsers?: number;
    newSignups?: number;
    pageViews?: number;
    conversionRate?: string;
  };
}

const AdminKPICards = ({ realTimeData }: AdminKPICardsProps) => {
  const kpiData = [
    {
      title: "Utilisateurs Actifs",
      value: realTimeData.activeUsers || 0,
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Dernières 24h"
    },
    {
      title: "Calculs IMC",
      value: "2,847",
      change: "+8.3%",
      trend: "up",
      icon: Calculator,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Cette semaine"
    },
    {
      title: "Pages Vues",
      value: realTimeData.pageViews || 0,
      change: "+15.2%",
      trend: "up",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Aujourd'hui"
    },
    {
      title: "Taux Conversion",
      value: `${realTimeData.conversionRate || 0}%`,
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "30 derniers jours"
    },
    {
      title: "Score Santé Moyen",
      value: "7.8/10",
      change: "+0.3",
      trend: "up",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Calculé aujourd'hui"
    },
    {
      title: "Nouveaux Inscrits",
      value: realTimeData.newSignups || 0,
      change: "+22.7%",
      trend: "up",
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Cette semaine"
    },
    {
      title: "Sessions Moyennes",
      value: "4m 32s",
      change: "+1m 12s",
      trend: "up",
      icon: Globe,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Durée moyenne"
    },
    {
      title: "Revenus",
      value: "€1,247",
      change: "+18.9%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Ce mois"
    }
  ];

  const formatValue = (value: number | string) => {
    if (typeof value === 'number' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {formatValue(kpi.value)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {kpi.description}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon 
                    className={`h-4 w-4 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`} 
                  />
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      kpi.trend === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {kpi.change}
                  </Badge>
                </div>
              </div>
              
              {/* Barre de progression simulée */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${
                      kpi.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${Math.random() * 60 + 40}%`,
                      transition: 'width 0.5s ease-in-out'
                    }}
                  />
                </div>
              </div>
            </CardContent>
            
            {/* Indicateur temps réel */}
            {index < 4 && (
              <div className="absolute top-2 right-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default AdminKPICards;