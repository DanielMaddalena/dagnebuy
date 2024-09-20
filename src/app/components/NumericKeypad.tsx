'use client'
import classNames from "classnames";
import React, { useCallback, useState } from "react";

function NumericKeypad({ onCodeChange , className }) {
  const [code, setCode] = useState('');

  const handleButtonClick = useCallback((number) => {
    setCode((prevCode) => prevCode + number);
    onCodeChange(code + number); // Aggiorna il componente genitore con il nuovo codice
  },[code,onCodeChange])
  // funzione per cancellare un dato
  // const handleBackspace = useCallback(() => {
  //   const newCode = code.slice(0, -1);
  //   setCode(newCode);
  //   onCodeChange(newCode); // Aggiorna il componente genitore con il codice modificato
  // },[code,onCodeChange];
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "0", "B"];
  return (
    <div>
      <div className={classNames({
        'grid grid-cols-3' : true,
        [className!] : !!className
      })}>
        {keys.map((key) => (
          <button className="uppercase text-[4.5rem] font-sans font-light text-black text-center" key={key} onClick={() => handleButtonClick(key)}>
            {key}
          </button>
        ))}
      </div>
      {/* <button onClick={handleBackspace}>Cancella</button> */}
    </div>
  );
}

export default NumericKeypad;