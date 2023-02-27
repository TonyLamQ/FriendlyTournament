import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/user.schema";
import { AuthController } from "./auth.controller";
import { AuthSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
      { name: 'User', schema: UserSchema}
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {
}