import type {
  SpellFilters as SpellFiltersType,
  SpellSchool,
} from "../types/spell";
import { Switch } from "@headlessui/react";

interface SpellFiltersProps {
  filters: SpellFiltersType;
  onFilterChange: (filters: SpellFiltersType) => void;
}

const spellClasses = [
  "Artificer",
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Sorcerer",
  "Warlock",
  "Wizard",
] as const;

const spellSchools = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
] as const;

const castingTimes = [
  "Action",
  "Bonus Action",
  "Reaction",
  "1 Minute",
  "10 Minutes",
  "1 Hour",
] as const;

const sources = [
  "PHB",
  "Xanathar's Guide",
  "Tasha's Cauldron",
  "Homebrew",
] as const;

export const SpellFilters = ({
  filters,
  onFilterChange,
}: SpellFiltersProps) => {
  const handleChange = <K extends keyof SpellFiltersType>(
    key: K,
    value: SpellFiltersType[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="sticky top-4 filter-section">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Filters</h2>
      <div className="space-y-8">
        {/* Search */}
        <div className="space-y-2">
          <label htmlFor="search" className="filter-title">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              className="input-field pl-10"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
              placeholder="Search spells..."
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Classes */}
        <div className="space-y-3">
          <h3 className="filter-title">Classes</h3>
          <div className="grid grid-cols-2 gap-3">
            {spellClasses.map((className) => (
              <label
                key={className}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="checkbox-field"
                  checked={filters.classes.includes(className)}
                  onChange={(e) => {
                    const newClasses = e.target.checked
                      ? [...filters.classes, className]
                      : filters.classes.filter((c) => c !== className);
                    handleChange("classes", newClasses);
                  }}
                />
                <span className="text-gray-700">{className}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="space-y-2">
          <label htmlFor="level" className="filter-title">
            Spell Level
          </label>
          <select
            id="level"
            className="select-field"
            value={filters.level || ""}
            onChange={(e) =>
              handleChange(
                "level",
                e.target.value ? Number(e.target.value) : null
              )
            }
          >
            <option value="">Any Level</option>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
              <option key={level} value={level}>
                {level === 0 ? "Cantrip" : `Level ${level}`}
              </option>
            ))}
          </select>
        </div>

        {/* School */}
        <div className="space-y-2">
          <label htmlFor="school" className="filter-title">
            School of Magic
          </label>
          <select
            id="school"
            className="select-field"
            value={filters.school || ""}
            onChange={(e) => {
              const value = e.target.value as SpellSchool | "";
              handleChange("school", value ? (value as SpellSchool) : null);
            }}
          >
            <option value="">Any School</option>
            {spellSchools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>

        {/* Casting Time */}
        <div className="space-y-2">
          <label htmlFor="castingTime" className="filter-title">
            Casting Time
          </label>
          <select
            id="castingTime"
            className="select-field"
            value={filters.castingTime || ""}
            onChange={(e) =>
              handleChange("castingTime", e.target.value || null)
            }
          >
            <option value="">Any Casting Time</option>
            {castingTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div className="space-y-2">
          <label htmlFor="source" className="filter-title">
            Source
          </label>
          <select
            id="source"
            className="select-field"
            value={filters.source || ""}
            onChange={(e) => handleChange("source", e.target.value || null)}
          >
            <option value="">Any Source</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-2">
          {/* Homebrew Toggle */}
          <div className="flex items-center justify-between">
            <span className="filter-title">Homebrew Only</span>
            <Switch
              checked={filters.isHomebrew || false}
              onChange={(checked) => handleChange("isHomebrew", checked)}
              className={`${
                filters.isHomebrew ? "bg-primary-600" : "bg-gray-200"
              } toggle-field`}
            >
              <span className="sr-only">Show homebrew spells only</span>
              <span
                className={`${
                  filters.isHomebrew ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Ritual Toggle */}
          <div className="flex items-center justify-between">
            <span className="filter-title">Ritual Only</span>
            <Switch
              checked={filters.isRitual || false}
              onChange={(checked) => handleChange("isRitual", checked)}
              className={`${
                filters.isRitual ? "bg-primary-600" : "bg-gray-200"
              } toggle-field`}
            >
              <span className="sr-only">Show ritual spells only</span>
              <span
                className={`${
                  filters.isRitual ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Concentration Toggle */}
          <div className="flex items-center justify-between">
            <span className="filter-title">Concentration Only</span>
            <Switch
              checked={filters.requiresConcentration || false}
              onChange={(checked) =>
                handleChange("requiresConcentration", checked)
              }
              className={`${
                filters.requiresConcentration ? "bg-primary-600" : "bg-gray-200"
              } toggle-field`}
            >
              <span className="sr-only">Show concentration spells only</span>
              <span
                className={`${
                  filters.requiresConcentration
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
