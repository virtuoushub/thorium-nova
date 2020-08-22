import {gql} from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type PositionInput = {
  x: Maybe<Scalars["Float"]>;
  y: Maybe<Scalars["Float"]>;
  z: Maybe<Scalars["Float"]>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = "SCALAR",
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = "OBJECT",
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = "INTERFACE",
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = "UNION",
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = "ENUM",
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = "INPUT_OBJECT",
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = "LIST",
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = "NON_NULL",
}

/** A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies. */
export enum __DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = "QUERY",
  /** Location adjacent to a mutation operation. */
  Mutation = "MUTATION",
  /** Location adjacent to a subscription operation. */
  Subscription = "SUBSCRIPTION",
  /** Location adjacent to a field. */
  Field = "FIELD",
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = "FRAGMENT_DEFINITION",
  /** Location adjacent to a fragment spread. */
  FragmentSpread = "FRAGMENT_SPREAD",
  /** Location adjacent to an inline fragment. */
  InlineFragment = "INLINE_FRAGMENT",
  /** Location adjacent to a variable definition. */
  VariableDefinition = "VARIABLE_DEFINITION",
  /** Location adjacent to a schema definition. */
  Schema = "SCHEMA",
  /** Location adjacent to a scalar definition. */
  Scalar = "SCALAR",
  /** Location adjacent to an object type definition. */
  Object = "OBJECT",
  /** Location adjacent to a field definition. */
  FieldDefinition = "FIELD_DEFINITION",
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = "ARGUMENT_DEFINITION",
  /** Location adjacent to an interface definition. */
  Interface = "INTERFACE",
  /** Location adjacent to a union definition. */
  Union = "UNION",
  /** Location adjacent to an enum definition. */
  Enum = "ENUM",
  /** Location adjacent to an enum value definition. */
  EnumValue = "ENUM_VALUE",
  /** Location adjacent to an input object type definition. */
  InputObject = "INPUT_OBJECT",
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = "INPUT_FIELD_DEFINITION",
}

export type TimerPauseMutationVariables = Exact<{
  id: Scalars["ID"];
  pause: Scalars["Boolean"];
}>;

export type TimerPauseMutation = {
  __typename?: "Mutation";
  timerPause: Maybe<{__typename?: "Entity"; id: string}>;
};

export type TimerRemoveMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TimerRemoveMutation = {
  __typename?: "Mutation";
  timerRemove: string;
};

export type TimerCreateMutationVariables = Exact<{
  time: Scalars["String"];
  label: Scalars["String"];
}>;

export type TimerCreateMutation = {
  __typename?: "Mutation";
  timerCreate: {
    __typename?: "Entity";
    id: string;
    components: {
      __typename?: "Components";
      timer: {__typename?: "TimerComponent"; label: string; time: string};
    };
  };
};

export type TimersSubscriptionVariables = Exact<{[key: string]: never}>;

export type TimersSubscription = {
  __typename?: "Subscription";
  timers: Array<{
    __typename?: "Entity";
    id: string;
    components: {
      __typename?: "Components";
      timer: {
        __typename?: "TimerComponent";
        time: string;
        label: string;
        paused: boolean;
      };
    };
  }>;
};

export type TemplateShipAssetsSubscriptionVariables = Exact<{
  id: Scalars["ID"];
}>;

export type TemplateShipAssetsSubscription = {
  __typename?: "Subscription";
  templateShip: Maybe<{
    __typename?: "Entity";
    id: string;
    shipAssets: {
      __typename?: "ShipAssetsComponent";
      logo: string;
      model: string;
      side: string;
      top: string;
      vanity: string;
    };
  }>;
};

export type TemplateShipSetLogoMutationVariables = Exact<{
  id: Scalars["ID"];
  image: Scalars["Upload"];
}>;

export type TemplateShipSetLogoMutation = {
  __typename?: "Mutation";
  templateShipSetLogo: {
    __typename?: "Entity";
    id: string;
    shipAssets: {__typename?: "ShipAssetsComponent"; logo: string};
  };
};

export type TemplateShipSetModelMutationVariables = Exact<{
  id: Scalars["ID"];
  model: Scalars["Upload"];
  side: Scalars["Upload"];
  top: Scalars["Upload"];
  vanity: Scalars["Upload"];
}>;

export type TemplateShipSetModelMutation = {
  __typename?: "Mutation";
  templateShipSetModel: {
    __typename?: "Entity";
    id: string;
    shipAssets: {
      __typename?: "ShipAssetsComponent";
      model: string;
      side: string;
      top: string;
      vanity: string;
    };
  };
};

export type PlanetTypesQueryVariables = Exact<{[key: string]: never}>;

export type PlanetTypesQuery = {
  __typename?: "Query";
  planetTypes: Array<{
    __typename?: "PlanetType";
    id: string;
    name: string;
    classification: string;
  }>;
};

export type StarTypesQueryVariables = Exact<{[key: string]: never}>;

export type StarTypesQuery = {
  __typename?: "Query";
  starTypes: Array<{
    __typename?: "StarType";
    id: string;
    name: string;
    spectralType: string;
    prevalence: number;
  }>;
};

export type UniverseAddPlanetMutationVariables = Exact<{
  id: Scalars["ID"];
  parentId: Scalars["ID"];
  classification: Scalars["String"];
}>;

export type UniverseAddPlanetMutation = {
  __typename?: "Mutation";
  universeTemplateAddPlanet: {__typename?: "Entity"; id: string};
};

export type UniverseAddStarMutationVariables = Exact<{
  id: Scalars["ID"];
  systemId: Scalars["ID"];
  spectralType: Scalars["String"];
}>;

export type UniverseAddStarMutation = {
  __typename?: "Mutation";
  universeTemplateAddStar: {__typename?: "Entity"; id: string};
};

export type UniverseAddSystemMutationVariables = Exact<{
  id: Scalars["ID"];
  position: PositionInput;
}>;

export type UniverseAddSystemMutation = {
  __typename?: "Mutation";
  universeTemplateAddSystem: {
    __typename?: "Entity";
    id: string;
    identity: {
      __typename?: "IdentityComponent";
      name: string;
      description: string;
    };
    tags: {__typename?: "TagsComponent"; tags: Array<string>};
    position: {
      __typename?: "PositionComponent";
      x: number;
      y: number;
      z: number;
    };
  };
};

export type UniverseObjectRemoveMutationVariables = Exact<{
  id: Scalars["ID"];
  objectId: Scalars["ID"];
}>;

export type UniverseObjectRemoveMutation = {
  __typename?: "Mutation";
  universeTemplateRemoveObject: string;
};

export type UniverseSubscriptionVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UniverseSubscription = {
  __typename?: "Subscription";
  universe: Maybe<{
    __typename?: "UniverseTemplate";
    id: string;
    name: string;
    systems: Array<{
      __typename?: "Entity";
      id: string;
      identity: {
        __typename?: "IdentityComponent";
        name: string;
        description: string;
      };
      tags: {__typename?: "TagsComponent"; tags: Array<string>};
      position: {
        __typename?: "PositionComponent";
        x: number;
        y: number;
        z: number;
      };
    }>;
  }>;
};

export type UniverseSystemSetDescriptionMutationVariables = Exact<{
  id: Scalars["ID"];
  systemId: Scalars["ID"];
  description: Scalars["String"];
}>;

export type UniverseSystemSetDescriptionMutation = {
  __typename?: "Mutation";
  universeTemplateSystemSetDescription: {
    __typename?: "UniverseTemplate";
    id: string;
  };
};

export type UniverseSystemSetNameMutationVariables = Exact<{
  id: Scalars["ID"];
  systemId: Scalars["ID"];
  name: Scalars["String"];
}>;

export type UniverseSystemSetNameMutation = {
  __typename?: "Mutation";
  universeTemplateSystemSetName: {__typename?: "UniverseTemplate"; id: string};
};

export type UniverseSystemSetPositionMutationVariables = Exact<{
  id: Scalars["ID"];
  systemId: Scalars["ID"];
  position: PositionInput;
}>;

export type UniverseSystemSetPositionMutation = {
  __typename?: "Mutation";
  universeTemplateSystemSetPosition: {
    __typename?: "UniverseTemplate";
    id: string;
  };
};

export type TemplateSystemSubscriptionVariables = Exact<{
  id: Scalars["ID"];
  systemId: Scalars["ID"];
}>;

export type TemplateSystemSubscription = {
  __typename?: "Subscription";
  templateUniverseSystem: {
    __typename?: "PlanetarySystem";
    id: string;
    habitableZoneInner: number;
    habitableZoneOuter: number;
    identity: {__typename?: "IdentityComponent"; name: string};
    planetarySystem: {
      __typename?: "PlanetarySystemComponent";
      skyboxKey: string;
    };
    items: Array<{
      __typename?: "Entity";
      id: string;
      identity: {
        __typename?: "IdentityComponent";
        name: string;
        description: string;
      };
      tags: {__typename?: "TagsComponent"; tags: Array<string>};
      isStar: Maybe<{
        __typename?: "IsStarComponent";
        age: number;
        hue: number;
        isWhite: boolean;
        solarMass: number;
        spectralType: string;
        radius: number;
      }>;
      isPlanet: Maybe<{
        __typename?: "IsPlanetComponent";
        age: number;
        classification: string;
        radius: number;
        terranMass: number;
        habitable: boolean;
        lifeforms: string;
        textureMapAsset: string;
        cloudsMapAsset: string;
        ringsMapAsset: string;
      }>;
      satellite: {
        __typename?: "SatelliteComponent";
        distance: number;
        axialTilt: number;
        showOrbit: boolean;
        orbitalArc: number;
        eccentricity: number;
        orbitalInclination: number;
      };
      temperature: {__typename?: "TemperatureComponent"; temperature: number};
      population: Maybe<{__typename?: "PopulationComponent"; count: number}>;
    }>;
  };
};

export type UniverseSetCoverImageMutationVariables = Exact<{
  id: Scalars["ID"];
  image: Scalars["Upload"];
}>;

export type UniverseSetCoverImageMutation = {
  __typename?: "Mutation";
  universeSetCoverImage: {
    __typename?: "UniverseTemplate";
    id: string;
    coverImage: string;
  };
};

export type UniverseSetDescriptionMutationVariables = Exact<{
  id: Scalars["ID"];
  description: Scalars["String"];
}>;

export type UniverseSetDescriptionMutation = {
  __typename?: "Mutation";
  universeSetDescription: {
    __typename?: "UniverseTemplate";
    id: string;
    description: string;
  };
};

export type UniverseSetTagsMutationVariables = Exact<{
  id: Scalars["ID"];
  tags: Array<Scalars["String"]>;
}>;

export type UniverseSetTagsMutation = {
  __typename?: "Mutation";
  universeSetTags: {
    __typename?: "UniverseTemplate";
    id: string;
    tags: Array<string>;
  };
};

export type UniverseCreateMutationVariables = Exact<{
  name: Scalars["String"];
}>;

export type UniverseCreateMutation = {
  __typename?: "Mutation";
  universeCreate: {
    __typename?: "UniverseTemplate";
    id: string;
    name: string;
    author: string;
    description: string;
    coverImage: string;
    tags: Array<string>;
  };
};

export type UniverseRemoveMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UniverseRemoveMutation = {
  __typename?: "Mutation";
  universeRemove: string;
};

export type UniverseSetNameMutationVariables = Exact<{
  id: Scalars["ID"];
  name: Scalars["String"];
}>;

export type UniverseSetNameMutation = {
  __typename?: "Mutation";
  universeSetName: {__typename?: "UniverseTemplate"; id: string; name: string};
};

export type UniversesSubscriptionVariables = Exact<{[key: string]: never}>;

export type UniversesSubscription = {
  __typename?: "Subscription";
  universes: Array<{
    __typename?: "UniverseTemplate";
    id: string;
    name: string;
    author: string;
    description: string;
    coverImage: string;
    tags: Array<string>;
  }>;
};

export type ClientConnectMutationVariables = Exact<{[key: string]: never}>;

export type ClientConnectMutation = {
  __typename?: "Mutation";
  clientConnect: {__typename?: "Client"; id: string; connected: boolean};
};

export type ClientDisconnectMutationVariables = Exact<{[key: string]: never}>;

export type ClientDisconnectMutation = {
  __typename?: "Mutation";
  clientDisconnect: {__typename?: "Client"; id: string; connected: boolean};
};

export type StartFlightMutationVariables = Exact<{[key: string]: never}>;

export type StartFlightMutation = {
  __typename?: "Mutation";
  flightStart: {__typename?: "Flight"; id: string; name: string};
};

export type FlightsQueryVariables = Exact<{[key: string]: never}>;

export type FlightsQuery = {
  __typename?: "Query";
  flights: Array<{__typename?: "Flight"; id: string; name: string; date: Date}>;
};

export type IntrospectionQueryVariables = Exact<{[key: string]: never}>;

export type IntrospectionQuery = {
  __typename?: "Query";
  __schema: {
    __typename?: "__Schema";
    mutationType: Maybe<{
      __typename?: "__Type";
      name: Maybe<string>;
      description: Maybe<string>;
      fields: Maybe<
        Array<{
          __typename?: "__Field";
          name: string;
          description: Maybe<string>;
        }>
      >;
    }>;
  };
};

export const TimerPauseDocument = gql`
  mutation TimerPause($id: ID!, $pause: Boolean!) {
    timerPause(id: $id, pause: $pause) {
      id
    }
  }
`;
export function useTimerPauseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TimerPauseMutation,
    TimerPauseMutationVariables
  >
) {
  return Apollo.useMutation<TimerPauseMutation, TimerPauseMutationVariables>(
    TimerPauseDocument,
    baseOptions
  );
}
export type TimerPauseMutationHookResult = ReturnType<
  typeof useTimerPauseMutation
>;
export const TimerRemoveDocument = gql`
  mutation TimerRemove($id: ID!) {
    timerRemove(id: $id)
  }
`;
export function useTimerRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TimerRemoveMutation,
    TimerRemoveMutationVariables
  >
) {
  return Apollo.useMutation<TimerRemoveMutation, TimerRemoveMutationVariables>(
    TimerRemoveDocument,
    baseOptions
  );
}
export type TimerRemoveMutationHookResult = ReturnType<
  typeof useTimerRemoveMutation
>;
export const TimerCreateDocument = gql`
  mutation TimerCreate($time: String!, $label: String!) {
    timerCreate(time: $time, label: $label) {
      id
      components {
        timer {
          label
          time
        }
      }
    }
  }
`;
export function useTimerCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TimerCreateMutation,
    TimerCreateMutationVariables
  >
) {
  return Apollo.useMutation<TimerCreateMutation, TimerCreateMutationVariables>(
    TimerCreateDocument,
    baseOptions
  );
}
export type TimerCreateMutationHookResult = ReturnType<
  typeof useTimerCreateMutation
>;
export const TimersDocument = gql`
  subscription Timers {
    timers {
      id
      components {
        timer {
          time
          label
          paused
        }
      }
    }
  }
`;
export function useTimersSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    TimersSubscription,
    TimersSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    TimersSubscription,
    TimersSubscriptionVariables
  >(TimersDocument, baseOptions);
}
export type TimersSubscriptionHookResult = ReturnType<
  typeof useTimersSubscription
>;
export const TemplateShipAssetsDocument = gql`
  subscription TemplateShipAssets($id: ID!) {
    templateShip(id: $id) {
      id
      shipAssets {
        logo
        model
        side
        top
        vanity
      }
    }
  }
`;
export function useTemplateShipAssetsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    TemplateShipAssetsSubscription,
    TemplateShipAssetsSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    TemplateShipAssetsSubscription,
    TemplateShipAssetsSubscriptionVariables
  >(TemplateShipAssetsDocument, baseOptions);
}
export type TemplateShipAssetsSubscriptionHookResult = ReturnType<
  typeof useTemplateShipAssetsSubscription
>;
export const TemplateShipSetLogoDocument = gql`
  mutation TemplateShipSetLogo($id: ID!, $image: Upload!) {
    templateShipSetLogo(id: $id, image: $image) {
      id
      shipAssets {
        logo
      }
    }
  }
`;
export function useTemplateShipSetLogoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TemplateShipSetLogoMutation,
    TemplateShipSetLogoMutationVariables
  >
) {
  return Apollo.useMutation<
    TemplateShipSetLogoMutation,
    TemplateShipSetLogoMutationVariables
  >(TemplateShipSetLogoDocument, baseOptions);
}
export type TemplateShipSetLogoMutationHookResult = ReturnType<
  typeof useTemplateShipSetLogoMutation
>;
export const TemplateShipSetModelDocument = gql`
  mutation TemplateShipSetModel(
    $id: ID!
    $model: Upload!
    $side: Upload!
    $top: Upload!
    $vanity: Upload!
  ) {
    templateShipSetModel(
      id: $id
      model: $model
      side: $side
      top: $top
      vanity: $vanity
    ) {
      id
      shipAssets {
        model
        side
        top
        vanity
      }
    }
  }
`;
export function useTemplateShipSetModelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TemplateShipSetModelMutation,
    TemplateShipSetModelMutationVariables
  >
) {
  return Apollo.useMutation<
    TemplateShipSetModelMutation,
    TemplateShipSetModelMutationVariables
  >(TemplateShipSetModelDocument, baseOptions);
}
export type TemplateShipSetModelMutationHookResult = ReturnType<
  typeof useTemplateShipSetModelMutation
>;
export const PlanetTypesDocument = gql`
  query PlanetTypes {
    planetTypes {
      id
      name
      classification
    }
  }
`;
export function usePlanetTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PlanetTypesQuery,
    PlanetTypesQueryVariables
  >
) {
  return Apollo.useQuery<PlanetTypesQuery, PlanetTypesQueryVariables>(
    PlanetTypesDocument,
    baseOptions
  );
}
export function usePlanetTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PlanetTypesQuery,
    PlanetTypesQueryVariables
  >
) {
  return Apollo.useLazyQuery<PlanetTypesQuery, PlanetTypesQueryVariables>(
    PlanetTypesDocument,
    baseOptions
  );
}
export type PlanetTypesQueryHookResult = ReturnType<typeof usePlanetTypesQuery>;
export type PlanetTypesLazyQueryHookResult = ReturnType<
  typeof usePlanetTypesLazyQuery
>;
export const StarTypesDocument = gql`
  query StarTypes {
    starTypes {
      id
      name
      spectralType
      prevalence
    }
  }
`;
export function useStarTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<StarTypesQuery, StarTypesQueryVariables>
) {
  return Apollo.useQuery<StarTypesQuery, StarTypesQueryVariables>(
    StarTypesDocument,
    baseOptions
  );
}
export function useStarTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StarTypesQuery,
    StarTypesQueryVariables
  >
) {
  return Apollo.useLazyQuery<StarTypesQuery, StarTypesQueryVariables>(
    StarTypesDocument,
    baseOptions
  );
}
export type StarTypesQueryHookResult = ReturnType<typeof useStarTypesQuery>;
export type StarTypesLazyQueryHookResult = ReturnType<
  typeof useStarTypesLazyQuery
>;
export const UniverseAddPlanetDocument = gql`
  mutation UniverseAddPlanet(
    $id: ID!
    $parentId: ID!
    $classification: String!
  ) {
    universeTemplateAddPlanet(
      id: $id
      systemId: $parentId
      classification: $classification
    ) {
      id
    }
  }
`;
export function useUniverseAddPlanetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseAddPlanetMutation,
    UniverseAddPlanetMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseAddPlanetMutation,
    UniverseAddPlanetMutationVariables
  >(UniverseAddPlanetDocument, baseOptions);
}
export type UniverseAddPlanetMutationHookResult = ReturnType<
  typeof useUniverseAddPlanetMutation
>;
export const UniverseAddStarDocument = gql`
  mutation UniverseAddStar($id: ID!, $systemId: ID!, $spectralType: String!) {
    universeTemplateAddStar(
      id: $id
      systemId: $systemId
      spectralType: $spectralType
    ) {
      id
    }
  }
`;
export function useUniverseAddStarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseAddStarMutation,
    UniverseAddStarMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseAddStarMutation,
    UniverseAddStarMutationVariables
  >(UniverseAddStarDocument, baseOptions);
}
export type UniverseAddStarMutationHookResult = ReturnType<
  typeof useUniverseAddStarMutation
>;
export const UniverseAddSystemDocument = gql`
  mutation UniverseAddSystem($id: ID!, $position: PositionInput!) {
    universeTemplateAddSystem(id: $id, position: $position) {
      id
      identity {
        name
        description
      }
      tags {
        tags
      }
      position {
        x
        y
        z
      }
    }
  }
`;
export function useUniverseAddSystemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseAddSystemMutation,
    UniverseAddSystemMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseAddSystemMutation,
    UniverseAddSystemMutationVariables
  >(UniverseAddSystemDocument, baseOptions);
}
export type UniverseAddSystemMutationHookResult = ReturnType<
  typeof useUniverseAddSystemMutation
>;
export const UniverseObjectRemoveDocument = gql`
  mutation UniverseObjectRemove($id: ID!, $objectId: ID!) {
    universeTemplateRemoveObject(id: $id, objectId: $objectId)
  }
`;
export function useUniverseObjectRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseObjectRemoveMutation,
    UniverseObjectRemoveMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseObjectRemoveMutation,
    UniverseObjectRemoveMutationVariables
  >(UniverseObjectRemoveDocument, baseOptions);
}
export type UniverseObjectRemoveMutationHookResult = ReturnType<
  typeof useUniverseObjectRemoveMutation
>;
export const UniverseDocument = gql`
  subscription Universe($id: ID!) {
    universe(id: $id) {
      id
      name
      systems {
        id
        identity {
          name
          description
        }
        tags {
          tags
        }
        position {
          x
          y
          z
        }
      }
    }
  }
`;
export function useUniverseSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    UniverseSubscription,
    UniverseSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    UniverseSubscription,
    UniverseSubscriptionVariables
  >(UniverseDocument, baseOptions);
}
export type UniverseSubscriptionHookResult = ReturnType<
  typeof useUniverseSubscription
>;
export const UniverseSystemSetDescriptionDocument = gql`
  mutation UniverseSystemSetDescription(
    $id: ID!
    $systemId: ID!
    $description: String!
  ) {
    universeTemplateSystemSetDescription(
      id: $id
      systemId: $systemId
      description: $description
    ) {
      id
    }
  }
`;
export function useUniverseSystemSetDescriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSystemSetDescriptionMutation,
    UniverseSystemSetDescriptionMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSystemSetDescriptionMutation,
    UniverseSystemSetDescriptionMutationVariables
  >(UniverseSystemSetDescriptionDocument, baseOptions);
}
export type UniverseSystemSetDescriptionMutationHookResult = ReturnType<
  typeof useUniverseSystemSetDescriptionMutation
>;
export const UniverseSystemSetNameDocument = gql`
  mutation UniverseSystemSetName($id: ID!, $systemId: ID!, $name: String!) {
    universeTemplateSystemSetName(id: $id, systemId: $systemId, name: $name) {
      id
    }
  }
`;
export function useUniverseSystemSetNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSystemSetNameMutation,
    UniverseSystemSetNameMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSystemSetNameMutation,
    UniverseSystemSetNameMutationVariables
  >(UniverseSystemSetNameDocument, baseOptions);
}
export type UniverseSystemSetNameMutationHookResult = ReturnType<
  typeof useUniverseSystemSetNameMutation
>;
export const UniverseSystemSetPositionDocument = gql`
  mutation UniverseSystemSetPosition(
    $id: ID!
    $systemId: ID!
    $position: PositionInput!
  ) {
    universeTemplateSystemSetPosition(
      id: $id
      systemId: $systemId
      position: $position
    ) {
      id
    }
  }
`;
export function useUniverseSystemSetPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSystemSetPositionMutation,
    UniverseSystemSetPositionMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSystemSetPositionMutation,
    UniverseSystemSetPositionMutationVariables
  >(UniverseSystemSetPositionDocument, baseOptions);
}
export type UniverseSystemSetPositionMutationHookResult = ReturnType<
  typeof useUniverseSystemSetPositionMutation
>;
export const TemplateSystemDocument = gql`
  subscription TemplateSystem($id: ID!, $systemId: ID!) {
    templateUniverseSystem(id: $id, systemId: $systemId) {
      id
      identity {
        name
      }
      planetarySystem {
        skyboxKey
      }
      habitableZoneInner
      habitableZoneOuter
      items {
        id
        identity {
          name
          description
        }
        tags {
          tags
        }
        isStar {
          age
          hue
          isWhite
          solarMass
          spectralType
          radius
        }
        isPlanet {
          age
          classification
          radius
          terranMass
          habitable
          lifeforms
          textureMapAsset
          cloudsMapAsset
          ringsMapAsset
        }
        satellite {
          distance
          axialTilt
          showOrbit
          orbitalArc
          eccentricity
          orbitalInclination
        }
        temperature {
          temperature
        }
        population {
          count
        }
      }
    }
  }
`;
export function useTemplateSystemSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    TemplateSystemSubscription,
    TemplateSystemSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    TemplateSystemSubscription,
    TemplateSystemSubscriptionVariables
  >(TemplateSystemDocument, baseOptions);
}
export type TemplateSystemSubscriptionHookResult = ReturnType<
  typeof useTemplateSystemSubscription
>;
export const UniverseSetCoverImageDocument = gql`
  mutation UniverseSetCoverImage($id: ID!, $image: Upload!) {
    universeSetCoverImage(id: $id, image: $image) {
      id
      coverImage
    }
  }
`;
export function useUniverseSetCoverImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSetCoverImageMutation,
    UniverseSetCoverImageMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSetCoverImageMutation,
    UniverseSetCoverImageMutationVariables
  >(UniverseSetCoverImageDocument, baseOptions);
}
export type UniverseSetCoverImageMutationHookResult = ReturnType<
  typeof useUniverseSetCoverImageMutation
>;
export const UniverseSetDescriptionDocument = gql`
  mutation UniverseSetDescription($id: ID!, $description: String!) {
    universeSetDescription(id: $id, description: $description) {
      id
      description
    }
  }
`;
export function useUniverseSetDescriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSetDescriptionMutation,
    UniverseSetDescriptionMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSetDescriptionMutation,
    UniverseSetDescriptionMutationVariables
  >(UniverseSetDescriptionDocument, baseOptions);
}
export type UniverseSetDescriptionMutationHookResult = ReturnType<
  typeof useUniverseSetDescriptionMutation
>;
export const UniverseSetTagsDocument = gql`
  mutation UniverseSetTags($id: ID!, $tags: [String!]!) {
    universeSetTags(id: $id, tags: $tags) {
      id
      tags
    }
  }
`;
export function useUniverseSetTagsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSetTagsMutation,
    UniverseSetTagsMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSetTagsMutation,
    UniverseSetTagsMutationVariables
  >(UniverseSetTagsDocument, baseOptions);
}
export type UniverseSetTagsMutationHookResult = ReturnType<
  typeof useUniverseSetTagsMutation
>;
export const UniverseCreateDocument = gql`
  mutation UniverseCreate($name: String!) {
    universeCreate(name: $name) {
      id
      name
      author
      description
      coverImage
      tags
    }
  }
`;
export function useUniverseCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseCreateMutation,
    UniverseCreateMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseCreateMutation,
    UniverseCreateMutationVariables
  >(UniverseCreateDocument, baseOptions);
}
export type UniverseCreateMutationHookResult = ReturnType<
  typeof useUniverseCreateMutation
>;
export const UniverseRemoveDocument = gql`
  mutation UniverseRemove($id: ID!) {
    universeRemove(id: $id)
  }
`;
export function useUniverseRemoveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseRemoveMutation,
    UniverseRemoveMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseRemoveMutation,
    UniverseRemoveMutationVariables
  >(UniverseRemoveDocument, baseOptions);
}
export type UniverseRemoveMutationHookResult = ReturnType<
  typeof useUniverseRemoveMutation
>;
export const UniverseSetNameDocument = gql`
  mutation UniverseSetName($id: ID!, $name: String!) {
    universeSetName(id: $id, name: $name) {
      id
      name
    }
  }
`;
export function useUniverseSetNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UniverseSetNameMutation,
    UniverseSetNameMutationVariables
  >
) {
  return Apollo.useMutation<
    UniverseSetNameMutation,
    UniverseSetNameMutationVariables
  >(UniverseSetNameDocument, baseOptions);
}
export type UniverseSetNameMutationHookResult = ReturnType<
  typeof useUniverseSetNameMutation
>;
export const UniversesDocument = gql`
  subscription Universes {
    universes {
      id
      name
      author
      description
      coverImage
      tags
    }
  }
`;
export function useUniversesSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    UniversesSubscription,
    UniversesSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    UniversesSubscription,
    UniversesSubscriptionVariables
  >(UniversesDocument, baseOptions);
}
export type UniversesSubscriptionHookResult = ReturnType<
  typeof useUniversesSubscription
>;
export const ClientConnectDocument = gql`
  mutation ClientConnect {
    clientConnect {
      id
      connected
    }
  }
`;
export function useClientConnectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ClientConnectMutation,
    ClientConnectMutationVariables
  >
) {
  return Apollo.useMutation<
    ClientConnectMutation,
    ClientConnectMutationVariables
  >(ClientConnectDocument, baseOptions);
}
export type ClientConnectMutationHookResult = ReturnType<
  typeof useClientConnectMutation
>;
export const ClientDisconnectDocument = gql`
  mutation ClientDisconnect {
    clientDisconnect {
      id
      connected
    }
  }
`;
export function useClientDisconnectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ClientDisconnectMutation,
    ClientDisconnectMutationVariables
  >
) {
  return Apollo.useMutation<
    ClientDisconnectMutation,
    ClientDisconnectMutationVariables
  >(ClientDisconnectDocument, baseOptions);
}
export type ClientDisconnectMutationHookResult = ReturnType<
  typeof useClientDisconnectMutation
>;
export const StartFlightDocument = gql`
  mutation StartFlight {
    flightStart {
      id
      name
    }
  }
`;
export function useStartFlightMutation(
  baseOptions?: Apollo.MutationHookOptions<
    StartFlightMutation,
    StartFlightMutationVariables
  >
) {
  return Apollo.useMutation<StartFlightMutation, StartFlightMutationVariables>(
    StartFlightDocument,
    baseOptions
  );
}
export type StartFlightMutationHookResult = ReturnType<
  typeof useStartFlightMutation
>;
export const FlightsDocument = gql`
  query Flights {
    flights {
      id
      name
      date
    }
  }
`;
export function useFlightsQuery(
  baseOptions?: Apollo.QueryHookOptions<FlightsQuery, FlightsQueryVariables>
) {
  return Apollo.useQuery<FlightsQuery, FlightsQueryVariables>(
    FlightsDocument,
    baseOptions
  );
}
export function useFlightsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FlightsQuery, FlightsQueryVariables>
) {
  return Apollo.useLazyQuery<FlightsQuery, FlightsQueryVariables>(
    FlightsDocument,
    baseOptions
  );
}
export type FlightsQueryHookResult = ReturnType<typeof useFlightsQuery>;
export type FlightsLazyQueryHookResult = ReturnType<typeof useFlightsLazyQuery>;
export const IntrospectionDocument = gql`
  query Introspection {
    __schema {
      mutationType {
        name
        description
        fields {
          name
          description
        }
      }
    }
  }
`;
export function useIntrospectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IntrospectionQuery,
    IntrospectionQueryVariables
  >
) {
  return Apollo.useQuery<IntrospectionQuery, IntrospectionQueryVariables>(
    IntrospectionDocument,
    baseOptions
  );
}
export function useIntrospectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IntrospectionQuery,
    IntrospectionQueryVariables
  >
) {
  return Apollo.useLazyQuery<IntrospectionQuery, IntrospectionQueryVariables>(
    IntrospectionDocument,
    baseOptions
  );
}
export type IntrospectionQueryHookResult = ReturnType<
  typeof useIntrospectionQuery
>;
export type IntrospectionLazyQueryHookResult = ReturnType<
  typeof useIntrospectionLazyQuery
>;
