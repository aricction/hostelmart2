import React, { useEffect, useState } from "react";
import Post from "../components/post";
import { auth, db , textDB,  storage} from "../firebase";
import { addDoc, collection, getDocs, doc, query, where, getDoc, setDoc} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export default function UserProfile() {


    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userAds, setUserAds] = useState([]);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                setUser(authUser);

                const docRef = db.collection('users').doc(authUser.uid);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        setUserName(doc.data().FirstName); // Set userName state with user's first name
                    }
                }).catch((error) => {
                    console.error("Error getting user document:", error);
                });

                setUserEmail(authUser.email);

                const q = query(collection(textDB, 'textData'), where('uid', '==', authUser.uid));
                const querySnapshot = await getDocs(q);
                const userAdsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const adsWithImages = await Promise.all(userAdsData.map(async (ad) => {
                    const imgRef = ref(storage, ad.imgUrl);
                    const url = await getDownloadURL(imgRef);
                    return { ...ad, imageUrl: url };
                }));

                setUserAds(adsWithImages);
            }
        });

        return () => {
            unsubscribe();
        };
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
                         src={`https://api.adorable.io/avatars/200/${userEmail}/blue.png`}
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
                            <p  className="sm: ps-2 my-2 text-white dark:bg-gray-900">{userEmail ? userEmail : "Email not available"}</p>

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


    <p className="text-3xl text-bold mt-4 pl-8 ">YOUR ADS</p>
    {userAds.length > 0 ? (
    <div className="flex flex-wrap flex-cols-1 p-8 mt-4 md:flex-cols-2 gap-5">

    {userAds.map((ad) => (
        <div key={ad.id} className="mb-4 mr-4">
            <img src={ad.imageUrl} className="object-cover w-96 sm:h-64 h-32" alt="alt image" />
            <div className="relative mt-2">
                <p>
                    <span className="text-xl font-bold text-slate-900">{ad.title}</span>
                </p>
                
                <p>
                    <span className="text-xl font-bold text-slate-900">Rs {ad.price}</span>
                </p>
            </div>
            {/* You can display more ad details here */}
        </div>
    ))}
</div>
    ) : (
    
        <div className="flex justify-center items-center mt-4">
        <p className="text-xl text-gray-500">No ads posted yet.</p>
      </div>
    
    )}
   
            </div>
        </>
    );

}