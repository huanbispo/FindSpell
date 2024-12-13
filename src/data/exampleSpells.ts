import type { Spell } from "../types/spell";

export const DEFAULT_SPELL_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFMkU4RjAiLz4KICA8cGF0aCBkPSJNOTAgODBIMTEwQzExNS41MjMgODAgMTIwIDg0LjQ3NzIgMTIwIDkwVjExMEMxMjAgMTE1LjUyMyAxMTUuNTIzIDEyMCAxMTAgMTIwSDkwQzg0LjQ3NzIgMTIwIDgwIDExNS41MjMgODAgMTEwVjkwQzgwIDg0LjQ3NzIgODQuNDc3MiA4MCA5MCA4MFoiIGZpbGw9IiM5NEEzQjgiLz4KICA8cGF0aCBkPSJNMTAwIDg1VjExNU0xMTUgMTAwSDg1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=";

export const exampleSpells: Spell[] = [
  {
    id: "1",
    name: "Fireball",
    level: 3,
    school: "Evocation",
    castingTime: "1 Action",
    range: "150 feet",
    components: ["V", "S", "M"],
    duration: "Instantaneous",
    description:
      "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one.",
    classes: ["Sorcerer", "Wizard"],
    source: "PHB",
    isHomebrew: false,
    isRitual: false,
    requiresConcentration: false,
  },
  {
    id: "2",
    name: "Detect Magic",
    level: 1,
    school: "Divination",
    castingTime: "1 Action",
    range: "Self",
    components: ["V", "S"],
    duration: "10 Minutes",
    description:
      "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic.",
    classes: [
      "Bard",
      "Cleric",
      "Druid",
      "Paladin",
      "Ranger",
      "Sorcerer",
      "Wizard",
    ],
    source: "PHB",
    isHomebrew: false,
    isRitual: true,
    requiresConcentration: true,
  },
  {
    id: "3",
    name: "Eldritch Blast",
    level: 0,
    school: "Evocation",
    castingTime: "1 Action",
    range: "120 feet",
    components: ["V", "S"],
    duration: "Instantaneous",
    description:
      "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage. The spell creates more than one beam when you reach higher levels.",
    classes: ["Warlock"],
    source: "PHB",
    isHomebrew: false,
    isRitual: false,
    requiresConcentration: false,
  },
  {
    id: "4",
    name: "Dragon's Breath",
    level: 2,
    school: "Transmutation",
    castingTime: "1 Bonus Action",
    range: "Touch",
    components: ["V", "S", "M"],
    duration: "1 Minute",
    description:
      "You touch one willing creature and imbue it with the power to spew magical energy from its mouth, provided it has one. Choose acid, cold, fire, lightning, or poison. Until the spell ends, the creature can use an action to exhale energy of the chosen type in a 15-foot cone.",
    classes: ["Sorcerer", "Wizard"],
    source: "Xanathar's Guide",
    isHomebrew: false,
    isRitual: false,
    requiresConcentration: true,
  },
  {
    id: "5",
    name: "Arcane Ward",
    level: 2,
    school: "Abjuration",
    castingTime: "1 Action",
    range: "Self",
    components: ["V", "S"],
    duration: "8 Hours",
    description:
      "A magical ward surrounds and protects you. The ward has hit points equal to twice your wizard level + your Intelligence modifier. Whenever you take damage, the ward takes the damage instead.",
    classes: ["Wizard"],
    source: "Homebrew",
    isHomebrew: true,
    isRitual: false,
    requiresConcentration: false,
  },
];
