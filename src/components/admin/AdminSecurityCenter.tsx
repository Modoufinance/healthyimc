import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const AdminSecurityCenter = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Centre de Sécurité
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Authentification 2FA</span>
            </div>
            <Badge className="bg-green-100 text-green-800">Activé</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span>Tentatives de connexion</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">3 échecs</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSecurityCenter;