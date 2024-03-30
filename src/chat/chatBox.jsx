import React, { useEffect, useRef, useState } from "react";
import { 
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db , storage } from "../firebase";
import Message from "./message";
import SendMessage from "./sendMessage";

const ChatBox = () => {
    const [messages, setMessages] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const scrollRef = useRef();

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc"),
            limit(5)
        );



        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            const fetchedMessages = [];

            querySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });

            const sortedMessages = fetchedMessages.sort(
                (a,b) => a.createdAt - b.createdAt
            );

            console.log("Fetched messages:", fetchedMessages); // Log fetched messages
            setMessages(sortedMessages);
            
            setLoading(false); // Set loading state to false when messages are fetched
        });
          
      
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <main className="chat-box">
            {loading && <div className="loading">Loading messages...</div>}
            {!loading && messages.length === 0 && <div className="error">Error fetching messages. Please try again later.</div>}
            {!loading && messages.length > 0 && (
                <>
                    <div className="messages-wrapper">
                        {messages.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                        <span ref={scrollRef}></span>
                    </div>
                    <SendMessage scrollRef={scrollRef} /> {/* Pass scrollRef as scrollRef */}
                </>
            )}
        </main>
    );
};

export default ChatBox;
