import React from 'react';
import { DetailsInfo } from '../assets/Details';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE & Edge */
            scrollbar-width: none;     /* Firefox */
          }
        `}
      </style>

      <div className="mt-8 overflow-x-auto hide-scrollbar px-4">
       
        
        {/* Heading */}

        {/* Cards */}
        <div className="flex justify-start lg:justify-center gap-6 min-w-max">
          {DetailsInfo.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <div
                key={index}
                onClick={() => navigate(`${item.path}`)}
                className="w-[240px] min-w-[240px] rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-black hover:ring-2 hover:ring-orange-300"
              >
                <div className={`h-[90px] flex items-center justify-center ${item.bgColor} transition-all duration-300 hover:brightness-110`}>
                  <IconComponent className={`text-4xl ${item.color}`} />
                </div>

                <div className="p-4 text-center">
                  <p className="font-semibold text-lg text-gray-700">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
