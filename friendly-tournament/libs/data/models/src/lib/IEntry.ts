import { ITournament } from "./ITournament";
import { Types } from 'mongoose';

export class IEntry {
    Tournament: ITournament;
    EnrollmentDate: Date;
  }
  