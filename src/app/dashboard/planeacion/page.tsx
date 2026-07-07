import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalculator } from "@/components/dashboard/planning/compound-interest-calculator";
import { FireCalculator } from "@/components/dashboard/planning/fire-calculator";
import { RetirementCalculator } from "@/components/dashboard/planning/retirement-calculator";

export default function PlaneacionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Planeación financiera</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Simula distintos caminos antes de comprometer tu capital.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calculadoras</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compound">
            <TabsList>
              <TabsTrigger value="compound">Interés compuesto</TabsTrigger>
              <TabsTrigger value="fire">FIRE / Independencia</TabsTrigger>
              <TabsTrigger value="retirement">Retiro e inflación</TabsTrigger>
            </TabsList>
            <TabsContent value="compound">
              <CompoundInterestCalculator />
            </TabsContent>
            <TabsContent value="fire">
              <FireCalculator />
            </TabsContent>
            <TabsContent value="retirement">
              <RetirementCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
