import {ServerClient} from "../classes/Client";
import {FlightClient} from "../classes/FlightClient";
import type {ServerDataModel} from "../classes/ServerDataModel";
import type {FlightDataModel} from "../classes/FlightDataModel";

/**
 * An instance of this class is available in every input and subscription handler
 * You can use getters to provide convenient computed data
 *
 * Be sure to update the docs page any time you modify the properties of this class
 */

export class DataContext {
  constructor(
    public clientId: string,
    public database: {server: ServerDataModel; flight: FlightDataModel | null}
  ) {
    // Let's generate a client if it doesn't already exist in the database
    const client = database.server.clients[clientId];
    if (!client) {
      database.server.clients[clientId] = new ServerClient({id: clientId});
    }
  }
  get server() {
    return this.database.server;
  }
  get flight() {
    return this.database.flight;
  }
  set flight(flight: FlightDataModel | null) {
    this.database.flight = flight;
  }
  get client() {
    return this.database.server.clients[this.clientId];
  }
  get flightClient() {
    return this.findFlightClient(this.clientId);
  }
  get isHost() {
    return this.client.isHost;
  }
  findFlightClient(clientId: string) {
    if (!this.database.flight) return null;
    if (!this.database.flight.clients[clientId]) {
      this.database.flight.clients[clientId] = new FlightClient({
        id: clientId,
        flightId: this.database.flight.name,
      });
    }
    return this.database.flight.clients[clientId];
  }
  get ship() {
    return this.flight?.playerShips.find(
      s => s.id === this.flightClient?.shipId
    );
  }
}
