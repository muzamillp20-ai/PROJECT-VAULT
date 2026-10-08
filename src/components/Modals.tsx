import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import QRCode from 'qrcode';

interface QRModalProps {
  url: string;
  projectName?: string;
  onClose: () => void;
}

export function QRModal({ url, projectName, onClose }: QRModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 256,
        margin: 2,
        color: { dark: '#111111', light: '#FFFFFF' }
      }).catch(() => setError('Failed to generate QR code'));
    }
  }, [url]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white border-2 border-[#111] shadow-[6px_6px_0px_#111] p-6 max-w-sm w-full animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 hover:bg-[#F7F8FC] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-bold font-['Space_Grotesk'] mb-1">QR CODE</h3>
        {projectName && (
          <p className="text-xs font-mono text-[#555] mb-4">{projectName}</p>
        )}

        <div className="flex justify-center py-4">
          {error ? (
            <p className="text-sm text-[#DC2626]">{error}</p>
          ) : (
            <canvas ref={canvasRef} className="border-2 border-[#111]" />
          )}
        </div>

        <div className="mt-3 p-2 bg-[#F7F8FC] border border-[#D1D5DB]">
          <p className="text-[10px] font-mono text-[#555] break-all text-center">{url}</p>
        </div>
      </div>
    </div>
  );
}

interface DeleteModalProps {
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ projectName, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white border-2 border-[#111] shadow-[6px_6px_0px_#111] p-6 max-w-md w-full animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[#DC2626]">DELETE THIS PROJECT?</h3>
        <p className="mt-2 text-sm text-[#555]">
          Are you sure you want to permanently remove <strong className="text-[#111]">"{projectName}"</strong> from your vault?
        </p>
        <p className="mt-1 text-xs text-[#555] font-mono">This action cannot be undone.</p>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-[#DC2626] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
          >
            DELETE PROJECT
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

interface ImportModalProps {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ImportModal({ count, onConfirm, onCancel }: ImportModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative bg-white border-2 border-[#111] shadow-[6px_6px_0px_#111] p-6 max-w-md w-full animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold font-['Space_Grotesk']">IMPORT PROJECTS?</h3>
        <p className="mt-2 text-sm text-[#555]">
          Import <strong className="text-[#111]">{count}</strong> project{count !== 1 ? 's' : ''} into your vault?
        </p>
        <p className="mt-1 text-xs text-[#555] font-mono">Projects will be added to your existing vault.</p>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-[#2563EB] text-white text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
          >
            IMPORT
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-white text-[#111] text-xs font-bold tracking-wider border-2 border-[#111] shadow-[3px_3px_0px_#111] hover:shadow-[4px_4px_0px_#111] transition-all btn-press"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
