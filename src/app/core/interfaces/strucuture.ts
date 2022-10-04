
import { Goal } from "./goal";
import { Item } from "./item"

export interface Structure {
  useGoals: boolean;
  useNotes: boolean;

  days: Array<Item>;
  goals: Array<Goal>;
}
