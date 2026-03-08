
import React, { useState } from 'react';
import { RecyclingFacility, Review, Location } from '../types';
import { MATERIAL_TYPES } from '../constants';
import { MapPin, Clock, Phone, Plus, Filter, Info, ChevronRight, Recycle, Star } from 'lucide-react';
import FacilityDetails from './FacilityDetails';
import AddFacilityForm from './AddFacilityForm';

interface SidebarProps {
  facilities: RecyclingFacility[];
  selectedFacility: RecyclingFacility | null;
  onAddClick: () => void;
  onFacilityClick: (facility: RecyclingFacility | null) => void;
  activeFilter: string;
  onFilterChange: (material: string) => void;
  onAddReview: (facilityId: string, review: Omit<Review, 'id' | 'date'>) => void;
  isAdding: boolean;
  tempLocation: Location | null;
  onCancelAdd: () => void;
  onSaveAdd: (facility: Omit<RecyclingFacility, 'id' | 'reviews' | 'status'>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  facilities, 
  selectedFacility, 
  onAddClick, 
  onFacilityClick, 
  activeFilter, 
  onFilterChange,
  onAddReview,
  isAdding,
  tempLocation,
  onCancelAdd,
  onSaveAdd
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleItemClick = (f: RecyclingFacility) => {
    if (isAdding) return;
    onFacilityClick(f);
    setIsDetailOpen(true);
  };

  if (isAdding && tempLocation) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-slate-900 animate-in slide-in-from-left duration-300">
        <AddFacilityForm 
          onClose={onCancelAdd} 
          onSave={onSaveAdd} 
          currentPos={tempLocation} 
          inline={true}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden relative transition-colors duration-300">
      {selectedFacility && isDetailOpen && (
        <FacilityDetails 
          facility={selectedFacility} 
          onClose={() => setIsDetailOpen(false)} 
          onAddReview={onAddReview}
        />
      )}

      <div className="p-4 border-b border-green-50 dark:border-slate-800 bg-green-50/50 dark:bg-slate-800/50 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-green-900 dark:text-green-100 flex items-center gap-2">
            <Recycle size={20} className="text-green-600 dark:text-green-400" />
            Nearby Facilities
          </h2>
          <button 
            onClick={onAddClick}
            className="p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-sm"
            title="Add New Center"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
          <button
            onClick={() => onFilterChange('')}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border ${
              activeFilter === '' 
                ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 border-green-200 dark:border-slate-700 hover:border-green-400'
            }`}
          >
            All
          </button>
          {MATERIAL_TYPES.slice(0, 5).map(material => (
            <button
              key={material}
              onClick={() => onFilterChange(material)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border ${
                activeFilter === material 
                  ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                  : 'bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 border-green-200 dark:border-slate-700 hover:border-green-400'
              }`}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {facilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-600 px-8 text-center">
            <Filter size={48} className="mb-4 opacity-20" />
            <p className="text-sm">No facilities found for this selection.</p>
          </div>
        ) : (
          <ul className="divide-y divide-green-50 dark:divide-slate-800">
            {facilities.map((f) => (
              <li 
                key={f.id}
                onClick={() => handleItemClick(f)}
                className={`p-4 cursor-pointer transition-colors hover:bg-green-50/80 dark:hover:bg-slate-800/80 ${
                  selectedFacility?.id === f.id ? 'bg-green-50 dark:bg-slate-800 border-l-4 border-green-600 dark:border-green-500' : 'border-l-4 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 leading-tight">{f.name}</h3>
                  <div className="flex gap-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md border ${
                      f.isCrowdsourced ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/50'
                    }`}>
                      {f.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <MapPin size={12} />
                  <span className="truncate">{f.address}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {f.materials.slice(0, 3).map(m => (
                    <span key={m} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {m}
                    </span>
                  ))}
                </div>
                {f.reviews.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                    <Star size={10} fill="currentColor" />
                    {(f.reviews.reduce((a,b) => a+b.rating,0)/f.reviews.length).toFixed(1)} ({f.reviews.length})
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isDetailOpen && selectedFacility && (
        <div 
          onClick={() => setIsDetailOpen(true)}
          className="p-4 bg-green-900 dark:bg-green-950 text-white cursor-pointer hover:bg-green-800 dark:hover:bg-green-900 transition-colors"
        >
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-sm truncate pr-2">{selectedFacility.name}</h4>
            <ChevronRight size={14} className="animate-pulse" />
          </div>
          <p className="text-[10px] text-green-300 dark:text-green-400">Tap to view full details and reviews</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
