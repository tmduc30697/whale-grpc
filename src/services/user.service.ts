import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { prisma } from "@root/src/database";
import {
  User,
  CreateUserRequest,
  UnimplementedUserServiceService,
} from "@root/generated/proto/user";

export const UserServiceDefinition = UnimplementedUserServiceService.definition;

export class UserService implements UnimplementedUserServiceService {
  [method: string]: import("@grpc/grpc-js").UntypedHandleCall;
  createUser(
    call: ServerUnaryCall<CreateUserRequest, User>,
    callback: sendUnaryData<User>
  ): void {
    createUser(call.request)
      .then((resData) => callback(null, resData))
      .catch((err) => err && callback(err));
  }
}

async function createUser(data: CreateUserRequest): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return new User(user);
}
