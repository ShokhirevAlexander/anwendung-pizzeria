import React from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {addItem} from "../redux/slices/cartSlice";

function PizzaBlock({ id, title, products_size, product_tests, image }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const [activeSize, setActiveSize] = React.useState('26cm');
  const [activeType, setActiveType] = React.useState('тонкое');
  const [pricePizza, setPricePizza] = React.useState(products_size[0].price);
  const addCount = cartItem ? cartItem.count: 0;

  const handleSizeClick = (index, id) => {
    setActiveSize(index);
    setPricePizza(products_size[id].price);
  };

  const handleTypeClick = (index) => {
    setActiveType(index)
  }

  const onClickAdd = () => {
    const item = {
      id,
      title,
      image,
      type: activeType,
      size: activeSize,
      price: Number(pricePizza),
    };
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block">
      <Link key={id} to={`/product/${id}`}>
        <img className="pizza-block__image" src={image} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {product_tests.map((type, index) => (
            <li
              onClick={() => handleTypeClick(type.type_of_test)}
              key={index}
              className={activeType === type.type_of_test ? "active" : ""}
            >
              {type.type_of_test}
            </li>
          ))}
        </ul>
        <ul>
          {products_size.map((sizes, id) => (
            <li
              onClick={() => handleSizeClick(sizes.size, id)}
              key={id}
              className={activeSize === sizes.size ? "active" : ""}
            >
              {sizes.size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{Number(pricePizza)}₽</div>
        <button onClick={ onClickAdd } className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          { addCount > 0 && <i>{ addCount }</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
