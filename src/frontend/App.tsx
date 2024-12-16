import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { SpellCard } from "./components/SpellCard";
import { SpellFilters } from "./components/SpellFilters";
import { Navbar } from "./components/Navbar";
import type { SpellFilters as SpellFiltersType } from "./types/spell";
import { exampleSpells } from "./data/exampleSpells";
import { filterSpells } from "./utils/filterSpells";
import { AuthProvider } from "./contexts/AuthContext";

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

// Placeholder components for other routes
const Home = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">
      Welcome to Find Spell
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Explore the vast world of Dungeons & Dragons spells, from classic spells
      in the Player's Handbook to unique homebrew creations.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Spells</h2>
        <p className="text-gray-600 mb-4">
          Access a comprehensive collection of D&D spells with detailed
          information and filtering options.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Create & Share
        </h2>
        <p className="text-gray-600 mb-4">
          Sign in to create and share your own homebrew spells with the D&D
          community.
        </p>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">
      About D&D Spell Catalog
    </h1>
    <div className="prose prose-lg max-w-none">
      <p>
        The D&D Spell Catalog is a comprehensive tool for Dungeons & Dragons
        players and Dungeon Masters to explore, filter, and manage spells from
        various sources including official books and homebrew content.
      </p>
    </div>
  </div>
);

const Classes = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">D&D Classes</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        "Artificer",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Warlock",
        "Wizard",
      ].map((className) => (
        <div key={className} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{className}</h2>
          <p className="text-gray-600">
            Explore spells available to the {className} class.
          </p>
        </div>
      ))}
    </div>
  </div>
);

function SpellsPage() {
  const [filters, setFilters] = useState<SpellFiltersType>(initialFilters);
  const [spells] = useState(exampleSpells);

  const filteredSpells = filterSpells(spells, filters);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0">
          <SpellFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
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
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spells" element={<SpellsPage />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
