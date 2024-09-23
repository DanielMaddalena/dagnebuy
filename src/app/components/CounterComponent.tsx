'use client'
import React, { useState } from "react";

const CounterComponent = () => {
  const [contatore,setContatore] =useState(1);

  const aumenta = () => {
    setContatore((oldValue) => {
      return oldValue + 1;
    });
  }
  const diminuisci = () => {
    setContatore((oldValue) => {
        if(oldValue - 1 === 0 ) {
            return oldValue;
        }
        return oldValue - 1;
    });
  }
  
  return (
    <div className="flex flex-wrap items-center space-x-5 text-[2.5rem] leading-none font-sans font-light">
        <button className="inline-flex items-center" onClick={diminuisci}>
          -
        </button>
        <h3 className="text-[1.75rem]">{contatore}</h3>
        <button className="inline-flex items-center" onClick={aumenta}>
          +
        </button>
    </div>
  );
};

export default CounterComponent;