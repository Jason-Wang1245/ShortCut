import { useState } from "react";
import CreateTab from "./components/CreateTab";
import CreateShortcut from "./components/CreateShortcut";
import { getData } from "./lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const [data, setData] = useState(getData());

  function handleDataUpdate() {
    setData(getData());
  }

  return (
    <div className="w-full h-full p-2">
      <div className="flex gap-1 my-2">
        <CreateShortcut />
        <CreateTab onDataUpdate={handleDataUpdate} />
      </div>
      {/* <div className="flex gap-3 my-2">
        {Object.entries(data).map(([folderName]) => (
          <div key={folderName} className="place-content-end text-center w-16">
            <div className="h-16 w-16 bg-amber-400 rounded-xl" />
            <p className="w-16 text-ellipsis truncate text-xs">{folderName}</p>
          </div>
        ))}
      </div> */}
      <Tabs className="w-full">
        <TabsList className="flex-wrap w-full h-auto bg-white">
          {Object.entries(data).map(([folderName]) => (
            <TabsTrigger key={folderName} value={folderName} className="text-left flex-1 w-auto data-[state=active]:bg-cyan-300/50 rounded-none">
              {folderName}
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
