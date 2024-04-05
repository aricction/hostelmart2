import React from "react";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, title, price, description, uid, now }) => {
  // Convert Firebase Timestamp to JavaScript Date object
  const postDate = new Date(now);

  // Format date as desired (e.g., MM/DD/YYYY)
  const formattedDate = `${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`;

  return (
    <div className="p-4 md:px-8 md:pt-6">
      <div className="object-cover card lg:w-96 h-96 bg-royal-blue-300 shadow-xl flex-col overflow-hidden rounded-lg border">
        <figure>
          <img src={imageUrl} alt={title} className="lg:w-full lg:h-96 sm:w-32 sm:h-32 object-cover" />
        </figure>

        <div className="mt-4 px-5 pb-5">
          <h5 className="lg:text-2xl sm:text-xs tracking-tight text-slate-900">{title}</h5>

          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="lg:text-3xl sm:text-xs font-bold text-white ext-slate-900">Rs {price}</span>
            </p>
          </div>
          <div className="card-actions flex justify-start items-center mt-4">
            <p className="">Posted on: {formattedDate} </p>
            
          </div>
          <p className="text-gray-700 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
