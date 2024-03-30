import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import hostel from "../components/images/hostel.jpg";
import Card from "../components/cards";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const Home = () => {



  return (
    <>
    <main>
      <Navbar />

      <div className="relative h-screen bg-cover bg-center ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-center z-10">
        
          <h1 className="lg:text-4xl font-bold  sm:text-sm ">
            Empowering Student Living: Elevate Your Hostel Experience with Sustainable Style - Reused, Refreshed, and Ready for You!
          </h1>
       
        </div>
        <div className="p-4  w-full h-100">
        <div className=" bg-white rounded-lg shadow-md overflow-hidden">
          <img src={hostel}alt="hostel" className="object-cover h-60 sm:h-36 w-full " />
          </div>
          
        </div>
        
      </div>
      
      <h1 className="ps-8 pt-6 lg:text-4xl sm:text-sm text-bold text-royal-blue-900 " >Our Top Categories </h1>
      <div className="mt-4 sm:">
       <Card/>
      </div>
    
    </main>
    <footer className="bg-royal-blue-900 rounded shadow m-4 dark:bg-grey-800">
  <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
    <span className="text-sm text-center text-white sm:text-center dark:text-grey-400">
      All rights Reserved.
    </span>
  </div>
</footer>


      </>
  );
};

export default Home;
