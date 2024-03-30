import React,{useState, useRef} from "react";
import { useCollectionData } from "../.firebase/firestore";
import {auth, storage, db} from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function ChatBox2() {


    const [user] = useAuthState(auth);
    return (
        <div>
             <home />
                <section>
             {user ? <Chatroom /> : <login/>}

             </section>
        </div>
        
    );
}

function Chatroom() {
    const dummy = useRef();
    const messageRef = storage.collection('messages');
    const query = messageRef.orderBy('createAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const {uid} = auth.currentUser;
         
        await messageRef.add({
            text : formValue,
            createdAt: db.firestore.FieldValue.serverTimestamp(),
            uid
            
        })

        setFormValue('');
        dummy.current.scrollIntoView({behaviour: 'smooth'});

    }
    return (
        <>
        <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

       <span ref={dummy}></span>

       </main>

         <form onSubmit={sendMessage}>
         
         <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />        
         <button type="submit" disabled={!formValue}>🕊️</button>     
         </form>
        </>
    )

}


function ChatMessage(props) {
    const {text, uid ,photoURL} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
      <>
       <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
      
      </>
    )
  }
  
  export default ChatBox2;