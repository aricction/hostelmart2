import React from "react";
import Navbar from "../components/navbar";
import hostel from "../components/images/hostel.jpg";
import { auth } from "../firebase"; // Assuming this is used elsewhere
import { onAuthStateChanged } from "firebase/auth"; // Assuming this is used elsewhere

const Home = () => {
  return (
    <>
      <main>
        <Navbar />
        <div className="relative h-screen bg-cover bg-center ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:text-white text-center ">
            <h1 className="lg:text-4xl font-bold  sm:text-sm sm:text-black ">
              Empowering Student Living: Elevate Your Hostel Experience with Sustainable Style - Reused, Refreshed, and Ready for You!
            </h1>
          </div>
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={hostel} alt="hostel" className="object-cover w-full h-1/2" />
            </div>
          </div>
        </div>
        
       { /*<h1 className="ps-8 pt-6 lg:text-4xl sm:text-sm text-bold text-royal-blue-900">
         Our Top Categories
  </h1>*/}
   <footer className="footer">
    
     
  <div className="fixed bottom-0 left-0 w-full bg-royal-blue-900 dark:bg-grey-800">
  <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-center">
    <span className="text-sm text-center text-white sm:text-center dark:text-grey-400">
      © All rights Reserved.
    </span>
  </div>
</div>
</footer>
      </main>
    </>
  );
};

export default Home;
