import { filterSpells } from "./filterSpells";
import { exampleSpells } from "../data/exampleSpells";
import type { SpellFilters } from "../types/spell";

// Helper function to create default filters
const createFilters = (
  overrides: Partial<SpellFilters> = {}
): SpellFilters => ({
  search: "",
  classes: [],
  level: null,
  school: null,
  castingTime: null,
  isHomebrew: null,
  isRitual: null,
  requiresConcentration: null,
  source: null,
  ...overrides,
});

describe("filterSpells", () => {
  // Test search filter
  test("filters by name search", () => {
    const filters = createFilters({ search: "fireball" });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Fireball");
  });

  test("filters by description search", () => {
    const filters = createFilters({ search: "magical ward" });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Arcane Ward");
  });

  test("filters by single class", () => {
    const filters = createFilters({ classes: ["Warlock"] });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Eldritch Blast");
  });

  test("filters by multiple classes", () => {
    const filters = createFilters({ classes: ["Sorcerer", "Wizard"] });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(4); // Fireball, Detect Magic, Dragon's Breath, Arcane Ward
    expect(result.map((s) => s.name)).toContain("Fireball");
    expect(result.map((s) => s.name)).toContain("Detect Magic");
    expect(result.map((s) => s.name)).toContain("Dragon's Breath");
    expect(result.map((s) => s.name)).toContain("Arcane Ward");
  });

  test("filters by spell level", () => {
    const filters = createFilters({ level: 0 });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Eldritch Blast");
  });

  test("filters by school", () => {
    const filters = createFilters({ school: "Evocation" });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(2);
    expect(result.map((s) => s.name)).toContain("Fireball");
    expect(result.map((s) => s.name)).toContain("Eldritch Blast");
  });

  test("filters by casting time", () => {
    const filters = createFilters({ castingTime: "1 Bonus Action" });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Dragon's Breath");
  });

  test("filters by source", () => {
    const filters = createFilters({ source: "Xanathar's Guide" });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Dragon's Breath");
  });

  test("filters homebrew spells", () => {
    const filters = createFilters({ isHomebrew: true });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Arcane Ward");
  });

  test("filters ritual spells", () => {
    const filters = createFilters({ isRitual: true });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Detect Magic");
  });

  test("filters concentration spells", () => {
    const filters = createFilters({ requiresConcentration: true });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(2);
    expect(result.map((s) => s.name)).toContain("Detect Magic");
    expect(result.map((s) => s.name)).toContain("Dragon's Breath");
  });

  test("combines multiple filters", () => {
    const filters = createFilters({
      classes: ["Wizard"],
      level: 2,
      requiresConcentration: false,
      source: "Homebrew",
    });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Arcane Ward");
  });

  test("returns empty array when no spells match filters", () => {
    const filters = createFilters({
      classes: ["Warlock"],
      level: 3,
    });
    const result = filterSpells(exampleSpells, filters);
    expect(result).toHaveLength(0);
  });

  test("clear all filters, returns all spells", () => {
    const filters = createFilters({
      search: "fireball",
      classes: ["Wizard"],
      level: 2,
      school: "Evocation",
      castingTime: "1 Action",
      isHomebrew: true,
      isRitual: true,
      requiresConcentration: true,
      source: "Xanathar's Guide",
    });

    filterSpells(exampleSpells, filters);
    const allFiltersNull = createFilters();
    const allSpells = exampleSpells.length;

    const resultAfterClearingFilters = filterSpells(
      exampleSpells,
      allFiltersNull
    );
    expect(resultAfterClearingFilters).toHaveLength(allSpells);
  });
});
