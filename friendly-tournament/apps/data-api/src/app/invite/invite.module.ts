import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupSchema } from "../group/group.schema";
import { UserSchema } from "../user/user.schema";
import { InviteController } from "./invite.controller";
import { InviteSchema } from "./invite.schema";
import { inviteService } from "./invite.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Invite', schema: InviteSchema}
    ]),
  ],
  controllers: [InviteController],
  providers: [inviteService]
})
export class InviteModule {
}