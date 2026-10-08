import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showFilters?: boolean;
}

const categories = ['ALL', 'WEB', 'AI', 'CYBERSECURITY', 'HACKATHON', 'COLLEGE', 'MOBILE', 'TOOLS', 'OTHER'];
const statuses = ['ALL', 'LIVE', 'COMPLETED', 'IN DEVELOPMENT', 'ARCHIVED'];
const sortOptions = [
  { value: 'newest', label: 'NEWEST' },
  { value: 'oldest', label: 'OLDEST' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
  { value: 'updated', label: 'RECENTLY UPDATED' },
  { value: 'favorites', label: 'FAVORITES' },
  { value: 'featured', label: 'FEATURED' },
];

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  showFilters = true,
}: SearchFilterProps) {
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="SEARCH PROJECTS..."
          className="w-full pl-12 pr-12 py-4 border-2 border-[#111] bg-white text-sm font-mono font-semibold tracking-wider placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#2563EB] focus:shadow-[3px_3px_0px_#2563EB] transition-all"
          aria-label="Search projects"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F7F8FC] transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showFilters && (
        <>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-wider border-2 border-[#111] transition-all ${
                  activeCategory === cat
                    ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#111]'
                    : 'bg-white text-[#555] hover:bg-[#F7F8FC] hover:text-[#111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status + Sort Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-1.5">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider border transition-all ${
                    activeStatus === status
                      ? 'border-[#2563EB] bg-[#DBEAFE] text-[#2563EB]'
                      : 'border-[#D1D5DB] text-[#555] hover:border-[#111] hover:text-[#111]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative ml-auto">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-wider border-2 border-[#111] bg-white hover:bg-[#F7F8FC] transition-colors"
              >
                <SlidersHorizontal size={12} />
                {sortOptions.find(s => s.value === sortBy)?.label || 'SORT'}
              </button>
              {showSort && (
                <div className="absolute right-0 top-full mt-1 bg-white border-2 border-[#111] shadow-[3px_3px_0px_#111] z-20 min-w-[160px] animate-scale-in">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { onSortChange(option.value); setShowSort(false); }}
                      className={`block w-full px-3 py-2 text-xs font-semibold text-left hover:bg-[#F7F8FC] ${
                        sortBy === option.value ? 'text-[#2563EB] bg-[#DBEAFE]' : 'text-[#555]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl bg-white border-2 border-[#111] shadow-[6px_6px_0px_#111] animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PROJECTS..."
              className="w-full pl-12 pr-12 py-4 border-2 border-[#111] bg-white text-sm font-mono font-semibold tracking-wider placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#2563EB] transition-all"
              autoFocus
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F7F8FC]"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-3 text-xs text-[#555] font-mono">
            Search by name, description, tags, technologies, or URLs
          </p>
        </div>
      </div>
    </div>
  );
}
