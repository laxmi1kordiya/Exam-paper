import React from "react";
import {plans} from "../Assets/Mocks/price.mock";
import SectionWrapper from "./SectionWrapper";


const Price = () => {
  
    return (
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Pricing Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {plans.map((plan, index) => (
            <div key={index} className={`p-6 rounded-xl shadow-md ${plan.bgColor}`}>
              <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
              <p className="text-4xl font-bold text-purple-800">{plan.price}</p>
              <p className="text-gray-600 mb-2">{plan.duration}</p>
              <hr className="my-2" />
              <p className="font-semibold">{plan.credits}</p>
              <p className="text-gray-600">{plan.points}</p>
              <p className="text-gray-600">{plan.extraPoints}</p>
              <p className="text-gray-600 mb-4">{plan.extraDays}</p>
              <button className="mt-4 px-6 py-2 border-2 border-purple-800 text-purple-800 font-bold rounded-lg hover:bg-purple-800 hover:text-white transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SectionWrapper(Price,"price");
  