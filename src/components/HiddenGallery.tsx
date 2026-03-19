import React, { useState, useEffect, useRef } from 'react';
import { Plus, Play, Trash2, Share2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { saveMedia, getAllMedia, deleteMedia, MediaItem } from '../utils/db';

export function HiddenGallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [actionMenu, setActionMenu] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const items = await getAllMedia();
      setMedia(items);
    } catch (err) {
      console.error('Failed to load media', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedia = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate size (e.g., max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Max size is 50MB.`);
          continue;
        }

        const isVideo = file.type.startsWith('video/');
        const isImage = file.type.startsWith('image/');

        if (!isVideo && !isImage) {
          alert(`Unsupported format: ${file.name}`);
          continue;
        }

        const item: MediaItem = {
          id: crypto.randomUUID(),
          type: isVideo ? 'video' : 'image',
          data: file,
          timestamp: Date.now(),
        };

        await saveMedia(item);
      }
      await loadMedia();
    } catch (err) {
      console.error('Error saving media', err);
      alert('Failed to save media. Storage permission might be denied or storage is full.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia(id);
      await loadMedia();
      setActionMenu(null);
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const handleShare = async (item: MediaItem) => {
    if (navigator.share) {
      try {
        const file = new File([item.data], `vault_media_${item.id}.${item.type === 'image' ? 'jpg' : 'mp4'}`, {
          type: item.data.type,
        });
        await navigator.share({
          files: [file],
          title: 'Shared from Vault',
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      alert('Sharing is not supported on this device.');
    }
    setActionMenu(null);
  };

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number>(0);

  const handleTouchStart = (item: MediaItem) => {
    pressTimer.current = setTimeout(() => {
      setActionMenu(item);
    }, 500); // 500ms for long press
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black relative">
      <div className="p-6 pb-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Hidden Gallery</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading && media.length === 0 ? (
          <div className="flex justify-center items-center h-full text-zinc-500">
            Loading...
          </div>
        ) : media.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 dark:text-zinc-400">
            <p>No media found.</p>
            <p className="text-sm mt-2">Tap + to add photos or videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer shadow-sm active:scale-95 transition-transform"
                onClick={() => !actionMenu && setSelectedItem(item)}
                onTouchStart={() => handleTouchStart(item)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(item)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                {item.type === 'image' ? (
                  <img
                    src={URL.createObjectURL(item.data)}
                    alt="Vault item"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <video
                      src={URL.createObjectURL(item.data)}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="text-white w-8 h-8 opacity-80" fill="currentColor" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddMedia}
        className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all z-10"
      >
        <Plus className="text-white w-8 h-8" />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/x-matroska"
      />

      {/* Action Menu Modal */}
      {actionMenu && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setActionMenu(null)}>
          <div 
            className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-center font-semibold text-zinc-900 dark:text-white">Media Options</h3>
            </div>
            <button 
              onClick={() => handleShare(actionMenu)}
              className="w-full p-4 flex items-center justify-center gap-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-100 dark:border-zinc-800"
            >
              <Share2 size={20} /> Share
            </button>
            <button 
              onClick={() => handleDelete(actionMenu.id)}
              className="w-full p-4 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-b border-zinc-100 dark:border-zinc-800"
            >
              <Trash2 size={20} /> Delete
            </button>
            <button 
              onClick={() => setActionMenu(null)}
              className="w-full p-4 flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Media Viewer Modal */}
      {selectedItem && (
        <div 
          className="absolute inset-0 z-50 bg-black flex flex-col"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            touchStartX.current = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX.current;
            if (Math.abs(deltaX) > 50) {
              const currentIndex = media.findIndex(m => m.id === selectedItem.id);
              if (deltaX > 0 && currentIndex > 0) {
                // Swipe right -> previous
                setSelectedItem(media[currentIndex - 1]);
              } else if (deltaX < 0 && currentIndex < media.length - 1) {
                // Swipe left -> next
                setSelectedItem(media[currentIndex + 1]);
              }
            }
          }}
        >
          <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent absolute top-0 w-full z-10">
            <button 
              onClick={() => setSelectedItem(null)}
              className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {selectedItem.type === 'image' ? (
              <img
                src={URL.createObjectURL(selectedItem.data)}
                alt="Vault item full"
                className="max-w-full max-h-full object-contain transition-transform"
              />
            ) : (
              <video
                src={URL.createObjectURL(selectedItem.data)}
                controls
                autoPlay
                className="max-w-full max-h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
