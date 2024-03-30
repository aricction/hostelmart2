import React, { useState , useRef } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function SendMessage() {
    const scrollRef= useRef();

    const [message, setMessage] = useState("");
    
    const sendMessage = async (event) => {
        event.preventDefault();

        if (message.trim() === "") {
            alert("Enter message");
            return;
        }

        const { uid, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: message,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
        });

        setMessage("");
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="pt-8 px-6 justify-center items-center">
            <form onSubmit={(event) => sendMessage(event)} className="send-message items-center">
                <label hidden> Enter Message</label>
                <div className="relative flex">
    <input
        type="text"
        className="form-input h-12 w-full rounded-full bg-gray-200 " // Adjusted pr-12 for button width
        placeholder="  Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3">
        <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-6 h-6"
         >
            <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"></path>
        </svg>
    </button>
    </div>

            </form>
            <div ref={scrollRef}></div>
        </div>
    );
}
