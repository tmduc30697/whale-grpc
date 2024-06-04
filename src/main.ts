import * as grpc from "@grpc/grpc-js";
import { UserService, UserServiceDefinition } from "./services/user.service";

const server = new grpc.Server();
server.addService(UserServiceDefinition, new UserService());

const port = process.env.SERVER_PORT || 3000;
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`Server listening on port ${port}`);
    server.start();
  }
);
