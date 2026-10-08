import { Link } from 'react-router-dom';
import { Plus, FolderOpen } from 'lucide-react';

export default function EmptyState({ message, subMessage, showAddButton = true }: { message?: string; subMessage?: string; showAddButton?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 lg:py-24 px-4">
      <div className="w-20 h-20 border-2 border-[#111] bg-[#F7F8FC] flex items-center justify-center mb-6 shadow-[4px_4px_0px_#111]">
        <FolderOpen size={32} className="text-[#D1D5DB]" />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] tracking-tight text-center">
        {message || 'YOUR VAULT IS EMPTY.'}
      </h2>
      <p className="mt-3 text-sm text-[#555] text-center max-w-md">
        {subMessage || 'Start adding your projects and keep every important link in one place.'}
      </p>
      {showAddButton && (
        <Link
          to="/add"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 bg-[#2563EB] text-white text-sm font-bold tracking-wider border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:-translate-y-0.5 transition-all btn-press"
        >
          <Plus size={16} />
          ADD YOUR FIRST PROJECT
        </Link>
      )}
    </div>
  );
}
