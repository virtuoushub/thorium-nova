import {Field, ObjectType} from "type-graphql";
import {TimerComponent} from "./timer";
import {IsShipComponent} from "./isShip";
import {AlertLevelComponent} from "./alertLevel";
import {IdentityComponent} from "./identity";
import {TagsComponent} from "./tags";
import {ThemeComponent} from "./theme";
import {StationComplementComponent} from "./stationComplement";
import {ShipAssetsComponent} from "./shipAssets";
import {IsPlanetComponent} from "./isPlanet";
import {IsStarComponent} from "./isStar";
import {PlanetarySystemComponent} from "./planetarySystem";
import {PositionComponent} from "./position";
import {SatelliteComponent} from "./satellite";
import {SizeComponent} from "./size";
import {TemperatureComponent} from "./temperature";

@ObjectType()
export default class Components {
  @Field()
  timer?: TimerComponent;

  @Field()
  identity?: IdentityComponent;

  @Field()
  tags?: TagsComponent;

  @Field()
  position?: PositionComponent;

  @Field()
  size?: SizeComponent;

  @Field()
  temperature?: TemperatureComponent;

  // Ship Entity Components
  @Field()
  isShip?: IsShipComponent;

  @Field()
  shipAssets?: ShipAssetsComponent;

  @Field()
  alertLevel?: AlertLevelComponent;

  @Field()
  theme?: ThemeComponent;

  @Field()
  stationComplement?: StationComplementComponent;

  // Stellar Objects Components
  @Field()
  planetarySystem?: PlanetarySystemComponent;

  @Field()
  isStar?: IsStarComponent;

  @Field()
  isPlanet?: IsPlanetComponent;

  @Field()
  satellite?: SatelliteComponent;
}

export const registeredComponents = [
  TimerComponent,
  IsShipComponent,
  AlertLevelComponent,
  IdentityComponent,
  TagsComponent,
  ThemeComponent,
  ShipAssetsComponent,
  PositionComponent,
  SizeComponent,
  TemperatureComponent,
  StationComplementComponent,
  PlanetarySystemComponent,
  IsStarComponent,
  IsPlanetComponent,
  SatelliteComponent,
];
