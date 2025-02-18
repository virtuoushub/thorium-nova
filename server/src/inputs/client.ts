import {pubsub} from "../utils/pubsub";
import {DataContext} from "../utils/DataContext";
import Station, {staticStations} from "../classes/Station";

export const clientInputs = {
  clientSetName: (context: DataContext, params: {name: string}) => {
    if (!params.name) throw new Error("name is a required parameter.");
    if (typeof params.name !== "string")
      throw new Error("name must be a string.");
    if (!params.name.trim()) throw new Error("name cannot be blank.");

    context.server.clients[context.clientId].name = params.name;
    pubsub.publish("clients");
    pubsub.publish("client", {clientId: context.clientId});

    return {
      clientId: context.clientId,
      name: params.name,
    };
  },
  clientSetStation: async (
    context: DataContext,
    params:
      | {shipId: number; stationId: string; clientId?: string}
      | {shipId: null; clientId?: string}
  ) => {
    let flightClient = context.flightClient;
    if (params.clientId) {
      // Only hosts can change other client's station assignment
      if (!context.isHost || !params.clientId) {
        throw new Error(
          "You must be host to change other client's assignments."
        );
      }
      flightClient = context.findFlightClient(params.clientId);
    }
    if (!flightClient) {
      throw new Error("No flight has been started.");
    }

    // If shipId is null, we're removing ourselves from the flight.
    if (params.shipId === null) {
      flightClient.stationId = null;
      flightClient.shipId = null;

      pubsub.publish("clients");
      pubsub.publish("client", {clientId: context.clientId});
      pubsub.publish("station", {clientId: context.clientId});
      pubsub.publish("theme", {clientId: context.clientId});
      pubsub.publish("ship", {clientId: context.clientId});
      return flightClient;
    }
    const ship = context.flight?.ships.find(ship => ship.id === params.shipId);
    if (!ship) {
      throw new Error("No ship with that ID exists.");
    }
    const station = staticStations
      .concat(ship.components.stationComplement?.stations || [])
      .find(station => station.name === params.stationId);

    if (!station) {
      throw new Error("No station with that ID exists.");
    }
    flightClient.stationId = params.stationId;
    flightClient.shipId = params.shipId;
    pubsub.publish("clients");
    pubsub.publish("client", {clientId: context.clientId});
    pubsub.publish("station", {clientId: context.clientId});
    pubsub.publish("theme", {clientId: context.clientId});
    pubsub.publish("ship", {shipId: flightClient.shipId});
    return flightClient;
  },
  clientLogin: (context: DataContext, params: {loginName: string}) => {
    if (context.flightClient) {
      context.flightClient.loginName = params.loginName;
    }
    pubsub.publish("clients");
    pubsub.publish("client", {clientId: context.clientId});
  },
  clientLogout: (context: DataContext) => {
    if (context.flightClient) {
      context.flightClient.loginName = "";
    }
    pubsub.publish("client", {clientId: context.clientId});
    pubsub.publish("clients");
  },
  clientOverrideStation: async (
    context: DataContext,
    params: {station?: Station}
  ) => {
    if (!context.flightClient || !context.flight) {
      throw new Error("No flight has been started.");
    }
    context.flightClient.stationOverride = params.station;
    if (params.station) {
      context.flightClient.shipId = context.flight.playerShips[0].id;
      pubsub.publish("ship", {shipId: context.flightClient.shipId});
      context.flightClient.loginName = "Test User";
    } else {
      context.flightClient.shipId = null;
      context.flightClient.loginName = "";
    }
    pubsub.publish("station", {clientId: context.clientId});
    pubsub.publish("client", {clientId: context.clientId});
    pubsub.publish("theme", {clientId: context.clientId});
  },
  clientClaimHost: async (context: DataContext) => {
    const hasExistingHost = Object.values(context.server.clients).some(
      client => client.isHost && client.connected
    );
    if (!hasExistingHost) {
      context.client.isHost = true;
    }
    pubsub.publish("clients");
    pubsub.publish("client", {clientId: context.clientId});
    pubsub.publish("thorium");
  },
};
