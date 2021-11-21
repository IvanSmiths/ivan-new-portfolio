/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Canvas = dynamic(
  () => {
    return import('../components/Canvas');
  },
  { ssr: false }
);

function App() {
  return (
    <div>
      <Canvas />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam
        illum tempora necessitatibus facere saepe deserunt, similique optio nam
        hic, nisi voluptas nulla modi quas. Quisquam, error temporibus non
        aperiam sint earum dolores repellendus doloremque, ea quos rerum.
        Tempora, soluta?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam
        illum tempora necessitatibus facere saepe deserunt, similique optio nam
        hic, nisi voluptas nulla modi quas. Quisquam, error temporibus non
        aperiam sint earum dolores repellendus doloremque, ea quos rerum.
        Tempora, soluta?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam
        illum tempora necessitatibus facere saepe deserunt, similique optio nam
        hic, nisi voluptas nulla modi quas. Quisquam, error temporibus non
        aperiam sint earum dolores repellendus doloremque, ea quos rerum.
        Tempora, soluta?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam
        illum tempora necessitatibus facere saepe deserunt, similique optio nam
        hic, nisi voluptas nulla modi quas. Quisquam, error temporibus non
        aperiam sint earum dolores repellendus doloremque, ea quos rerum.
        Tempora, soluta?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam
        illum tempora necessitatibus facere saepe deserunt, similique optio nam
        hic, nisi voluptas nulla modi quas. Quisquam, error temporibus non
        aperiam sint earum dolores repellendus doloremque, ea quos rerum.
        Tempora, soluta?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam
        illum tempora necessitatibus facere saepe deserunt, similique optio nam
        hic, nisi voluptas nulla modi quas. Quisquam, error temporibus non
        aperiam sint earum dolores repellendus doloremque, ea quos rerum.
        Tempora, soluta?
      </p>
      <img
        className="reveal-image"
        src="image.jpg"
        height="200px"
        width="200px"
        alt=""
      />
    </div>
  );
}

export default App;
