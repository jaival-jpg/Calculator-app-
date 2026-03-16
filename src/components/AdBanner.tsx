import React from 'react';

export function AdBanner() {
  const adCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '544c21c9b2470225e876f02c2a5057e9',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/544c21c9b2470225e876f02c2a5057e9/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="flex justify-center items-center w-full mt-2 mb-2">
      <div className="w-[320px] h-[50px] bg-zinc-200 dark:bg-[#1C1C1E] rounded-xl overflow-hidden flex items-center justify-center">
        <iframe
          title="Ad Banner"
          width="320"
          height="50"
          frameBorder="0"
          scrolling="no"
          srcDoc={adCode}
          className="w-[320px] h-[50px]"
        />
      </div>
    </div>
  );
}
