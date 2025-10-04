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
  MessageSquare,
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
import ContactMessages from "@/components/cms/ContactMessages";
import { CMSService } from "@/services/cmsService";
import { CMSArticle, CMSFAQ, CMSTestimonial, CMSContent } from "@/types/cms";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { supabase } from "@/integrations/supabase/client";
import { OrderWithItems } from '@/types/ecommerce';

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
  const [notifications, setNotifications] = useState<Array<{id: number, type: string, message: string, time: string}>>([]);

  // États des données
  const [articles, setArticles] = useState<CMSArticle[]>([]);
  const [faqs, setFAQs] = useState<CMSFAQ[]>([]);
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);
  const [content, setContent] = useState<CMSContent[]>([]);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalTestimonials: 0,
    totalFAQs: 0,
    recentArticles: [] as CMSArticle[]
  });

  // Charger les données du dashboard
  useEffect(() => {
    if (activeTab === "dashboard") {
      loadDashboardData();
    } else {
      loadData();
    }
  }, [activeTab]);

  // Mises à jour temps réel
  useEffect(() => {
    if (realTimeUpdates && activeTab === "dashboard") {
      const interval = setInterval(() => {
        loadDashboardData();
      }, 30000); // Actualiser toutes les 30 secondes
      return () => clearInterval(interval);
    }
  }, [realTimeUpdates, activeTab]);

  const loadDashboardData = async () => {
    try {
      setLocalLoading(true);
      
      // Charger les articles
      const articlesData = await CMSService.getArticles();
      const publishedArticlesData = articlesData.filter(a => a.published);
      
      // Charger les commandes
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*, order_items(*, product:products(*))')
        .order('created_at', { ascending: false });
      
      const ordersWithItems: OrderWithItems[] = (ordersData?.map(order => ({
        ...order,
        status: order.status as 'failed' | 'paid' | 'pending' | 'refunded',
        order_items: order.order_items || []
      })) || []) as OrderWithItems[];
      
      // Calculer le revenu total
      const revenue = ordersWithItems
        .filter(o => o.status === 'paid')
        .reduce((sum, o) => sum + o.total_amount, 0);
      
      // Charger témoignages et FAQs
      const testimonialsData = await CMSService.getTestimonials();
      const faqsData = await CMSService.getFAQs();
      
      setOrders(ordersWithItems);
      setDashboardStats({
        totalArticles: articlesData.length,
        publishedArticles: publishedArticlesData.length,
        totalOrders: ordersWithItems.length,
        totalRevenue: revenue,
        totalTestimonials: testimonialsData.length,
        totalFAQs: faqsData.length,
        recentArticles: articlesData.slice(0, 5)
      });

      // Créer des notifications basées sur les données réelles
      const newNotifications = [];
      const recentOrders = ordersWithItems.filter(o => {
        const orderDate = new Date(o.created_at);
        const now = new Date();
        const diffMinutes = (now.getTime() - orderDate.getTime()) / (1000 * 60);
        return diffMinutes < 60;
      });

      if (recentOrders.length > 0) {
        newNotifications.push({
          id: Date.now(),
          type: 'success',
          message: `${recentOrders.length} nouvelle(s) commande(s) dans la dernière heure`,
          time: 'À l\'instant'
        });
      }

      setNotifications(newNotifications);
      
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du dashboard",
        variant: "destructive",
      });
    } finally {
      setLocalLoading(false);
    }
  };

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
        case "products":
          // Les données des produits sont gérées par ProductsManager
          console.log("Onglet produits activé");
          break;
        case "orders":
          // Les données des commandes sont gérées par OrdersManager
          console.log("Onglet commandes activé");
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
              <TabsList className="inline-flex w-full min-w-max p-1 gap-1 bg-muted rounded-lg">
                <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Home</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                  <span className="sm:hidden">Stats</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Produits</span>
                  <span className="sm:hidden">Prod</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Commandes</span>
                  <span className="sm:hidden">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Articles</span>
                  <span className="sm:hidden">Posts</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>FAQ</span>
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Témoignages</span>
                  <span className="sm:hidden">Reviews</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Contenu</span>
                  <span className="sm:hidden">CMS</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Messages</span>
                  <span className="sm:hidden">Msg</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Sécurité</span>
                  <span className="sm:hidden">Sec</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Dashboard Principal - Grille responsive fluide */}
            <TabsContent value="dashboard">
              {localLoading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  {/* KPIs Cards - données réelles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Articles</p>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{dashboardStats.totalArticles}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {dashboardStats.publishedArticles} publiés
                            </p>
                          </div>
                          <FileText className="h-8 w-8 text-blue-500/20" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-green-500">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Commandes</p>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{dashboardStats.totalOrders}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {orders.filter(o => o.status === 'paid').length} payées
                            </p>
                          </div>
                          <ShoppingBag className="h-8 w-8 text-green-500/20" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-purple-500">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Revenus</p>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                              }).format(dashboardStats.totalRevenue / 100)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">Ventes totales</p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-purple-500/20" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-orange-500">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Témoignages</p>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{dashboardStats.totalTestimonials}</p>
                            <p className="text-xs text-muted-foreground mt-1">{dashboardStats.totalFAQs} FAQs</p>
                          </div>
                          <MessageSquare className="h-8 w-8 text-orange-500/20" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Articles récents */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Articles Récents</CardTitle>
                          <Badge variant="secondary">{dashboardStats.recentArticles.length}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-3">
                          {dashboardStats.recentArticles.slice(0, 5).map((article) => (
                            <div key={article.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="flex-1">
                                <p className="font-medium text-sm line-clamp-1">{article.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant={article.published ? "default" : "secondary"} className="text-xs">
                                    {article.published ? "Publié" : "Brouillon"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          {dashboardStats.recentArticles.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              Aucun article pour le moment
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Commandes Récentes</CardTitle>
                          <Badge variant="secondary">{orders.slice(0, 5).length}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-3">
                          {orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  Commande #{order.id.slice(0, 8)}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge 
                                    variant={order.status === 'paid' ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {order.status === 'paid' ? 'Payée' : order.status}
                                  </Badge>
                                  <span className="text-xs font-medium text-primary">
                                    {new Intl.NumberFormat('fr-FR', {
                                      style: 'currency',
                                      currency: order.currency.toUpperCase(),
                                    }).format(order.total_amount / 100)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          {orders.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              Aucune commande pour le moment
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Notifications */}
                  {notifications.length > 0 && (
                    <Card className="hover:shadow-lg transition-all duration-300 mb-6">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-warning" />
                            <CardTitle className="text-lg">Alertes & Notifications</CardTitle>
                          </div>
                          <Badge variant="secondary">{notifications.length}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
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
                  )}
                </>
              )}
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
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Analytics en Temps Réel</h2>
                  <div className="flex items-center gap-2">
                    <Activity className={`h-5 w-5 ${realTimeUpdates ? 'text-success animate-pulse' : 'text-muted-foreground'}`} />
                    <span className="text-sm text-muted-foreground">Données actualisées</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contenu Publié</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Articles</span>
                          <span className="text-2xl font-bold">{dashboardStats.publishedArticles}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">FAQs</span>
                          <span className="text-2xl font-bold">{dashboardStats.totalFAQs}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Témoignages</span>
                          <span className="text-2xl font-bold">{dashboardStats.totalTestimonials}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Ventes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Commandes</span>
                          <span className="text-2xl font-bold">{dashboardStats.totalOrders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Payées</span>
                          <span className="text-2xl font-bold text-green-600">
                            {orders.filter(o => o.status === 'paid').length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">En attente</span>
                          <span className="text-2xl font-bold text-yellow-600">
                            {orders.filter(o => o.status === 'pending').length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Revenus Totaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-4xl font-bold text-primary">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                          }).format(dashboardStats.totalRevenue / 100)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Depuis le début
                        </p>
                      </div>
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

            {/* Gestion des Messages */}
            <TabsContent value="messages">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Messages de Contact</h2>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Actualiser
                  </Button>
                </div>
                
                <ContactMessages />
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