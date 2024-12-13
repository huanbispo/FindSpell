import { Spell } from "../types/spell";
import { DEFAULT_SPELL_IMAGE } from "../data/exampleSpells";
import { useState } from "react";

interface SpellCardProps {
  spell: Spell;
}

export const SpellCard = ({ spell }: SpellCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card group">
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={spell.imageUrl || DEFAULT_SPELL_IMAGE}
          alt={spell.name}
          className="card-image transition-transform duration-300 group-hover:scale-110"
        />
        {spell.isHomebrew && (
          <span className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-md text-sm font-medium shadow-sm">
            Homebrew
          </span>
        )}
      </div>
      <div className="card-content">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{spell.name}</h3>
          <span className="text-sm font-medium px-2 py-1 bg-primary-100 text-primary-800 rounded-md">
            {spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}
          </span>
        </div>

        <div className="relative">
          <p
            className={`text-gray-600 text-sm mb-4 ${
              isExpanded ? "" : "line-clamp-3"
            }`}
          >
            {spell.description}
          </p>
          {spell.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {spell.classes.map((className) => (
            <span
              key={className}
              className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium"
            >
              {className}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <span className="font-medium block text-gray-700">School</span>
            {spell.school}
          </div>
          <div>
            <span className="font-medium block text-gray-700">
              Casting Time
            </span>
            {spell.castingTime}
          </div>
          <div className="col-span-2 flex gap-3 mt-2">
            {spell.isRitual && (
              <span className="text-primary-600 font-medium flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                Ritual
              </span>
            )}
            {spell.requiresConcentration && (
              <span className="text-primary-600 font-medium flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
                Concentration
              </span>
            )}
          </div>
          <div className="col-span-2 text-xs text-gray-400 mt-2">
            Source: {spell.source}
          </div>
        </div>
      </div>
    </div>
  );
};
