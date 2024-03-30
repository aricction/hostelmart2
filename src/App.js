import './App.css';
import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './home/home';
import Login from './login/login';
import Register from './register/register';
import Shop from './shop/shop';
import UserProfile from './profile/userprofile';
import Post from './components/post';
import SendMessage from './chat/sendMessage';
import Message from './chat/message';
import ChatBox from './chat/chatBox';
import { useAuthState } from 'react-firebase-hooks/auth';



function App() {
  return (
     <BrowserRouter>
     <Routes>
     <Route path='/'  element={<Home/>}/>
     <Route path='/home'  element={<Home/>}/>
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/shop" element={<Shop />} />
     <Route path="/userprofile" element={<UserProfile/>} />
     <Route path="/post" element={<Post />} />
     <Route path="/sendMessage" element={<SendMessage />} />
     <Route path="/message" element={<Message />} />
     <Route path="/chatBox" element={<ChatBox />} />
     </Routes>
     </BrowserRouter>
  );
}

export default App;
