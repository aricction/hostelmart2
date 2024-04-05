import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Product = ({ imageUrl, title, price, description, uid, now }) => {
  const postDate = new Date(now);
  const formattedDate = `${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`;

  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Fetch phone data from Firestore based on UID
    const fetchPhone = async () => {
      try {
        if (uid !== ''){
          const userDoc = await db.collection("users").doc(uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            // Assuming phone is a field in the user document
            setPhone(userData.Phone);
          } else {
            console.log("User not Found.");
          }
        } else{
          console.log("Login again !!!");
        }
        }catch (error) {
          console.error("Error fetching user data:", error);
        }
       
    };

    fetchPhone();
  }, [uid]);

  const handleChat = () => {
    if (phone) {
      window.open(`https://api.whatsapp.com/send?phone=${phone}`, "_blank");
    } else {
      console.log("Phone number not available.");
    }
  };


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
            <div className="ml-auto">
              <button onClick={handleChat} className="flex items-center justify-center w-full bg-royal-blue-800 text-white font-bold py-2 px-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <span className="ps-1">Chat</span>
              </button>
            </div>
          </div>
          <p className="text-gray-700 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
