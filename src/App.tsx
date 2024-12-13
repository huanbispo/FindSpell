import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import { SpellCard } from "./components/SpellCard";
import { SpellFilters } from "./components/SpellFilters";
import type { SpellFilters as SpellFiltersType } from "./types/spell";
import { exampleSpells } from "./data/exampleSpells";
import { filterSpells } from "./utils/filterSpells";

const initialFilters: SpellFiltersType = {
  search: "",
  classes: [],
  level: null,
  school: null,
  castingTime: null,
  isHomebrew: null,
  isRitual: null,
  requiresConcentration: null,
  source: null,
};

function App() {
  const [filters, setFilters] = useState<SpellFiltersType>(initialFilters);
  const [spells] = useState(exampleSpells);

  const filteredSpells = useMemo(() => {
    return filterSpells(spells, filters);
  }, [spells, filters]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                D&D Spell Catalog
              </h1>
              <button className="btn-primary">Add New Spell</button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-80 flex-shrink-0">
              <SpellFilters filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      {/* Results Count */}
                      <div className="mb-6 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Showing {filteredSpells.length}{" "}
                          {filteredSpells.length === 1 ? "spell" : "spells"}
                        </div>
                        <button
                          onClick={() => setFilters(initialFilters)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                          style={{
                            visibility: Object.keys(filters).some(
                              (key) =>
                                filters[key as keyof SpellFiltersType] !==
                                initialFilters[key as keyof SpellFiltersType]
                            )
                              ? "visible"
                              : "hidden",
                          }}
                        >
                          Clear Filters
                        </button>
                      </div>

                      {/* Spells Grid */}
                      {filteredSpells.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                          {filteredSpells.map((spell) => (
                            <SpellCard key={spell.id} spell={spell} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No spells found
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters or search terms
                          </p>
                          <div className="mt-6">
                            <button
                              onClick={() => setFilters(initialFilters)}
                              className="btn-primary"
                            >
                              Clear All Filters
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  }
                />
                {/* Add more routes here for authentication and spell creation */}
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
