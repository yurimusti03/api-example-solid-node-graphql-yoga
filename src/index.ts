import { createServer } from "node:http";
import { useServer } from "graphql-ws/lib/use/ws";
import { createPubSub, createYoga } from "graphql-yoga";
import { WebSocketServer } from "ws";
import { schema } from "./schema";

const pubSub = createPubSub();

const yogaApp = createYoga({
  schema,
  context: { pubSub },
  graphiql: {
    subscriptionsProtocol: "WS",
  },
});

const httpServer = createServer(yogaApp);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yogaApp.graphqlEndpoint,
});

useServer(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const {
        schema,
        execute,
        subscribe,
        contextFactory,
        parse,
        validate,
      } = yogaApp.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: msg.payload,
      });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

httpServer.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
