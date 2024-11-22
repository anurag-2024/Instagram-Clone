import React from 'react';
import img01 from "../../assets/profileimages/img01.jpg";
import { useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const SearchItem = ({ username, fullName, navigate }) => {
  return (
    <div className="flex items-center py-2 px-4 hover:bg-gray-50">
      <div className="w-10 h-10 flex-shrink-0 cursor-pointer" onClick={() => navigate(`/${username}`)}>
        <img 
          src={img01} 
          alt={username} 
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="ml-3 flex-grow min-w-0">
        <p 
          className="font-semibold text-sm cursor-pointer truncate hover:text-blue-500"
          onClick={() => navigate(`/${username}`)}
        >
          {username}
        </p>
        <p className="text-gray-500 text-sm truncate">{fullName}</p>
      </div>
      <button className="p-2 text-gray-500 hover:text-gray-700">
        <RxCross2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const Search = () => {
  const navigate = useNavigate();
  const username = useSelector(state => state.username);
  const fullName = useSelector(state => state.fullName);

  return (
    <div className="w-[397px] h-screen bg-white border-r border-gray-200 shadow-lg">
      {/* Search Header */}
      <div className="pt-8 px-4 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">Search</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Recent Searches */}
      <div className="h-[calc(100vh-132px)] overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span className="font-semibold">Recent</span>
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-600">
              Clear All
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {[...Array(15)].map((_, index) => (
              <SearchItem 
                key={index}
                username={username || 'username'}
                fullName={fullName || 'Full Name'}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
