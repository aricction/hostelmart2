import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import Product from "../shop/Product.jsx";

export default function UserProfile() {
    const [user, setUser] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAds, setUserAds] = useState([]);

    useEffect(() => {
        const fetchUserData = async (authUser) => {
            setUser(authUser);
            const docRef = db.collection('users').doc(authUser.uid);
            try {
                const docSnap = await docRef.get();
                if (docSnap.exists) {
                    setUserName(docSnap.data().FirstName);
                    setUserEmail(docSnap.data().Email);
                    
                }
                fetchUserAds(authUser.uid); 
            } catch (error) {
                console.error("Error getting user document:", error);
            }
        };

        const fetchUserAds = async (uid) => {
            const q = query(collection(db, "products"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            const ads = [];
            querySnapshot.forEach((doc) => {
                ads.push({ id: doc.id, ...doc.data() });
            });
            setUserAds(ads);
        };

        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                await Promise.all([
                    fetchUserData(authUser),
                ]);
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <>

            <div className="relative">
                <a href="/home" aria-label="home" className="absolute top-1 left-2 p-4" >
                    <svg
                        data-slot="icon"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-6 h-6" >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                    </svg>
                </a>

                <div className="flex flex-col items-center pt-14">
                    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <img
                            className="mx-auto h-full w-1/2 rounded-full"
                            src="https://api.dicebear.com/8.x/adventurer/svg?seed=Midnight"
                            alt="Profile Image"
                        />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl">
                                    {userName ? userName : " User name"}
                                </h2>
                            </div>

                            {/* Additional content goes here */}

                        </div>
                        <div>
                            <label className="justify-start">Email</label>
                            <p className="sm: ps-2 my-2 text-white dark:bg-gray-900">{userEmail ? userEmail : "Email not available"}</p>

                            <label>Username</label>
                            <input type="text" placeholder="your name" className="sm: ps-2 my-2 text-white dark:bg-gray-900" />
                        </div>
                    </div>

                </div>


                <div className="mt-4 flex justify-center px-8  ">

                    <div className="flex justify-center items-center bg-royal-blue-700 text-white rounded-lg lg:w-1/2 md:w-1/2 sm:w-12 sm:h-12">
                        <label className=" ml-8 ">Post your ad </label>
                        <a href="/post" aria-label="add">
                            <svg
                                data-slot="icon"
                                fill="none"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className=" ml-8 w-8 h-8 cursor-pointer"
                                onClick={() => console.log("Post")}
                            >
                                <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>


                <div className="mt-4">
                <p className="text-3xl text-bold mt-4 pl-8 ">YOUR ADS</p>
                {userAds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {userAds.map((ad) => (
                            <Product
                                key={ad.id}
                                imageUrl={ad.imageUrl}
                                title={ad.title}
                                price={ad.price}
                                description={ad.description}
                                uid={ad.uid}
                                now={ad.now}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-4">No ads found.</p>
                )}
            </div>

            </div>
        </>
    );

}