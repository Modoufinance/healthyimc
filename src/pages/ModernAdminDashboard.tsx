import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-states";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText,
  Settings,
  Bell,
  Download,
  Calendar,
  Filter,
  Search,
  Moon,
  Sun,
  Globe,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Layout,
  PieChart,
  LineChart,
  Target
} from "lucide-react";
import AdminKPICards from "@/components/admin/AdminKPICards";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminArticleScheduler from "@/components/admin/AdminArticleScheduler";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminUserTracking from "@/components/admin/AdminUserTracking";
import AdminReports from "@/components/admin/AdminReports";
import AdminSecurityCenter from "@/components/admin/AdminSecurityCenter";
import AdminWidgetManager from "@/components/admin/AdminWidgetManager";

const ModernAdminDashboard = () => {
  const { adminUser, logout, loading } = useAdminAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("7d");
  const [notifications, setNotifications] = useState([]);
  const [realTimeData, setRealTimeData] = useState({});

  useEffect(() => {
    // Simuler des données temps réel
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        newSignups: Math.floor(Math.random() * 50) + 10,
        pageViews: Math.floor(Math.random() * 5000) + 2000,
        conversionRate: (Math.random() * 5 + 2).toFixed(2)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "Génération du rapport PDF en cours...",
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "Export Excel",
      description: "Génération du fichier Excel en cours...",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header moderne */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">HealthyIMC Admin</h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              En ligne
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            {/* Recherche globale */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Recherche globale..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sélecteur de langue */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20">
                <Globe className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="zh">ZH</SelectItem>
                <SelectItem value="ar">AR</SelectItem>
              </SelectContent>
            </Select>

            {/* Mode sombre */}
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs">
                3
              </Badge>
            </Button>

            {/* Profil admin */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                {adminUser.username[0].toUpperCase()}
              </div>
              <div className="text-sm">
                <p className="font-medium">{adminUser.username}</p>
                <p className="text-muted-foreground text-xs">{adminUser.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation principale */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <div className="container">
            <TabsList className="grid grid-cols-8 w-full h-12">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Contenu
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Rapports
              </TabsTrigger>
              <TabsTrigger value="widgets" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Widgets
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Barre d'outils contextuelle */}
        <div className="border-b bg-muted/50">
          <div className="container py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger className="w-32">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24h</SelectItem>
                    <SelectItem value="7d">7 jours</SelectItem>
                    <SelectItem value="30d">30 jours</SelectItem>
                    <SelectItem value="90d">90 jours</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportExcel}>
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container py-6">
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dashboard Principal</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Dernière mise à jour: {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <AdminKPICards realTimeData={realTimeData} />
            <AdminAnalytics dateRange={selectedDateRange} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analyses Prédictives</h2>
            <AdminAnalytics dateRange={selectedDateRange} advanced />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold">Gestionnaire de Contenu</h2>
            <AdminArticleScheduler />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">Tracking Utilisateurs</h2>
            <AdminUserTracking />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <h2 className="text-2xl font-bold">Centre de Sécurité</h2>
            <AdminSecurityCenter />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">Rapports Personnalisés</h2>
            <AdminReports />
          </TabsContent>

          <TabsContent value="widgets" className="space-y-6">
            <h2 className="text-2xl font-bold">Widgets Configurables</h2>
            <AdminWidgetManager />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Paramètres</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Préférences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Notifications par email</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Alertes temps réel</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rapports automatiques</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Shield className="h-4 w-4 mr-2" />
                          Configurer 2FA
                        </Button>
                        <Button variant="outline" className="w-full">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Gérer les rôles
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Notifications flottantes */}
      <AdminNotifications />
    </div>
  );
};

export default ModernAdminDashboard;