import { useState } from "react";
import CreateTab from "./components/CreateTab";
import { deleteTab, getData } from "./lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./components/ui/button";
import CreateShortcut from "./components/CreateShortcut";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

function App() {
  const [data, setData] = useState(getData());

  const tabList = Object.entries(data);
  const tabNameList = tabList.map(([folderName]) => folderName);

  function updateData() {
    setData(getData());
  }

  return (
    <div className="w-full h-full p-2">
      <div className="w-full flex gap-2">
        <CreateTab onDataUpdate={updateData} />
        {tabList.length > 0 && <CreateShortcut onDataUpdate={updateData} tabNameList={tabNameList} />}
      </div>

      <Tabs className="w-full my-2">
        <TabsList className="grid grid-cols-3 w-full h-auto bg-white">
          {tabNameList.map((folderName) => (
            <TabsTrigger
              key={folderName}
              value={folderName}
              className="w-full data-[state=active]:bg-black/80 data-[state=active]:text-white rounded-none"
            >
              <p className="truncate overflow-hidden whitespace-nowrap">{folderName}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabNameList.map((folderName) => (
          <TabsContent key={folderName} value={folderName} className="flex-1 w-auto px-1">
            {data[folderName].map((shortcut, i) => (
              <div
                key={`${shortcut.name}-${i}`}
                className="w-full flex justify-between bg-black/70 text-white hover:bg-black/80 py-1 px-2 rounded-md items-center duration-200 ease-in hover:cursor-pointer"
              >
                <p className="text-base ml-2">{shortcut.name}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-transparent hover:text-white">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuItem>
                      <button>Delete</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            <div className="w-full flex justify-end">
              <Button
                onClick={() => {
                  deleteTab(folderName);
                  updateData();
                }}
                className="bg-red-700 mt-2"
              >
                Delete Tab
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default App;
