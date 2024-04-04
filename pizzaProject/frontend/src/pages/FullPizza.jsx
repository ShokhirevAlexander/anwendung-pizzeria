import React from "react";

import axios from 'axios';

import { Link, useParams, useNavigate } from "react-router-dom";

function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/product/' + id + '/');
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src="#" />
      <h2>Наименование пиццы</h2>
      <p>{pizza.title}</p>
      <img src={pizza.image} />
      <h4>Цена пиццы ₽</h4>
      {
        pizza.products_size.map((obj) => (
          <h4>{obj.price}P - {obj.size} размер</h4>
        ))
      }
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
}

export default FullPizza;
