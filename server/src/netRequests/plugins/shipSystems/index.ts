import {
  AllShipSystems,
  ShipSystemTypes,
} from "server/src/classes/Plugins/ShipSystems/shipSystemTypes";
import {DataContext} from "server/src/utils/DataContext";
import {getPlugin} from "../utils";

export const pluginShipSystemsRequests = {
  pluginShipSystems(
    context: DataContext,
    params: {pluginId?: string},
    publishParams: {pluginId: string} | null
  ) {
    if (publishParams && params.pluginId !== publishParams.pluginId) throw null;
    if (!params?.pluginId)
      return context.server.plugins
        .reduce(
          (acc, plugin) => acc.concat(plugin.aspects.shipSystems),
          [] as typeof plugin.aspects.shipSystems
        )
        .map(({plugin, ...shipSystem}) => ({
          ...shipSystem,
          pluginName: plugin.name,
        }));
    const plugin = getPlugin(context, params.pluginId);
    return plugin.aspects.shipSystems.map(({plugin, ...shipSystem}) => ({
      ...shipSystem,
      pluginName: plugin.name,
    }));
  },
  pluginShipSystem<T extends keyof AllShipSystems>(
    context: DataContext,
    params: {pluginId: string; type?: T; systemId: string},
    publishParams: {pluginId: string; systemId: string} | null
  ) {
    if (publishParams && params.pluginId !== publishParams.pluginId) throw null;
    const plugin = getPlugin(context, params.pluginId);
    const {plugin: sysPlugin, ...system} = plugin.aspects.shipSystems.find(
      system => system.name === params.systemId
    ) as AllShipSystems[keyof AllShipSystems];
    if (!system) throw null;

    return {...system, pluginName: plugin.name} as AllShipSystems[T];
  },
  availableShipSystems() {
    return Object.keys(ShipSystemTypes).map(key => {
      const type = key as keyof typeof ShipSystemTypes;
      const systemConstructor = ShipSystemTypes[type];
      return {type, flags: systemConstructor.flags};
    });
  },
};
