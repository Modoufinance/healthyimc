import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

const AdminReports = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rapports Personnalisés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 flex-col">
            <Calendar className="h-6 w-6 mb-2" />
            Rapport Hebdomadaire
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Download className="h-6 w-6 mb-2" />
            Export Utilisateurs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReports;