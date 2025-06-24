import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Converter from "./Converter";

const Main = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Unit Converter Suite</h1>

        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="converter">
            <Converter />
          </TabsContent>

          <TabsContent value="calculator">
            <div className="p-6 border rounded-md">
              {/* Placeholder until we build the Calculator */}
              <p className="text-center text-muted-foreground">Calculator coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Main;
