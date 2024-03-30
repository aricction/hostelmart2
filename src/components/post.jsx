import React, { useEffect, useState } from "react";
import {auth , storage, db , imgDB, textDB} from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { ref , uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, doc, setDoc, Timestamp} from "firebase/firestore";




export default function Post(){

    const [title, setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [price , setPrice] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [uid, setUid] = useState(null);
    const [img, setImg] = useState('');
    const [data, setData] = useState([]);
  

    useEffect(() => {
        // Function to get the UID
        const getUserUid = () => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                } else {
                    console.log('not logged in');
                    navigate('/login');
                }
            });
        };
        getUserUid(); // Call the function to get the UID
    }, []);


    const handleUpload = (e) => {
        e.preventDefault();
       
        const file = e.target.files[0];
        console.log(file);
        
        const timestamp = String(Date.now()); // Get the current timestamp
        const imgId = `${v4()}_${timestamp}`; // Append timestamp to imgId
        const imgsRef = ref(imgDB, `Imgs/${imgId}`);
        
        uploadBytes(imgsRef, file)
        .then(snapshot => {
            console.log("File uploaded successfully", snapshot);
            getDownloadURL(snapshot.ref)
            .then(url => {
                console.log("Download URL:", url);
                setImg(url);
               
                const commonId = imgId;
                const productDetails = {
                    title: title,
                    description: description,
                    price: price,
                    imgUrl: url,
                    uid: uid,
                    uploadDate: timestamp
                };
    
                addProductDetails(commonId, productDetails);
    
            }).catch(error => {
                console.error("Error getting download URL:", error);
            });
        }).catch(error => {
            console.error("Error uploading file:", error);
        });
    };
    
    
    const addProductDetails = async (commonId, productDetails) => {
        try {
          const valRef = doc(textDB, 'textData', commonId);
          await setDoc(valRef, productDetails);
          console.log("Product details added successfully");
          //getData(uid); // Refresh data after adding a new post
        } catch (error) {
          console.error("Error adding product details:", error);
        }
      };

    

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title =="" || description=="" || price=="" || img=="") {
            setErrorMsg('Please fill in all fields');
            return;
        }
    
        try {
            const valRef = collection(textDB, 'textData');
            await addDoc(valRef, { 
                 title: title,
                 description: description, 
                 price: price,
                 imgUrl: img,
                  uid: uid,
                  uploadDate: Timestamp.now()
                });
            setSuccessMsg('Data added successfully');
            setTitle('');
            setDescription('');
            setPrice('');
            setImg('');
            setErrorMsg('');
            setUid('');
            setTimeout(() => {
                setSuccessMsg('');
            }, 3000);
            navigate('/userprofile');

            //getData(); // Refresh data after adding a new post
        } catch (error) {
            setErrorMsg(error.message);
            console.error("Error adding document:", error);
        }
    };



    return(
        <>
        <div className="bg-royal-blue-600 shadow-lg p-4 ">
        <a href="/userprofile" aria-label="home" className="absolute top-1 left-2 p-4" >
                    <svg
                        data-slot="icon"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="text-white w-6 h-6" >
                           <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                    </svg>
                </a>
    <p className="text-xl text-bold text-white mb-4 ps-10">Create a post</p>
        </div>

<div className="flex justify-center items-center h-full">

    <form    className="max-w-md  pt-10 flex flex-col">
       <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input type="text" id="title"
              onChange={(e)=>setTitle(e.target.value)} 
              placeholder="Add a title..." className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>

   
        <div className="mb-4">
            <label className="block mb-1">Description</label>
            <input type="text" id="description"  
             onChange={(e) => setDescription(e.target.value)} 
             placeholder="Add a description..." className="w-full border border-gray-300 rounded-md px-3 py-2" rows="4"/>
        </div>
        
        <div>
            <label className="block mb-1">Set a price</label>
            <input type="number" id="price" onChange={(e) => setPrice(e.target.value)} 
            className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
    
        <div className="mt-4">
            <label className="block mb-1" > Upload photos </label>
          
            <input type="file"  className="file-input file-input-bordered file-input-primary "
            onChange={(e) => handleUpload(e)}  
            />
        </div>
        <div className="flex justify-end mb-4 pt-8 ">
            <button type="submit"  onClick={(e) => handleSubmit(e)}  className="bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
        </div>

        {errorMsg && <div className="text-red-600">{errorMsg}</div>}
                    
        {successMsg && <div className="text-green-600">{successMsg}</div>}
    </form>
    
  
    </div>
      </>


    
    );

}
