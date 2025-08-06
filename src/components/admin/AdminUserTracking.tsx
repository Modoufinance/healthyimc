import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Eye, 
  MapPin, 
  Clock, 
  Activity, 
  Globe,
  Smartphone,
  Monitor,
  Search,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface UserSession {
  id: string;
  userId: string;
  userName: string;
  email: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  ip: string;
  startTime: Date;
  lastActivity: Date;
  pagesViewed: number;
  calculationsPerformed: number;
  status: 'active' | 'idle' | 'offline';
}

const AdminUserTracking = () => {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deviceFilter, setDeviceFilter] = useState("all");

  useEffect(() => {
    // Simuler des sessions utilisateurs
    const mockSessions: UserSession[] = [
      {
        id: '1',
        userId: 'user_001',
        userName: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        device: 'desktop',
        browser: 'Chrome 120',
        location: 'Paris, France',
        ip: '192.168.1.100',
        startTime: new Date(Date.now() - 1800000), // 30 min ago
        lastActivity: new Date(Date.now() - 300000), // 5 min ago
        pagesViewed: 8,
        calculationsPerformed: 3,
        status: 'active'
      },
      {
        id: '2',
        userId: 'user_002',
        userName: 'Jean Martin',
        email: 'jean.martin@email.com',
        device: 'mobile',
        browser: 'Safari Mobile',
        location: 'Lyon, France',
        ip: '192.168.1.101',
        startTime: new Date(Date.now() - 2700000), // 45 min ago
        lastActivity: new Date(Date.now() - 600000), // 10 min ago
        pagesViewed: 5,
        calculationsPerformed: 2,
        status: 'idle'
      },
      {
        id: '3',
        userId: 'user_003',
        userName: 'Sophie Laurent',
        email: 'sophie.laurent@email.com',
        device: 'tablet',
        browser: 'Firefox',
        location: 'Marseille, France',
        ip: '192.168.1.102',
        startTime: new Date(Date.now() - 900000), // 15 min ago
        lastActivity: new Date(Date.now() - 60000), // 1 min ago
        pagesViewed: 12,
        calculationsPerformed: 5,
        status: 'active'
      }
    ];

    setSessions(mockSessions);

    // Simuler les mises à jour temps réel
    const interval = setInterval(() => {
      setSessions(prev => prev.map(session => ({
        ...session,
        lastActivity: Math.random() > 0.7 ? new Date() : session.lastActivity,
        pagesViewed: Math.random() > 0.8 ? session.pagesViewed + 1 : session.pagesViewed,
        calculationsPerformed: Math.random() > 0.9 ? session.calculationsPerformed + 1 : session.calculationsPerformed
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#8884d8' },
    { name: 'Mobile', value: 35, color: '#82ca9d' },
    { name: 'Tablet', value: 20, color: '#ffc658' }
  ];

  const activityData = [
    { time: '09:00', users: 45 },
    { time: '10:00', users: 67 },
    { time: '11:00', users: 89 },
    { time: '12:00', users: 123 },
    { time: '13:00', users: 98 },
    { time: '14:00', users: 134 },
    { time: '15:00', users: 156 },
    { time: '16:00', users: 187 }
  ];

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Monitor className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}min`;
    return `${minutes}min`;
  };

  const formatLastActivity = (lastActivity: Date) => {
    const now = new Date();
    const diff = now.getTime() - lastActivity.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    return `Il y a ${Math.floor(minutes / 60)}h`;
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesDevice = deviceFilter === 'all' || session.device === deviceFilter;
    
    return matchesSearch && matchesStatus && matchesDevice;
  });

  return (
    <div className="space-y-6">
      {/* Métriques en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {sessions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sessions Totales</p>
                <p className="text-2xl font-bold">{sessions.length}</p>
              </div>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pages Vues/Session</p>
                <p className="text-2xl font-bold">
                  {(sessions.reduce((acc, s) => acc + s.pagesViewed, 0) / sessions.length).toFixed(1)}
                </p>
              </div>
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Calculs/Session</p>
                <p className="text-2xl font-bold">
                  {(sessions.reduce((acc, s) => acc + s.calculationsPerformed, 0) / sessions.length).toFixed(1)}
                </p>
              </div>
              <Activity className="h-5 w-5 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sessions">Sessions Actives</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="behavior">Comportement</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          {/* Filtres et recherche */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher utilisateurs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="idle">Inactifs</SelectItem>
                <SelectItem value="offline">Hors ligne</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={deviceFilter} onValueChange={setDeviceFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="tablet">Tablette</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Liste des sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Sessions Utilisateurs</CardTitle>
              <CardDescription>
                Suivi en temps réel de l'activité des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar>
                        <AvatarFallback>
                          {session.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{session.userName}</p>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.email}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            {getDeviceIcon(session.device)}
                            {session.browser}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {session.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Connecté depuis {formatDuration(session.startTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{session.pagesViewed}</p>
                        <p className="text-xs text-muted-foreground">Pages</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{session.calculationsPerformed}</p>
                        <p className="text-xs text-muted-foreground">Calculs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{formatLastActivity(session.lastActivity)}</p>
                        <p className="text-xs text-muted-foreground">Dernière activité</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité par Heure</CardTitle>
                <CardDescription>
                  Nombre d'utilisateurs connectés par heure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par Appareil</CardTitle>
                <CardDescription>
                  Distribution des types d'appareils utilisés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse du Comportement</CardTitle>
              <CardDescription>
                Patterns d'utilisation et parcours utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Pages les Plus Visitées</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Calculateur IMC</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page d'accueil</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Blog</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>À propos</span>
                      <span className="font-medium">9%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Durée Moyenne</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Session</span>
                      <span className="font-medium">8m 32s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Par page</span>
                      <span className="font-medium">2m 15s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calcul IMC</span>
                      <span className="font-medium">45s</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Taux de Conversion</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Calcul → Inscription</span>
                      <span className="font-medium">12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visite → Calcul</span>
                      <span className="font-medium">68.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retour visiteur</span>
                      <span className="font-medium">34.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUserTracking;