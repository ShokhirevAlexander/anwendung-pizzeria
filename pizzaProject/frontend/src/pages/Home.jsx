import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import Skeleton from "../components/Skeleton";

import { getProducts } from "../redux/slices/productsSlice";
import { getCategories, setCategoryId } from "../redux/slices/categoriesSlice";
import { setPageCount } from "../redux/slices/paginationSlice";
import { selectIsLoading } from "../redux/slices/productsSlice";
import { selectProducts } from "../redux/slices/productsSlice";
import { selectCategories } from "../redux/slices/categoriesSlice";
import { selectSort } from "../redux/slices/filterSlice";
import { selectPage } from "../redux/slices/paginationSlice";
import { selectCategoryId } from "../redux/slices/categoriesSlice";
import { selectSearch } from "../redux/slices/filterSlice";


function Home() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const sortFilter = useSelector(selectSort);
  const pageCount = useSelector(selectPage);
  const categoryId = useSelector(selectCategoryId);
  const isLoading = useSelector(selectIsLoading);
  const searchValue = useSelector(selectSearch);

  const onChangePage = React.useCallback((number) => {
    dispatch(setPageCount(number));
  }, []);

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
    dispatch(setPageCount(1));
  }, []);

  const getPizza = async() => {
    const sorted = `?ordering=${sortFilter.sortProperty}`;
    const category = categoryId > 0 ? `&category__id=${categoryId}`: '';
    const page = `&page=${pageCount}`;
    const search = searchValue ? `&search=${searchValue}`: '';

    dispatch(
      getProducts({
        sorted,
        category,
        page,
        search,
      }),
    );
    window.scrollTo(0, 0);
  }

  React.useEffect(() => {
    getPizza();
    dispatch(getCategories());
  }, [categoryId, sortFilter, pageCount, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          categories={categories}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">все пиццы</h2>
      <div className="content__items">
        {isLoading === "loading" ? (
        [...new Array(6)].map((_, index) => <Skeleton key={index} />)
      ) : products.results && products.results.length > 0 ? (
        products.results.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
      ) : (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Нет продуктов, удовлетворяющих вашему запросу</p>
        </div>
      )}
      {isLoading === "error" && (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      )}
      </div>
      <Pagination
        onChangePage={onChangePage}
        maxPage={Math.ceil(products.count / 2)}
      />
    </div>
  );
}

export default Home;
