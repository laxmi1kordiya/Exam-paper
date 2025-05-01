import React from "react";
import {features} from "../Assets/Mocks/features.mock";
import SectionWrapper from "./SectionWrapper";
  
const ServiceCard = ({ title, icon }) => {
    return (
      <Tilt className='xs:w-[250px] w-full'>
        <div className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
          <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
            <img
              src={icon}
              alt={title}
              className='w-16 h-16 object-contain'
            />
            <h3 className='text-white text-[20px] font-bold text-center'>
              {title}
            </h3>
          </div>
        </div>
      </Tilt>
    );
  };

  const Features = () => {
    return (
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Amazing Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-md ${feature.bgColor}`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default SectionWrapper(Features, "features");
