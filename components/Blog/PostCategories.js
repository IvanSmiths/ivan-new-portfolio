import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../../utils/index';

const PostCategories = () => {
  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };

  const [dropdown2, setDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  return (
    <div onMouseLeave={onMouseLeave} className="categories-dropdown-cnt">
      <em onMouseEnter={onMouseEnter}>Categories</em>
      {dropdown2 && (
        <div className="categories-dropdown" onMouseLeave={onMouseLeave}>
          {categories.map((category) => (
            <Link key={category.name} href={`/category/${category.slug}`}>
              <a>{category.name}</a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCategories;
