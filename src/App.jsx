import { useState, useEffect } from 'react';
import ProductCard from "./components/productCard";
import { RingLoader } from "react-spinners";
import './App.css';


const CATEGORIES = ["all", "furniture", "laptops", "vehicle", "fragrances", "groceries",];

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [submitQuery, setSubmitQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  

  function handleSearch(e) {
    e.preventDefault();
    setSelectedCategory("all");
    setSubmitQuery(searchQuery);
  }
  function handleCategory(category) {
    setSelectedCategory(category);
    setSearchQuery("");
    setSubmitQuery("");
  }

  useEffect(() => {
    let url = "https://dummyjson.com/products";

    if (submitQuery) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(submitQuery)}`;
    } else if (selectedCategory !== "all") {
      url = `https://dummyjson.com/products/category/${selectedCategory}`;
    }

    setLoading(true);
    setError(null);

    fetch(url)
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
  }, [submitQuery, selectedCategory]);

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
        <div className='categories-bar' >
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`cat-btn`} onClick={() => handleCategory(cat)} >{cat.toUpperCase()}</button>
          ))}

        </div>

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
            <p style={{ marginBottom: "15px", color: "#8E9AAF" }}>
              Showing <strong>{products.length}</strong> products
            </p>

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
                    discount={product.discountPercentage}
                    brand={product.brand}
                    availability={product.availabilityStatus}
                    category={product.category}
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