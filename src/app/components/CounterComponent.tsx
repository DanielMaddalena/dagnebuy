'use client'
import React, { useState, useEffect } from "react";

const CounterComponent = ({ stockLevel, quantity, setQuantity, showAvailability }) => {
  const [localQuantity, setLocalQuantity] = useState(
    Math.min(quantity, stockLevel || Infinity)
  );

  // Aggiorna la quantità locale quando le props cambiano
  useEffect(() => {
    setLocalQuantity(Math.min(quantity, stockLevel || Infinity));
  }, [quantity, stockLevel]);

  const aumenta = () => {
    if (stockLevel !== null && localQuantity >= stockLevel) {
      return; // Non incrementa se raggiunge lo stock massimo
    }
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    setQuantity(newQuantity); // Aggiorna la quantità nel carrello
  };

  const diminuisci = () => {
    if (localQuantity <= 1) {
      return; // Non decrementa sotto 1
    }
    const newQuantity = localQuantity - 1;
    setLocalQuantity(newQuantity);
    setQuantity(newQuantity); // Aggiorna la quantità nel carrello
  };

  return (
    <div className="flex flex-col items-start">
      {showAvailability && (
        stockLevel !== null ? (
          <p className="text-[0.875rem]">Disponibilità: {stockLevel}</p>
        ) : (
          <p className="text-[0.875rem]">
            Seleziona le opzioni per vedere la disponibilità
          </p>
        )
      )}
      <div className="flex flex-wrap items-center space-x-5 text-[2.5rem] leading-none font-sans font-light mt-3">
        <button
          className="inline-flex items-center"
          disabled={localQuantity <= 1}
          onClick={diminuisci}
        >
          -
        </button>
        <h3 className="text-[1.75rem]">{localQuantity}</h3>
        <button
          className="inline-flex items-center"
          disabled={stockLevel === null || localQuantity >= stockLevel}
          onClick={aumenta}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;
