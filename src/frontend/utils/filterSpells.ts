import type { Spell, SpellFilters } from "../types/spell";

export function filterSpells(spells: Spell[], filters: SpellFilters): Spell[] {
  return spells.filter((spell) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch =
        spell.name.toLowerCase().includes(searchTerm) ||
        spell.description.toLowerCase().includes(searchTerm);

      if (!matchesSearch) return false;
    }

    // Classes filter
    if (filters.classes.length > 0) {
      const hasMatchingClass = spell.classes.some((className) =>
        filters.classes.includes(className)
      );
      if (!hasMatchingClass) return false;
    }

    // Level filter
    if (filters.level !== null && spell.level !== filters.level) {
      return false;
    }

    // School filter
    if (filters.school !== null && spell.school !== filters.school) {
      return false;
    }

    // Casting Time filter
    if (
      filters.castingTime !== null &&
      spell.castingTime !== filters.castingTime
    ) {
      return false;
    }

    // Source filter
    if (filters.source !== null && spell.source !== filters.source) {
      return false;
    }

    // Homebrew filter
    if (
      filters.isHomebrew !== null &&
      spell.isHomebrew !== filters.isHomebrew
    ) {
      return false;
    }

    // Ritual filter
    if (filters.isRitual !== null && spell.isRitual !== filters.isRitual) {
      return false;
    }

    // Concentration filter
    if (
      filters.requiresConcentration !== null &&
      spell.requiresConcentration !== filters.requiresConcentration
    ) {
      return false;
    }

    return true;
  });
}
