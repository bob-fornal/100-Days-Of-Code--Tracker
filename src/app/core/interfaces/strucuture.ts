
import { Goal } from "./goal";
import { Item } from "./item"

export interface Structure {
  useNotes: boolean;
  days: Array<Item>;
  goals: Array<Goal>;
}
