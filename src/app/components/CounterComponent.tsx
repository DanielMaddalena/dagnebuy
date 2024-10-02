'use client'
import React from "react";

const CounterComponent = ({ stockLevel, quantity, setQuantity, showAvailability }) => {
  const aumenta = () => {
    // Controlla se stockLevel è definito e se la quantità è minore dello stock disponibile
    if (stockLevel !== null && quantity >= stockLevel) {
      return; // Non incrementa se raggiunge lo stock massimo
    }
    setQuantity((oldValue) => oldValue + 1);
  };
  
  const diminuisci = () => {
    if (quantity <= 1) {
      return; // Non decrementa sotto 1
    }
    setQuantity((oldValue) => oldValue - 1);
  };
  
  return (
    <div className="flex flex-col items-start">
      {showAvailability && (
        stockLevel !== null ? (
          <p className="text-[0.875rem]">Disponibilità: {stockLevel}</p>
        ) : (
          <p className="text-[0.875rem]">Seleziona le opzioni per vedere la disponibilità</p>
        )
      )}
      <div className="flex flex-wrap items-center space-x-5 text-[2.5rem] leading-none font-sans font-light mt-3">
        <button
          className="inline-flex items-center"
          disabled={quantity <= 1}
          onClick={diminuisci}
        >
          -
        </button>
        <h3 className="text-[1.75rem]">{quantity}</h3>
        <button
          className="inline-flex items-center"
          disabled={stockLevel === null || quantity >= stockLevel}
          onClick={aumenta}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;
