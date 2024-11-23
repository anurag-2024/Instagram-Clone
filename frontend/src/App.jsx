import { useEffect } from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import LoginRedirected from './pages/LoginRedirected';
import ResetPassword from './pages/ResetPassword';
import SetPassword from './pages/SetPassword';
import Explore from './pages/Explore';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import OTP from './pages/OTP';
import Post from './pages/Post';
import Story from './pages/Story';
import Cookies from 'js-cookie';
import Settings from './pages/Settings';
import { Navigate } from 'react-router';
import { io } from 'socket.io-client'; 
import { useDispatch } from 'react-redux';
import { addNotification, setLoading } from './Store/slices/notificationSlice';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function App() {
  const socket = io(import.meta.env.VITE_REACT_APP_SOCKET_URL, {
    auth: {
      token: Cookies.get('token')
    }
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      socket.connect();
      
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
        const userId = JSON.parse(atob(token.split('.')[1])).userId;
        socket.emit('user_connected', userId);
      });

      
      socket.on('newNotification', (notification) => {
        console.log('New notification received:', notification);
        dispatch(addNotification({
          ...notification,
          id: notification._id
        }));
        if(notification.type === "comment"){
            toast.success(`${notification.fromUser} commented on your post: "${notification.message.split('commented on your post')[1]}"`);
          } else {
          toast.success(`${notification.fromUser} ${notification.message}`);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('newNotification');
        socket.disconnect();
      }
    };
  }, [dispatch]);

  const ProtectRoute=({children})=>{
    const token=Cookies.get('token');
    if(!token){
      return <Navigate to="/login"  replace={true} />
    }
    return children;
  }
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectRoute><Home /></ProtectRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login-redirected" element={<LoginRedirected/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/set-password" element={<SetPassword/>} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/otp" element={<OTP/>} />
          <Route path="/user/:id" element={<UserProfile/>} />
          <Route path="/p/:postId" element={<Post/>} />
          <Route path="/stories/:username/:storyId" element={<Story/>} />
          <Route path="/accounts/edit" element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
