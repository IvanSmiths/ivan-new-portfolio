import React from 'react';
import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('./Canvas'), { ssr: false });

const Canvas2 = () => {
  return <Canvas />;
};

export default Canvas2;
