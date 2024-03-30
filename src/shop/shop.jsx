import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Link } from "react-router-dom";
import {  storage, textDB } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Shop() {
  const [imgUrls, setImgUrls] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageListRef = storage.ref('Imgs');
        const imageList = await imageListRef.listAll();
        const urls = await Promise.all(imageList.items.map(async (imageRef) => {
          const url = await imageRef.getDownloadURL();
          return url;
        }));
        setImgUrls(urls);
      } catch (error) {
        console.log('error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        //const startDate = new Date('2024-03-01'); // Example start date
        //const endDate = new Date('2025-03-31');   

        
       // const querySnapshot = await getDocs(q);
       const valRef = collection(textDB, 'textData');
       //const q = query(valRef, where("uploadDate", ">=", startDate), where("uploadDate", "<=", endDate));
       const dataDB = await getDocs(valRef);

        const allData = dataDB.docs.map((val) => ({
          id: val.id,
          ...val.data()
        }));

       // allData.reverse();
        setProducts(allData);

      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    getData();
  }, [imgUrls]);


  return (
    <div>
      <Navbar />
      <div className="">
        <Searchbar />
      </div>

      <div className=" sm:flex  md:ps-20">
        <div className="flex flex-wrap flex-col md:flex-row justify-start">
          {products.length > 0 && imgUrls.length > 0 && products.map((product, index) => (
            <div key={index} className="p-4 md:px-8 md:pt-6">
              <div className=" object-cover card lg:w-96 h-96 bg-royal-blue-300 shadow-xl flex-col overflow-hidden rounded-lg border">
                <figure>
                  <img src={imgUrls[index]} alt={`Product ${index + 1}`} className="lg:w-full lg:h-96 sm:w-32 sm:h-32 object-cover  " />
                </figure>
               
                <div className="mt-4 px-5 pb-5">
                  <h5 className="lg:text-2xl sm:text-xs tracking-tight text-slate-900">{product.title}</h5>

                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="lg:text-3xl sm:text-xs font-bold text-white ext-slate-900">Rs {product.price}</span>

                    </p>
                  </div>
                  <div className="card-actions flex justify-start items-center mt-4">
                  <p className=""> 
                   posted on 
                </p>
                    <div className="sm:hidden">
                    {/*<Link to="#">         
                      <button type="submit" className="w-full bg-royal-blue-500 hover:bg-ceramic-900 text-white font-bold py-2 px-4 rounded-full">
                       Buy Now
                      </button>
                     </Link> */}
                    </div>
                    <div className="ml-auto">
                      <Link to="/chatBox">
                        <button className="flex items-center justify-center w-full bg-royal-blue-800 text-white font-bold py-2 px-4 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                          </svg>
                          <span className="ps-1">Chat</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
