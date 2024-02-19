import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [product, setProduct] = useState(0);
  const [page, setPage] = useState(1);
  const fetchdata = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log("data", data.products);
      if (data && data.products) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handlePage(i) {
    console.log("i", i);
    if (i >= 1 && i <= product.length / 10) {
      setPage(i);
    }
  }
  useEffect(() => {
    fetchdata();
    console.log("product", product);
  }, []);
  return (
    <div className="App">
      {product?.length > 0 && (
        <div className="products">
          {product.slice(page * 10 - 10, 10 * page).map((item, index) => {
            return (
              <span key={index} className="products__single">
                <img src={item?.thumbnail} alt={item?.title} />
              </span>
            );
          })}
        </div>
      )}
      {product.length > 0 && (
        <div className="pagination">
          <span onClick={() => handlePage(page - 1)}>◀</span>
          {[...Array(product.length / 10)].map((_, i) => {
            return (
              <span
                className={page == i + 1 ? "paginationSelect" : ""}
                key={i}
                onClick={() => handlePage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span onClick={() => handlePage(page + 1)}>▶</span>
        </div>
      )}
    </div>
  );
}
