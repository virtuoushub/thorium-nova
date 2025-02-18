import {Kelvin, Kilometer, TerranMass, Year} from "../utils/unitTypes";
import {Range} from "../utils/randomFromRange";

export type PlanetTypes =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "S";
export type Zone = ("hot" | "cold" | "habitable")[];
export type AtmosphericComposition = {
  component: string;
  concentration: number;
}[];

const possibleRingMaps = [
  "/plugins/Thorium Default/assets/default/rings/rings1.png",
  "/plugins/Thorium Default/assets/default/rings/rings2.png",
  "/plugins/Thorium Default/assets/default/rings/rings3.png",
  "/plugins/Thorium Default/assets/default/rings/rings4.png",
  "/plugins/Thorium Default/assets/default/rings/ring_texturesDust.png",
  "/plugins/Thorium Default/assets/default/rings/ring_texturesSmall.png",
  "/plugins/Thorium Default/assets/default/rings/ring_texturesClouds.png",
  "/plugins/Thorium Default/assets/default/rings/ring_texturesSharp.png",
  "/plugins/Thorium Default/assets/default/rings/ring_texturesRocks.png",
];

interface PlanetType {
  name: string;
  classification: PlanetTypes;
  temperatureRange: Range<Kelvin>;
  zone: Zone;
  radiusRange: Range<Kilometer>;
  ageRange: Range<Year>;
  terranMassRange: Range<TerranMass>;
  population: number | Range<number>;
  atmosphericComposition: AtmosphericComposition;
  habitable: boolean;
  lifeforms: string[];

  possibleTextureMaps: string[];

  hasRings: number;
  possibleRingMaps: string[];

  hasClouds: number;
  possibleCloudMaps: string[];
}

export const planetTypes: PlanetType[] = [
  {
    classification: "A",
    name: "Geothermal",
    ageRange: {min: 1000000, max: 2000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None"],
    population: 0,
    radiusRange: {min: 500, max: 5000},
    zone: ["habitable", "cold"],
    temperatureRange: {min: 1383, max: 1783},
    terranMassRange: {min: 0.1, max: 1.2},
    hasClouds: 0,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/planet_textureAuric.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureAcid.jpg",
      "/plugins/Thorium Default/assets/default/planets/mercurymap.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "B",
    name: "Geomorteus",
    ageRange: {min: 1000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None"],
    population: 0,
    radiusRange: {min: 500, max: 5000},
    zone: ["hot"],
    temperatureRange: {min: 90, max: 740},
    terranMassRange: {min: 0.1, max: 1.2},
    hasClouds: 0,
    hasRings: 0,

    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/2k_mercury.jpg",
      "/plugins/Thorium Default/assets/default/planets/plutomap1k.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "C",
    name: "Geoinactive",
    ageRange: {min: 20000000, max: 1000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None"],
    population: 0,
    radiusRange: {min: 500, max: 5000},
    zone: ["habitable", "cold"],
    temperatureRange: {min: 33, max: 55},
    terranMassRange: {min: 0.1, max: 1},
    hasClouds: 0,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/planet_textureDust.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureAzure.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureChondrite.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "D",
    name: "Planetoid/Moon",
    ageRange: {min: 20000000, max: 1000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None"],
    population: 0,
    radiusRange: {min: 50, max: 500},
    zone: ["hot", "habitable", "cold"],
    temperatureRange: {min: 146, max: 400},
    terranMassRange: {min: 0.01, max: 0.4},
    hasClouds: 0,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/2k_moon.jpg",
      "/plugins/Thorium Default/assets/default/planets/Icy.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureBurnt.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "E",
    name: "Geoplastic",
    ageRange: {min: 1000000, max: 2000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None"],
    population: 0,
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 800, max: 1443},
    terranMassRange: {min: 0.1, max: 1.5},
    hasClouds: 0,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/planet_textureHot_light.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureHot.jpg",
      "/plugins/Thorium Default/assets/default/planets/Volcanic.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "F",
    name: "Geometallic",
    ageRange: {min: 1000000000, max: 3000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None"],
    population: 0,
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 500, max: 900},
    terranMassRange: {min: 0.1, max: 1.5},
    hasClouds: 0,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/planet_textureCimmerian.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureCrimson.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "G",
    name: "Geocrystalline",
    ageRange: {min: 3000000000, max: 4000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: ["None", "Primitive single-celled organisms"],
    population: 0,
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 400, max: 600},
    terranMassRange: {min: 0.5, max: 1.5},
    hasClouds: 0,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/planet_textureCarbide.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureChlorine.jpg",
    ],
    possibleCloudMaps: [],
    possibleRingMaps,
  },
  {
    classification: "H",
    name: "Desert",
    ageRange: {min: 4000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: [
      "None",
      "Primitive single-celled organisms",
      "Draught-resistant plants",
    ],
    population: 0,
    radiusRange: {min: 4000, max: 7500},
    zone: ["hot"],
    temperatureRange: {min: 500, max: 900},
    terranMassRange: {min: 0.1, max: 1.5},
    hasClouds: 0.7,
    hasRings: 0,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/2k_venus_atmosphere.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureDesertic.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "I",
    name: "Gas Supergiant",
    ageRange: {min: 2000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: [
      "None",
      "Floating single-celled lifeforms",
      "Hydrocarbon-based gas bag animals",
    ],
    population: 0,
    radiusRange: {min: 70000, max: 5000000},
    zone: ["cold"],
    temperatureRange: {min: 128, max: 340},
    terranMassRange: {min: 300, max: 1000},
    hasClouds: 0.4,
    hasRings: 0.8,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/2k_saturn.jpg",
      "/plugins/Thorium Default/assets/default/planets/2k_jupiter.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureFluorescent.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureBlueGiant.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureGiant.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureGiantSharp.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSwept.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds4.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "J",
    name: "Gas Giant",
    ageRange: {min: 2000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: false,
    lifeforms: [
      "None",
      "Floating single-celled lifeforms",
      "Hydrocarbon-based gas bag animals",
    ],
    population: 0,
    radiusRange: {min: 25000, max: 70000},
    zone: ["cold"],
    temperatureRange: {min: 128, max: 340},
    terranMassRange: {min: 10, max: 100},
    hasClouds: 0.4,
    hasRings: 0.8,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/2k_neptune.jpg",
      "/plugins/Thorium Default/assets/default/planets/2k_uranus.jpg",
      "/plugins/Thorium Default/assets/default/planets/Gaseous2.jpg",
      "/plugins/Thorium Default/assets/default/planets/Gaseous1.jpg",
      "/plugins/Thorium Default/assets/default/planets/Gaseous3.jpg",
      "/plugins/Thorium Default/assets/default/planets/Gaseous4.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureGiant.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureGiantSharp.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSwept.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds4.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "K",
    name: "Adaptable",
    ageRange: {min: 4000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: true,
    lifeforms: ["None", "Primitive single-celled organisms"],
    population: {min: 0, max: 50000},
    radiusRange: {min: 2500, max: 5000},
    zone: ["habitable"],
    temperatureRange: {min: 117, max: 303},
    terranMassRange: {min: 0.1, max: 1.5},
    hasClouds: 0.4,
    hasRings: 0.2,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/planet_textureAlkali.jpg",
      "/plugins/Thorium Default/assets/default/planets/planet_textureCyanic.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "L",
    name: "Martian",
    ageRange: {min: 4000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: true,
    lifeforms: ["Primitive single-celled organisms", "Hardy plant life"],
    population: {min: 0, max: 50000},
    radiusRange: {min: 2500, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 150, max: 330},
    terranMassRange: {min: 0.1, max: 1.5},
    hasClouds: 0.4,
    hasRings: 0.3,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/Martian.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "M",
    name: "Terrestrial",
    ageRange: {min: 3000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: true,
    lifeforms: ["Varied and extensive vegetation and animal life, humanoids"],
    population: {min: 10000000, max: 10000000000},
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 288, max: 303},
    terranMassRange: {min: 0.5, max: 1.5},
    hasClouds: 1,
    hasRings: 0.5,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/Terrestrial1.jpg",
      "/plugins/Thorium Default/assets/default/planets/Terrestrial2.jpg",
      "/plugins/Thorium Default/assets/default/planets/Terrestrial3.jpg",
      "/plugins/Thorium Default/assets/default/planets/Terrestrial4.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds2.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds3.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureMedium.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "N",
    name: "Venusian",
    ageRange: {min: 3000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: true,
    lifeforms: ["Aquatic-based vegetation and animal life, humanoids"],
    population: {min: 5000000, max: 700000000},
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 350, max: 735},
    terranMassRange: {min: 0.5, max: 1.5},
    hasClouds: 1,
    hasRings: 0.5,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/Venusian.jpg",
      "/plugins/Thorium Default/assets/default/planets/2k_venus_surface.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds2.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds3.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureMedium.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "O",
    name: "Oceanic",
    ageRange: {min: 3000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: true,
    lifeforms: ["Aquatic-based vegetation and animal life, humanoids"],
    population: {min: 5000000, max: 700000000},
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 290, max: 303},
    terranMassRange: {min: 0.5, max: 1.5},
    hasClouds: 1,
    hasRings: 0.5,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/Tropical.jpg",
      "/plugins/Thorium Default/assets/default/planets/Swamp.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds2.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds3.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureMedium.png",
    ],
    possibleRingMaps,
  },
  {
    classification: "P",
    name: "Glaciated",
    ageRange: {min: 3000000000, max: 10000000000},
    atmosphericComposition: [],
    habitable: true,
    lifeforms: ["Hardy vegetation, animal life, humanoids"],
    population: {min: 20000, max: 200000},
    radiusRange: {min: 5000, max: 7500},
    zone: ["habitable"],
    temperatureRange: {min: 255, max: 270},
    terranMassRange: {min: 0.5, max: 1.5},
    hasClouds: 1,
    hasRings: 0.5,
    possibleTextureMaps: [
      "/plugins/Thorium Default/assets/default/planets/Icy.jpg",
      "/plugins/Thorium Default/assets/default/planets/Alpine.jpg",
    ],
    possibleCloudMaps: [
      "/plugins/Thorium Default/assets/default/clouds/Clouds1.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds2.png",
      "/plugins/Thorium Default/assets/default/clouds/Clouds3.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureSoft.png",
      "/plugins/Thorium Default/assets/default/clouds/clouds_textureMedium.png",
    ],
    possibleRingMaps,
  },
];
