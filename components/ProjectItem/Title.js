import React from 'react';

function Title({ title, handleMouseEnter, handleMouseLeave, page }) {
  return (
 
      <a          
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="title-item" 
      target="_blank" 
      href={page} 
      rel="noreferrer noopener">
  
          <p className="menu-title impact">{title}</p>
          <p className="menu-title impact clone">{title}</p>
       
      </a>
  
  );
}

export default Title;
