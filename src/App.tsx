import { useState } from "react";
import CreateTab from "./components/CreateTab";
import { deleteTab, getData } from "./lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./components/ui/button";
import CreateShortcut from "./components/CreateShortcut";
import { Table, TableBody, TableCell, TableRow } from "./components/ui/table";

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
        {tabList.length > 1 && <CreateShortcut onDataUpdate={updateData} tabNameList={tabNameList} />}
      </div>

      <Tabs className="w-full my-2">
        <TabsList className="grid grid-cols-3 w-full h-auto bg-white">
          {tabNameList.map((folderName) => (
            <TabsTrigger key={folderName} value={folderName} className="w-full data-[state=active]:bg-cyan-300/50 rounded-none">
              <p className="truncate overflow-hidden whitespace-nowrap">{folderName}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabNameList.map((folderName) => (
          <TabsContent key={folderName} value={folderName} className="flex-1 w-auto px-1">
            <div className="w-full">
              <Table>
                <TableBody>
                  {data[folderName].map(({ name, link }) => (
                    <TableRow key={name}>
                      <TableCell>
                        <a href={link}>{name}</a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
