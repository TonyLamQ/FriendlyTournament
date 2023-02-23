import { ITournament } from "./ITournament";
import { Types } from 'mongoose';

export class IEntry {
    Price: number;
    EnrollmentDate: Date;
    Tournament: Types.ObjectId | ITournament;
  }
  