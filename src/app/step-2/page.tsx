'use client'
import React, { useState } from "react";
import NumericKeypad from "../components/NumericKeypad";



export default function Page() {
    const [userCode, setUserCode] = useState('');
  
    const handleCodeChange = (newCode) => {
      setUserCode(newCode);
    };

  return (
    <div className='w-full h-screen flex flex-col py-12 px-16'>
      <h1 className='uppercase text-[4.5rem] font-sans font-light text-black text-center leading-none'>INSERT PRODUCT CODE AND BUY</h1>
      <p className='uppercase text-[2rem] leading-none font-sans font-light text-black text-center mt-10'>EVERY PRODUCT IN THIS WINDOW HAS AN ID CODE: CHECK IT AND TYPE IT.</p>
      <div className="px-28 mt-16">
            
        <NumericKeypad onCodeChange={handleCodeChange} className=''/>

        {/* <p>Codice inserito: {userCode}</p> */}
        <div className="flex justify-center mt-16">
            <button className="text-white uppercase leading-none rounded-[0.5rem] bg-violet-100 text-[3.625rem] font-light font-sans py-4 px-6 min-w-[16rem]">Go</button>
        </div>
      </div>
    </div>
  )
}
  

