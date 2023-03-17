import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../user/user.schema";
import { GroupController } from "./group.controller";
import { Group, GroupSchema } from "./group.schema";
import { GroupService } from "./group.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Group', schema: GroupSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports:[GroupService]
})
export class GroupModule {
}