import { useState, useEffect } from 'react'
import ProductCard from "./components/productCard";
import { RingLoader } from "react-spinners";
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);
  // useEffect(() => {
  //   fetch("https://dummyjson.com/products")
  //   .then((response) => {
  //       if (!response.ok) throw new Error("server error!");
  //       return response.json();})
  //   .then((data) => {
  //       setProducts(data.products);
  //       setLoading(false);})
  //   .catch((err) => {
  //       setError(err.massage);
  //       setLoading(false);})
  // }, []);


  return (
    <div className="store">
      <h1 className="store__title">Our Products</h1>

      <div className="store__grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            name={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App



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