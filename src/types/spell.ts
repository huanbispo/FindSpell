export interface Spell {
  id: string;
  name: string;
  level: number;
  school: SpellSchool;
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  description: string;
  classes: string[];
  source: string;
  isHomebrew: boolean;
  isRitual: boolean;
  requiresConcentration: boolean;
  imageUrl?: string;
  createdBy?: string;
  createdAt?: Date;
}

export type SpellSchool =
  | "Abjuration"
  | "Conjuration"
  | "Divination"
  | "Enchantment"
  | "Evocation"
  | "Illusion"
  | "Necromancy"
  | "Transmutation";

export interface SpellFilters {
  search: string;
  classes: string[];
  level: number | null;
  school: SpellSchool | null;
  castingTime: string | null;
  isHomebrew: boolean | null;
  isRitual: boolean | null;
  requiresConcentration: boolean | null;
  source: string | null;
}
