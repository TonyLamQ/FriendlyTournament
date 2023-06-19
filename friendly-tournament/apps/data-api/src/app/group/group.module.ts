import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/user.schema";
import { GroupController } from "./group.controller";
import { Group, GroupSchema } from "./group.schema";
import { GroupService } from "./group.service";
import { InviteSchema } from "../invite/invite.schema";
import { TournamentSchema } from "../tournament/tournament.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Invite', schema: InviteSchema},
      { name: 'Tournament', schema: TournamentSchema}
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports:[GroupService]
})
export class GroupModule {
}