import React, { useEffect, useState } from "react";
import {auth , storage, db} from "../firebase";

const Card = () => {
 
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageListRef = storage.ref('images'); // Assuming your images are stored in a directory called 'images'
        const imageList = await imageListRef.listAll();
        const urls = await Promise.all(imageList.items.map(async (imageRef) => {
          const url = await imageRef.getDownloadURL();
          return url;
        }));
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error);
      }
    };

    fetchImages();
  }, []);


  return (
    <div className="carousel flex items-center px-8 justify-items-start">
      <div className="flex flex-cols-1 md:flex-cols-2 gap-5">
        {imageUrls.map((url, index) => (
          <div key={index} className="carousel-item card w-80 h-90 bg-royal-blue-100 shadow-xl overflow-hidden rounded-lg border">
            <figure className="relative">
              <h1 className="absolute inset-0 flex items-center text-bold justify-center lg:text-2xl sm:text-sm text-white text-center">
                Image {index + 1}
              </h1>
              < img key={index} src={url} alt={`Image ${index}`} className="object-cover w-full h-96" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
