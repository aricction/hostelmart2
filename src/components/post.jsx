import React, { useEffect, useState } from "react";
import { auth,db,storage,fs } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

export default function Post() {

    const navigate = useNavigate();
    const now = Date.now();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [uid, setUid] = useState(null);
    const [img, setImage] = useState(null);
    const [imageError, setImageError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG', 'image/webp','image/jfif'];

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

    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImageError('');
                var options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 512,
                    useWebWorker: true
                }
                imageCompression(selectedFile, options)
                    .then(function (compressedFile) {
                        setImage(compressedFile);
                        console.log('compress done');
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            }
            else {
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else {
            console.log('please select your file');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload image to Firebase Storage
            const imageRef = storage.ref().child(`ProdImg/${img + now}`);
            await imageRef.put(img);
            const imageUrl = await imageRef.getDownloadURL();

            // Get current timestamp

            // Store post data in Firestore with timestamp
            const postRef = await db.collection('products').doc(`${now}`).set({                title,
                description,
                price: parseFloat(price), // assuming price is a number
                imageUrl,
                uid,
                now
            });

            setSuccessMsg("Post uploaded successfully!");
        } catch (error) {
            setErrorMsg("Error uploading post: " + error.message);
        }
    }

    return (
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

                <form className="max-w-md  pt-10 flex flex-col">
                    <div className="mb-4">
                        <label className="block mb-1">Title</label>
                        <input type="text" id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add a title..." className="w-full border border-gray-300 rounded-md px-3 py-2" />
                    </div>


                    <div className="mb-4">
                        <label className="block mb-1">Description</label>
                        <input type="text" id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add a description..." className="w-full border border-gray-300 rounded-md px-3 py-2" rows="4" />
                    </div>

                    <div>
                        <label className="block mb-1">Set a price</label>
                        <input type="number" id="price" onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2" />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1" > Upload photos </label>

                        <input type="file" className="file-input file-input-bordered file-input-primary "
                            onChange={(e) => handleProductImg(e)}
                        />
                    </div>
                    <div className="flex justify-end mb-4 pt-8 ">
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
                    </div>

                    {errorMsg && <div className="text-red-600">{errorMsg}</div>}
                    {imageError && <div className="text-red-600">{imageError}</div>}
                    {successMsg && <div className="text-green-600">{successMsg}</div>}
                </form>


            </div>
        </>
    );

}
