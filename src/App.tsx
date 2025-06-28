import { useState } from "react";
import CreateTab from "./components/CreateTab";
import { getData } from "./lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const [data, setData] = useState(getData());

  function handleDataUpdate() {
    setData(getData());
  }

  return (
    <div className="w-full h-full p-2">
      <CreateTab onDataUpdate={handleDataUpdate} />
      <Tabs className="w-full my-2">
        <TabsList className="grid grid-cols-3 w-full h-auto bg-white">
          {Object.entries(data).map(([folderName]) => (
            <TabsTrigger key={folderName} value={folderName} className="w-full data-[state=active]:bg-cyan-300/50 rounded-none">
              <p className="truncate overflow-hidden whitespace-nowrap">{folderName}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(data).map(([folderName]) => (
          <TabsContent key={folderName} value={folderName} className="flex-1 w-auto px-1">
            {folderName + " content"}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default App;
