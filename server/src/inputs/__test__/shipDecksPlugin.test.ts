import {decksPluginInputs} from "../plugins/ships/decks";
import {promises as fs} from "fs";
import {createMockDataContext} from "server/src/utils/createMockDataContext";

describe("ship decks plugin input", () => {
  it("should create a new deck", async () => {
    const mockDataContext = createMockDataContext();

    const shipDeck = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
    });

    expect(shipDeck).toEqual({backgroundUrl: "", name: "Deck 1", nodes: []});
    const shipDeck2 = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
    });

    expect(shipDeck2).toEqual({backgroundUrl: "", name: "Deck 2", nodes: []});
  });
  it("should delete a deck", async () => {
    const mockDataContext = createMockDataContext();

    const shipDeck = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
    });

    const shipDeck2 = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
    });

    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks.length
    ).toEqual(2);

    decksPluginInputs.pluginShipDeckDelete(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
      index: 0,
    });

    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks.length
    ).toEqual(1);
    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks[0].name
    ).toEqual("Deck 2");
  });
  it("should update a deck", async () => {
    const mockDataContext = createMockDataContext();

    const shipDeck = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
    });

    const shipDeck2 = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
    });

    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks[0].name
    ).toEqual("Deck 1");

    decksPluginInputs.pluginShipDeckUpdate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
      deckId: "Deck 1",
      newName: "A Deck",
    });

    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks[0].name
    ).toEqual("A Deck");

    decksPluginInputs.pluginShipDeckUpdate(mockDataContext, {
      pluginId: "Test Plugin",
      shipId: "Test Template",
      deckId: "A Deck",
      newIndex: 1,
    });

    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks[1].name
    ).toEqual("A Deck");
    expect(
      mockDataContext.server.plugins[0].aspects.ships[0].decks[0].name
    ).toEqual("Deck 2");
  });

  describe("Deck Nodes", () => {
    it("should create a few new deck nodes", () => {
      const mockDataContext = createMockDataContext();

      const shipDeck = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
      });
      const deck = mockDataContext.server.plugins[0].aspects.ships[0].decks[0];
      expect(deck.nodes.length).toEqual(0);

      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 50,
        y: 50,
      });

      expect(deck.nodes.length).toEqual(1);
      expect(deck.nodes[0].x).toEqual(50);
      expect(deck.nodes[0].y).toEqual(50);
      expect(deck.nodes[0].id).toEqual(1);

      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 100,
        y: 100,
      });

      expect(deck.nodes.length).toEqual(2);
      expect(deck.nodes[1].x).toEqual(100);
      expect(deck.nodes[1].y).toEqual(100);
      expect(deck.nodes[1].id).toEqual(2);
    });
    it("should delete a deck node", () => {
      const mockDataContext = createMockDataContext();

      const shipDeck = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
      });
      const deck = mockDataContext.server.plugins[0].aspects.ships[0].decks[0];
      expect(deck.nodes.length).toEqual(0);

      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 50,
        y: 50,
      });

      expect(deck.nodes.length).toEqual(1);
      expect(deck.nodes[0].x).toEqual(50);
      expect(deck.nodes[0].y).toEqual(50);
      expect(deck.nodes[0].id).toEqual(1);

      decksPluginInputs.pluginShipDeckRemoveNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        nodeId: 1,
      });

      expect(deck.nodes.length).toEqual(0);
    });
    it("should update a deck node", () => {
      const mockDataContext = createMockDataContext();

      const shipDeck = decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
      });
      const deck = mockDataContext.server.plugins[0].aspects.ships[0].decks[0];
      expect(deck.nodes.length).toEqual(0);

      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 50,
        y: 50,
      });

      expect(deck.nodes.length).toEqual(1);
      expect(deck.nodes[0].x).toEqual(50);
      expect(deck.nodes[0].y).toEqual(50);
      expect(deck.nodes[0].id).toEqual(1);

      decksPluginInputs.pluginShipDeckUpdateNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        nodeId: 1,
        x: 100,
        y: 100,
      });

      expect(deck.nodes.length).toEqual(1);
      expect(deck.nodes[0].x).toEqual(100);
      expect(deck.nodes[0].y).toEqual(100);
      expect(deck.nodes[0].id).toEqual(1);

      expect(deck.nodes[0].isRoom).toEqual(false);
      decksPluginInputs.pluginShipDeckUpdateNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        nodeId: 1,
        isRoom: true,
      });
      expect(deck.nodes[0].isRoom).toEqual(true);

      expect(deck.nodes[0].flags).toEqual([]);
      decksPluginInputs.pluginShipDeckUpdateNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        nodeId: 1,
        flags: ["cargo"],
      });
      expect(deck.nodes[0].flags).toEqual(["cargo"]);

      expect(deck.nodes[0].name).toEqual("");
      decksPluginInputs.pluginShipDeckUpdateNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        nodeId: 1,
        name: "Test Node",
      });
      expect(deck.nodes[0].name).toEqual("Test Node");

      expect(deck.nodes[0].radius).toEqual(0);
      decksPluginInputs.pluginShipDeckUpdateNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        nodeId: 1,
        radius: 10,
      });
      expect(deck.nodes[0].radius).toEqual(10);
    });
  });
  describe("Deck Edges", () => {
    it("should create a deck edge", () => {
      const mockDataContext = createMockDataContext();

      decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
      });
      const ship = mockDataContext.server.plugins[0].aspects.ships[0];
      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 50,
        y: 50,
      });
      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 100,
        y: 50,
      });
      expect(ship.deckEdges.length).toEqual(0);

      decksPluginInputs.pluginShipDeckAddEdge(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        from: 2,
        to: 1,
      });

      expect(ship.deckEdges.length).toEqual(1);
      expect(ship.deckEdges[0].to).toEqual(1);
      expect(ship.deckEdges[0].from).toEqual(2);
      expect(ship.deckEdges[0].id).toEqual(1);
    });
    it("should delete a deck edge", () => {
      const mockDataContext = createMockDataContext();

      decksPluginInputs.pluginShipDeckCreate(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
      });
      const ship = mockDataContext.server.plugins[0].aspects.ships[0];
      expect(ship.deckEdges.length).toEqual(0);

      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 50,
        y: 50,
      });
      decksPluginInputs.pluginShipDeckAddNode(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        deckId: "Deck 1",
        x: 100,
        y: 50,
      });
      expect(ship.deckEdges.length).toEqual(0);

      decksPluginInputs.pluginShipDeckAddEdge(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        from: 2,
        to: 1,
      });

      expect(ship.deckEdges.length).toEqual(1);
      decksPluginInputs.pluginShipDeckRemoveEdge(mockDataContext, {
        pluginId: "Test Plugin",
        shipId: "Test Template",
        edgeId: 1,
      });
      expect(ship.deckEdges.length).toEqual(0);
    });
  });
  afterAll(async () => {
    try {
      await fs.rm("plugins", {recursive: true});
    } catch {}
  });
});
