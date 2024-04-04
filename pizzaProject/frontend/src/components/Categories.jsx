import React from "react";

import { selectCategories } from "../redux/slices/categoriesSlice";

import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

function Categories({categoryId, categories, onChangeCategory }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onChangeCategory(0)}
          className={categoryId === 0 ? "active" : ""}
        >
          Все
        </li>
        {categories.map(({ id, title }) => (
          <li 
          key={id}
          onClick={() => onChangeCategory(id)}
          className={categoryId === id ? "active" : ""}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
