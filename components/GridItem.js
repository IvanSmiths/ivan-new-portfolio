import React from 'react';

export default function GridItem({ url, description, index }) {
  return (
    <div className="grid-item">
      <img className="grid-item-media" src={url} />
      <p>{description}</p>
    </div>
  );
}
