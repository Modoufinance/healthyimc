import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  Download,
  Moon,
  Sun,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  Zap,
  Shield,
  Globe,
  MoreVertical,
  RefreshCw,
  Activity,
  ShoppingBag,
  Package
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CMSArticleEditor from "@/components/cms/CMSArticleEditor";
import CMSFAQEditor from "@/components/cms/CMSFAQEditor";
import CMSTestimonialEditor from "@/components/cms/CMSTestimonialEditor";
import CMSContentEditor from "@/components/cms/CMSContentEditor";
import AIContentGenerator from "@/components/cms/AIContentGenerator";
import { CMSService } from "@/services/cmsService";
import { CMSArticle, CMSFAQ, CMSTestimonial, CMSContent } from "@/types/cms";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { OrdersManager } from "@/components/admin/OrdersManager";

// Données mockées pour les analyses
const analyticsData = [
  { date: '2024-01', users: 2400, articles: 240, engagement: 4.1 },
  { date: '2024-02', users: 1398, articles: 139, engagement: 3.8 },
  { date: '2024-03', users: 9800, articles: 980, engagement: 4.5 },
  { date: '2024-04', users: 3908, articles: 390, engagement: 4.2 },
  { date: '2024-05', users: 4800, articles: 480, engagement: 4.8 },
  { date: '2024-06', users: 3800, articles: 380, engagement: 4.3 }
];

const predictiveData = [
  { month: 'Jan', predicted: 5200, actual: 4800 },
  { month: 'Feb', predicted: 5800, actual: 5400 },
  { month: 'Mar', predicted: 6200, actual: 6100 },
  { month: 'Apr', predicted: 6800, actual: null },
  { month: 'May', predicted: 7200, actual: null },
  { month: 'Jun', predicted: 7800, actual: null }
];

const kpiData = [
  { name: 'Utilisateurs Actifs', value: '15,247', change: '+12%', trend: 'up', color: '#10B981' },
  { name: 'Articles Publiés', value: '1,524', change: '+8%', trend: 'up', color: '#3B82F6' },
  { name: 'Taux Engagement', value: '4.2%', change: '+0.3%', trend: 'up', color: '#8B5CF6' },
  { name: 'Conversions', value: '892', change: '-2%', trend: 'down', color: '#EF4444' }
];

const userActivityData = [
  { time: '00:00', users: 120 },
  { time: '04:00', users: 80 },
  { time: '08:00', users: 340 },
  { time: '12:00', users: 520 },
  { time: '16:00', users: 480 },
  { time: '20:00', users: 380 }
];

const deviceData = [
  { name: 'Desktop', value: 40, color: '#8B5CF6' },
  { name: 'Mobile', value: 45, color: '#10B981' },
  { name: 'Tablet', value: 15, color: '#F59E0B' }
];

const ModernCMSAdmin = () => {
  const { adminUser, logout, loading } = useAdminAuth();
  const { toast } = useToast();
  
  // États généraux
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [showEditor, setShowEditor] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Nouvel article publié avec succès', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Taux de rebond en hausse', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Mise à jour système disponible', time: '1h ago' }
  ]);

  // États des données
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [faqs, setFAQs] = useState<CMSFAQ[]>([]);
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);
  const [content, setContent] = useState<CMSContent[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, title: 'Guide complet IMC 2024', date: '2024-01-15', status: 'programmé' },
    { id: 2, title: 'Nouvelles recommandations OMS', date: '2024-01-20', status: 'en attente' }
  ]);

  // Charger les données
  useEffect(() => {
    if (activeTab !== "dashboard") {
      loadData();
    }
  }, [activeTab]);

  // Simulation mises à jour temps réel
  useEffect(() => {
    if (realTimeUpdates && activeTab === "dashboard") {
      const interval = setInterval(() => {
        // Simuler mise à jour des métriques en temps réel
        console.log('Mise à jour temps réel des métriques');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [realTimeUpdates, activeTab]);

  const loadData = async () => {
    setLocalLoading(true);
    try {
      switch (activeTab) {
        case "articles":
          const articleData = await CMSService.getArticles();
          setArticles(articleData);
          break;
        case "faq":
          const faqData = await CMSService.getFAQs();
          setFAQs(faqData);
          break;
        case "testimonials":
          const testimonialData = await CMSService.getTestimonials();
          setTestimonials(testimonialData);
          break;
        case "content":
          const contentData = await CMSService.getContent();
          setContent(contentData);
          break;
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLocalLoading(false);
    }
  };

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

  const handleNewItem = () => {
    setEditingItem(null);
    setShowEditor(true);
    setShowAIGenerator(false);
  };

  const handleAIGenerate = () => {
    setShowAIGenerator(true);
    setShowEditor(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setShowEditor(true);
    setShowAIGenerator(false);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setShowAIGenerator(false);
    setEditingItem(null);
    loadData();
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      return;
    }

    try {
      let success = false;
      switch (activeTab) {
        case "articles":
          success = await CMSService.deleteArticle(id);
          break;
        case "faq":
          success = await CMSService.deleteFAQ(id);
          break;
        case "testimonials":
          success = await CMSService.deleteTestimonial(id);
          break;
        case "content":
          success = await CMSService.deleteContent(id);
          break;
      }

      if (success) {
        toast({
          title: "Succès",
          description: "Élément supprimé avec succès",
        });
        loadData();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive",
      });
    }
  };

  const filterItems = (items: any[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Chargement du dashboard...</span>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        {/* Header responsive */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Dashboard Admin HealthyIMC
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Analyses prédictives, gestion de contenu et insights temps réel
              </p>
            </div>
            
            {/* Actions Header - responsive */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-destructive rounded-full animate-pulse"></span>
                  )}
                </Button>
              </div>
              
              {/* Mode sombre */}
              <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-md bg-background/50 border">
                <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                  className="scale-75 sm:scale-100"
                />
                <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </div>
              
              {/* Updates temps réel - masqué sur mobile */}
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md bg-background/50 border">
                <Activity className={`h-4 w-4 ${realTimeUpdates ? 'text-success animate-pulse' : 'text-muted-foreground'}`} />
                <Switch checked={realTimeUpdates} onCheckedChange={setRealTimeUpdates} />
                <span className="text-xs lg:text-sm font-medium">Temps réel</span>
              </div>
              
              {/* Export buttons - responsive */}
              <div className="flex gap-1 sm:gap-2">
                <Button variant="outline" size="sm" onClick={handleExportPDF} className="hidden sm:flex">
                  <Download className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden lg:inline">PDF</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportExcel} className="hidden sm:flex">
                  <Download className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden lg:inline">Excel</span>
                </Button>
                {/* Menu mobile pour export */}
                <Button variant="outline" size="sm" className="sm:hidden">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="ghost" onClick={logout} size="sm" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Déconnexion</span>
                <span className="sm:hidden">Exit</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu principal avec éditeurs */}
        {showEditor ? (
          <div className="mb-6">
            {activeTab === "articles" && (
              <CMSArticleEditor 
                article={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
            {activeTab === "faq" && (
              <CMSFAQEditor 
                faq={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
            {activeTab === "testimonials" && (
              <CMSTestimonialEditor 
                testimonial={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
            {activeTab === "content" && (
              <CMSContentEditor 
                content={editingItem} 
                onClose={handleCloseEditor}
              />
            )}
          </div>
        ) : showAIGenerator ? (
          <div className="mb-6">
            <AIContentGenerator 
              onArticleGenerated={() => loadData()}
              onClose={handleCloseEditor}
            />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Navigation responsive avec scroll horizontal sur mobile */}
            <div className="mb-6 overflow-x-auto">
              <TabsList className="grid w-full min-w-max grid-cols-9 lg:grid-cols-9 gap-1">
                <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Home</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                  <span className="sm:hidden">Stats</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Produits</span>
                  <span className="sm:hidden">Prod</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Commandes</span>
                  <span className="sm:hidden">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Articles</span>
                  <span className="sm:hidden">Posts</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>FAQ</span>
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Témoignages</span>
                  <span className="sm:hidden">Reviews</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Contenu</span>
                  <span className="sm:hidden">CMS</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Sécurité</span>
                  <span className="sm:hidden">Sec</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Dashboard Principal - Grille responsive fluide */}
            <TabsContent value="dashboard">
              {/* KPIs Cards - grille fluide responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {kpiData.map((kpi, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 animate-fade-in" style={{ borderLeftColor: kpi.color }}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{kpi.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight">{kpi.value}</p>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              kpi.trend === 'up' 
                                ? 'bg-success/10 text-success' 
                                : 'bg-destructive/10 text-destructive'
                            }`}>
                              {kpi.trend === 'up' ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {kpi.change}
                            </div>
                          </div>
                        </div>
                        <div 
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full opacity-20 group-hover:opacity-30 transition-opacity flex-shrink-0" 
                          style={{ backgroundColor: kpi.color }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Graphiques principaux - grille responsive */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {/* Graphique prédictif */}
                <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base sm:text-lg">Analyses Prédictives</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Prévisions basées sur l'IA pour les 3 prochains mois</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={predictiveData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="hsl(var(--muted-foreground))" 
                          strokeDasharray="8 5" 
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Activité utilisateurs temps réel */}
                <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Activity className={`h-4 w-4 sm:h-5 sm:w-5 text-success ${realTimeUpdates ? 'animate-pulse' : ''}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base sm:text-lg">Activité Temps Réel</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Utilisateurs actifs par heure</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={userActivityData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="time" 
                          tick={{ fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="hsl(var(--success))" 
                          fill="hsl(var(--success))" 
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Section inférieure - grille adaptive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {/* Notifications récentes */}
                <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-warning/10 rounded-lg">
                          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
                        </div>
                        <CardTitle className="text-base sm:text-lg">Alertes & Notifications</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {notifications.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border-l-2 border-transparent hover:border-primary">
                          <div className={`h-2 w-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Posts programmés */}
                <Card>
                  <CardHeader>
                    <CardTitle>Articles Programmés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scheduledPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium text-sm">{post.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs text-muted-foreground">{post.date}</span>
                            </div>
                          </div>
                          <Badge variant={post.status === 'programmé' ? 'default' : 'secondary'}>
                            {post.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Répartition appareils */}
                <Card>
                  <CardHeader>
                    <CardTitle>Répartition des Appareils</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Gestion des Produits E-commerce */}
            <TabsContent value="products">
              <ProductsManager />
            </TabsContent>

            {/* Gestion des Commandes */}
            <TabsContent value="orders">
              <OrdersManager />
            </TabsContent>

            {/* Analytics détaillées */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                {/* Contrôles de période */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Analytics Avancées</h2>
                  <div className="flex space-x-2">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 jours</SelectItem>
                        <SelectItem value="30d">30 jours</SelectItem>
                        <SelectItem value="90d">90 jours</SelectItem>
                        <SelectItem value="1y">1 an</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Graphiques analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Évolution du Trafic</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Publications & Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="articles" fill="#82ca9d" />
                          <Bar dataKey="engagement" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Gestion Articles avec fonctionnalités avancées */}
            <TabsContent value="articles">
              <div className="space-y-6">
                {/* Barre de recherche et filtres avancés */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Recherche avancée..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleAIGenerate} variant="secondary">
                      <Zap className="h-4 w-4 mr-2" />
                      IA Generator
                    </Button>
                    <Button onClick={handleNewItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvel Article
                    </Button>
                  </div>
                </div>

                {/* Liste des articles */}
                <Card>
                  <CardContent className="p-0">
                    {localLoading ? (
                      <div className="text-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                        Chargement...
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filterItems(articles).map((article) => (
                          <div key={article.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <h3 className="font-semibold text-lg">{article.title}</h3>
                                  <Badge variant={article.published ? "default" : "outline"}>
                                    {article.published ? "Publié" : "Brouillon"}
                                  </Badge>
                                  <Badge variant="secondary">{article.category}</Badge>
                                </div>
                                <p className="text-muted-foreground mt-2 line-clamp-2">
                                  {article.excerpt || "Pas d'extrait disponible"}
                                </p>
                                <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                                  <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(article.created_at)}
                                  </span>
                                  <span>Par {article.author}</span>
                                  {article.published_at && (
                                    <span className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Publié le {formatDate(article.published_at)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditItem(article)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(article.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filterItems(articles).length === 0 && (
                          <div className="text-center py-12 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            Aucun article trouvé
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Autres onglets avec design similaire */}
            <TabsContent value="faq">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gestion FAQ</h2>
                  <Button onClick={handleNewItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle FAQ
                  </Button>
                </div>
                {/* Contenu FAQ similaire à articles */}
              </div>
            </TabsContent>

            <TabsContent value="testimonials">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gestion Témoignages</h2>
                  <Button onClick={handleNewItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Témoignage
                  </Button>
                </div>
                {/* Contenu témoignages */}
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Contenu Statique</h2>
                  <Button onClick={handleNewItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Contenu
                  </Button>
                </div>
                {/* Contenu statique */}
              </div>
            </TabsContent>

            {/* Centre de sécurité */}
            <TabsContent value="security">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Centre de Sécurité</h2>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Audit Sécurité
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tentatives de Connexion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                          <span>Connexions réussies (24h)</span>
                          <Badge variant="secondary">15</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded">
                          <span>Tentatives échouées</span>
                          <Badge variant="destructive">3</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Authentification Multi-Niveaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>2FA Activé</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Notifications Sécurité</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Sessions Multiples</span>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alertes sécurité */}
                <Card>
                  <CardHeader>
                    <CardTitle>Alertes de Sécurité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium">Nouvelle connexion depuis un appareil inconnu</p>
                          <p className="text-sm text-muted-foreground">Il y a 2 heures - IP: 192.168.1.100</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Examiner
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ModernCMSAdmin;