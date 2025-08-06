import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout, Plus, Settings } from "lucide-react";

const AdminWidgetManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layout className="h-5 w-5" />
          Widgets Configurables
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-24 flex-col">
            <Plus className="h-6 w-6 mb-2" />
            Ajouter Widget
          </Button>
          <Button variant="outline" className="h-24 flex-col">
            <Settings className="h-6 w-6 mb-2" />
            Configurer Layout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminWidgetManager;