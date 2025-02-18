import SearchableList from "@thorium/ui/SearchableList";
import {useNetRequest} from "client/src/context/useNetRequest";
import {useParams} from "react-router-dom";
import Button from "@thorium/ui/Button";
import {useState} from "react";
import {capitalCase} from "change-case";
import {netSend} from "client/src/context/netSend";
export function Systems() {
  const {pluginId, shipId} = useParams() as {pluginId: string; shipId: string};
  const allSystems = useNetRequest("pluginShipSystems");
  const ship = useNetRequest("pluginShip", {pluginId, shipId});

  const [allPlugins, setAllPlugins] = useState(false);

  const systems = allSystems.filter(
    sys =>
      !ship.shipSystems.some(
        ss => ss.systemId === sys.name && ss.pluginId === sys.pluginName
      ) && (allPlugins ? true : sys.pluginName === pluginId)
  );
  return (
    <>
      <div className="w-72">
        {/* TODO April 27 2022 - Figure out some way to define and determine the maximum number of
        one type of system that can be assigned to a ship. Ex. only one impulse engine should be assignable. */}
        <h3 className="text-2xl font-bold">Available Systems</h3>
        <SearchableList
          showSearchLabel={false}
          selectedItem={null}
          setSelectedItem={item => {
            netSend("pluginShipToggleSystem", {
              shipId,
              pluginId,
              systemId: item.systemId,
              systemPlugin: item.pluginId,
            });
          }}
          items={systems.map(c => ({
            id: {systemId: c.name, pluginId: c.pluginName},
            category: capitalCase(c.type),
            label: c.name,
            pluginName: c.pluginName,
          }))}
        />
        {!allPlugins && (
          <Button
            className="mt-4 btn-info btn-sm w-full"
            onClick={() => setAllPlugins(true)}
          >
            Include Other Plugins
          </Button>
        )}
        {allPlugins && (
          <Button
            className="btn-warning mt-4 btn-sm w-full"
            onClick={() => setAllPlugins(false)}
          >
            Exclude Other Plugins
          </Button>
        )}
      </div>
      <div className="w-72">
        <h3 className="text-2xl font-bold">Assigned Systems</h3>
        <SearchableList
          showSearchLabel={false}
          selectedItem={null}
          setSelectedItem={item => {
            netSend("pluginShipToggleSystem", {
              shipId,
              pluginId,
              systemId: item.systemId,
              systemPlugin: item.pluginId,
            });
          }}
          items={ship.shipSystems
            .map(c => {
              const system = allSystems.find(
                s => s.name === c.systemId && s.pluginName === c.pluginId
              );
              if (!system) return null;
              return {
                id: {systemId: c.systemId, pluginId: system.pluginName},
                category: capitalCase(system.type),
                label: system.name,
                pluginName: system.pluginName,
              };
            })
            .filter(notNull)}
        />
      </div>
    </>
  );
}

function notNull<T>(x: T): x is NonNullable<T> {
  return x !== null;
}
