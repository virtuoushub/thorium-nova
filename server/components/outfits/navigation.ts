import Entity from "server/helpers/ecs/entity";
import {Field, ObjectType} from "type-graphql";
import {Component, ComponentOmit} from "../utils";

@ObjectType()
export class NavigationComponent extends Component {
  static id: "navigation" = "navigation";
  static defaults: ComponentOmit<NavigationComponent> = {
    destination: null,
    locked: false,
    maxDestinationRadius: 2000,
  };

  @Field(type => Entity, {description: "The desired destination object."})
  destination: Entity | null = null;
  @Field({description: "Whether the course has been locked in."})
  locked = false;
  @Field({
    description: "The maximum radius which destinations can be set in ly.",
  })
  maxDestinationRadius = 2000;
}
/**
 * Setting course has the following steps:
 * 1. Open up the starmap and find the destination you want to go to
 * 2. Reticles appear on the viewscreen for the Pilot to line
 *    up with.
 * 3. The pilot lines up the course using Thrusters, and clicks
 *    the "Lock In" button. If the current trajectory is within
 *    a certain threshold, the thruster system is locked and the
 *    ship is now on course.
 * 4. The destination entity is stored; the destination position
 *    is looked up by reference.
 */
