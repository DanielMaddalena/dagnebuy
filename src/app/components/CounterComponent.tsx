'use client'
import React, { useState } from "react";

const CounterComponent = ({ stockLevel }) => {
  const [contatore, setContatore] = useState(1);

  const aumenta = () => {
    setContatore((oldValue) => {
      // Controlla se stockLevel è definito e se il contatore è minore dello stock disponibile
      if (stockLevel !== null && oldValue >= stockLevel) {
        return oldValue; // Non incrementa se raggiunge lo stock massimo
      }
      return oldValue + 1;
    });
  };
  
  const diminuisci = () => {
    setContatore((oldValue) => {
      if (oldValue - 1 === 0) {
        return oldValue; // Non decrementa sotto 1
      }
      return oldValue - 1;
    });
  };
  
  return (
    <div className="flex flex-col items-start">
      {stockLevel !== null ? (
        <p className="text-[1.75rem]">Disponibilità: {stockLevel}</p>
      ) : (
        <p className="text-[1.75rem]">Seleziona una variante per vedere la disponibilità</p>
      )}
      <div className="flex flex-wrap items-center space-x-5 text-[2.5rem] leading-none font-sans font-light mt-2">
        <button
          className="inline-flex items-center"
          disabled={contatore <= 1}
          onClick={diminuisci}
        >
          -
        </button>
        <h3 className="text-[1.75rem]">{contatore}</h3>
        <button
          className="inline-flex items-center"
          disabled={stockLevel === null || contatore >= stockLevel}
          onClick={aumenta}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;