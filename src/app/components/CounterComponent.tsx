'use client'
import React, { useState } from "react";

const CounterComponent = () => {
  const [contatore,setContatore] =useState(0);

  const aumenta = () => {
    setContatore((oldValue) => {
      return oldValue + 1;
    });
  }
  const diminuisci = () => {
    setContatore((oldValue) => {
        if(oldValue - 1 === -1 ) {
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
        <h3 className="text-[3.25rem]">{contatore}</h3>
        <button className="inline-flex items-center" onClick={aumenta}>
          +
        </button>
    </div>
  );
};

export default CounterComponent;