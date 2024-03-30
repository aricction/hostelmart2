import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Message = ({ message }) => {
    const [user] = useAuthState(auth);

    console.log("Message props:", message); // Log message props

    // Ensure message object is valid
    if (!message || !message.firstname || !message.text) {
        return null; // Render nothing if message is invalid
    }

    const isCurrentUser = user && message.uid === user.uid;

    return (
        <div className={`chat-bubble ${isCurrentUser ? "right" : ""}`}>
            {!isCurrentUser && (
                <img
                    className="chat-bubble__left"
                   // src={message.avatar || "fallback-avatar.png"}
                   // alt={`${message.firstname}'s avatar`}
                />
            )}
            <div className="chat-bubble__right">
                {!isCurrentUser && <p className="user-name">{message.firstname}</p>}
                <p className="user-message">{message.text}</p>
            </div>
        </div>
    );
};

export default Message;
