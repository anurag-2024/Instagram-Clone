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
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  const ProtectRoute=({children})=>{
    const token=Cookies.get('token');
    if(!token){
      return <Navigate to="/login"  replace={true} />
    }
    return children;
  }
  return (
    <>
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
          <Route path="/:username" element={<UserProfile/>} />
          <Route path="/p/:postId" element={<Post/>} />
          <Route path="/stories/:username/:storyId" element={<Story/>} />
          <Route path="/accounts/edit" element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
