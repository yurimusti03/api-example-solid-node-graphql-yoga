import { createSchema } from "graphql-yoga";
import { Mutation, Query, Subscription } from "./graphql";
import { ContaController, ContaDTO } from "./graphql/implementation/Conta";
import {
  SomarController,
  SomarDTO,
  SOMAR_RANDOM_NUMBER,
} from "./graphql/implementation/Somar";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    ${ContaDTO}
    ${SomarDTO}

    ${Query}
    ${Mutation}
    ${Subscription}
  `,
  resolvers: {
    Query: {
      conta: ContaController,
    },
    Mutation: {
      somar: SomarController,
    },
    Subscription: {
      randomNumber: {
        subscribe: (_, args, { pubSub }) => {
          return pubSub.subscribe(SOMAR_RANDOM_NUMBER);
        },
        resolve: (payload) => payload,
      },
    },
  },
});
