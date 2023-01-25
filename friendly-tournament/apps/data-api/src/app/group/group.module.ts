import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupController } from "./group.controller";
import { Group, GroupSchema } from "./group.schema";
import { GroupService } from "./group.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema }
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {
}