import React,{useEffect,useState} from 'react';
import img01 from "../../assets/profileimages/img01.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchNotifications,setLoading} from '../../Store/slices/notificationSlice';
import {getRelativeTime} from '../../utils/time';


const Message = ({ notification }) => {
  const navigate = useNavigate();
  const [action, comment] = notification.message.split('commented on your post');
  return (
    <div 
    key={notification.id} 
    className="flex items-center p-2.5 hover:bg-gray-50"
  >
    <div className="w-10 h-10 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/${notification.username}`)}>
      <img 
        src={img01} 
        alt={notification.username} 
        className="w-full h-full rounded-full object-cover"
      />
    </div>
    <div className="ml-3 flex-grow">
      <p className="text-sm">
        <span 
          className="font-semibold cursor-pointer hover:text-blue-500"
          onClick={() => navigate(`/${notification.username}`)}
        >
          {notification.fromUser}
        </span>
        {" "}
        {notification.type==="comment"?
        <>
        commented on your post
        {comment && <span className="italic text-gray-600 ml-1">"{comment}"</span>}
        </>
        :notification.message}
      </p>
      <p className="text-gray-500 text-xs">{getRelativeTime(notification.createdAt)}</p>
    </div>
  </div>
  );
};

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(state => state.notifications);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    console.log('Notifications updated');
  }, [notifications,loading]);

  return (
    <div className="w-[397px] h-screen bg-white border-r border-gray-200 shadow-lg" role="dialog">
      {/* Search Header */}
      <div className="pt-8 px-4 pb-4">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      </div>

      {/* Recent Notifications */}
      <div className="px-2 pb-4 overflow-y-auto max-h-[calc(100vh-116px)] hover:overflow-scroll">
        {notifications.map((notification) => (
          <Message key={notification.id} notification={notification} />
        ))}
      </div>    
    </div>  
  );
};

export default Notification;
