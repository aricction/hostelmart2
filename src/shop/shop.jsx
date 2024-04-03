// Shop.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Product from "./Product";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getFirestore();
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push(doc.data());
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="">
        <Searchbar />
      </div>

      <div className="sm:flex md:ps-20">
        <div className="flex flex-wrap flex-col md:flex-row justify-start">
          {products.length > 0 &&
            products.map((product, index) => (
              <Product
                key={index}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                description={product.description}
                uid={product.uid}
                now={product.now}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
