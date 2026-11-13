
import { useState, useEffect } from 'react';
import ProductCard from "./components/productCard";
import { RingLoader } from "react-spinners";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [submitQuery, setSubmitQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setSubmitQuery(searchQuery);
  }

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(submitQuery.trim().toLowerCase())
  );

  return (
    <>
      <header>
        <h1 className="search-text">
          Search here for the products
        </h1>

        <form className="store-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="You can search here"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </header>

      <div className="store">

        {loading ? (
          <div>
            <p>Content is loading...</p>
            <RingLoader color="#36d7b7" />
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <h1 className="store__title">Our Products</h1>

            <div className="store__grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.thumbnail}
                    name={product.title}
                    price={product.price}
                    rating={product.rating}
                  />
                ))
              ) : (
                <p>No products found!</p>
              )}
            </div>
          </>
        )}

      </div>
    </>
  );
}

export default App;




// fetch("https://dummyjson.com/products?limit=100")----
//   .then(res => res.json())                       ----
//   .then(data => {                                ----
//     const shuffled = [...data.products].sort(    ----
//       () => Math.random() - 0.5                  ----
//     );                                           ----
//     setProducts(shuffled.slice(0, 10));          ----
//   });                                            ----






























// return (
//     <>
//       <nav>
//         <div className='container'></div>
//         <div className='logo'>
//           <h3>trendify</h3>
//         </div>
//         <button className='sign-in'>Sign in</button>
//       </nav>
//       <main>
//         {loading ? (<p>content is loading<RingLoader color="#36d7b7" /></p>) : (<h1>loaded</h1>)}
//       </main>
//     </>
//   )
// }