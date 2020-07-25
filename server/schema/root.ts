import App from "../app";
import {Mutation, Resolver} from "type-graphql";

@Resolver()
export class RootResolver {
  @Mutation(returns => String)
  snapshot() {
    App.snapshot();
    return "";
  }
}
