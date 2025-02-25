import React from 'react';
import type { Cuisine, DietaryRestriction } from '../types';

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCuisines: Cuisine[];
  setSelectedCuisines: (cuisines: Cuisine[]) => void;
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (restrictions: DietaryRestriction[]) => void;
}

const cuisines: Cuisine[] = ['italian', 'indian', 'japanese', 'mexican', 'american'];
const dietaryOptions: DietaryRestriction[] = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'none'];

export function Filters({
  priceRange,
  setPriceRange,
  selectedCuisines,
  setSelectedCuisines,
  dietaryRestrictions,
  setDietaryRestrictions,
}: FiltersProps) {
  const handleCuisineToggle = (cuisine: Cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleDietaryToggle = (restriction: DietaryRestriction) => {
    if (restriction === 'none') {
      setDietaryRestrictions(['none']);
      return;
    }
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter((r) => r !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions.filter((r) => r !== 'none'), restriction]);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-medium mb-3">Price Range (₹)</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Cuisine</h3>
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineToggle(cuisine)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedCuisines.includes(cuisine)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((restriction) => (
            <button
              key={restriction}
              onClick={() => handleDietaryToggle(restriction)}
              className={`px-4 py-2 rounded-lg capitalize ${
                dietaryRestrictions.includes(restriction)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {restriction.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}