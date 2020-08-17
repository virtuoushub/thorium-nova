import {Field, ObjectType} from "type-graphql";
import {Component, ComponentOmit} from "./utils";

@ObjectType()
class Composition {
  @Field({
    description: "A component of the atmosphere, like nitrogen, oxygen, etc.",
  })
  component!: string;
  @Field({
    description:
      "The concentration of the component as a percentage of the whole",
  })
  concentration!: number;
}
@ObjectType()
class AtmosphereComposition extends Component {
  static id: "atmosphereComposition" = "atmosphereComposition";
  static defaults: ComponentOmit<AtmosphereComposition> = {
    composition: [],
  };

  @Field(type => [Composition])
  composition!: Composition[];
}
