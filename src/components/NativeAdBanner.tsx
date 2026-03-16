import React, { useEffect, useRef } from 'react';

export function NativeAdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Clear any existing content to ensure a fresh start on re-mounts
    containerRef.current.innerHTML = '';

    // 2. Create the target div for the ad FIRST
    const adDiv = document.createElement('div');
    adDiv.id = 'container-b63c1f9830c305a45bdb3303e1b12e4e';
    containerRef.current.appendChild(adDiv);

    // 3. Create the script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.cfasync = 'false';
    // Add a cache buster so the browser fetches and executes it fresh on every page load
    script.src = `https://pl28923225.effectivegatecpm.com/b63c1f9830c305a45bdb3303e1b12e4e/invoke.js?cb=${Date.now()}`;
    
    // 4. Append the script AFTER the div is in the DOM
    containerRef.current.appendChild(script);

    return () => {
      // 5. Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full mt-6 mb-6">
      <div 
        ref={containerRef} 
        className="w-full min-h-[50px] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Ad script and container will be injected here dynamically */}
      </div>
    </div>
  );
}
