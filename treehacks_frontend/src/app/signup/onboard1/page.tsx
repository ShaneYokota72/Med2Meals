"use client"
import React, { useState } from 'react'

export default function page() {
    interface CuisineState {
        american: boolean;
        chinese: boolean; 
        french: boolean;
        indian: boolean;
        italian: boolean;
        japanese: boolean;
        korean: boolean;
        mexican: boolean;
        thai: boolean;
        vietnamese: boolean;
    }

    const [cuisines, setCuisines] = useState<CuisineState>({
        american: false,
        chinese: false, 
        french: false,
        indian: false,
        italian: false,
        japanese: false,
        korean: false,
        mexican: false,
        thai: false,
        vietnamese: false    
    });
      
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const cuisine = e.target.value as keyof CuisineState;
        
        setCuisines(prevState => ({
            ...prevState, 
            [cuisine]: !prevState[cuisine] 
        }));
    }

    function handleClick(){
        // console.log(cuisines);
        // if response is 200, redirect to /signup/onboard2
        
    }

  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]'>
        <h1 className='text-6xl font-bold text-white mt-32'>Treehacks</h1>
        <h3 className='text-3xl font-bold text-white mt-28 text-center'>What is your favorite cuisine?</h3>
        <div className='flex flex-col gap-8 w-full items-center mt-12 [&_input]:mr-4 bg-[#33333340] p-6 rounded-lg'>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='checkbox' id='american' value='american' onChange={handleChange}/>
                    <label htmlFor="american">🇺🇸 American</label>
                </div>
                <div className='w-36'>
                    <input type='checkbox' id='chinese' value='chinese' onChange={handleChange}/>
                    <label htmlFor="chinese">🇨🇳 Chinese</label><br></br>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='checkbox' id='french' value='french' onChange={handleChange}/>
                    <label htmlFor='French'>🇫🇷 French</label>
                </div>
                <div className='w-36'>
                    <input type='checkbox' id='indian' value='indian' onChange={handleChange}/>
                    <label htmlFor='Indian'>🇮🇳 Indian</label><br></br>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='checkbox' id='italian' value='italian' onChange={handleChange}/>
                    <label htmlFor='Italian'>🇮🇹 Italian</label>
                </div>
                <div className='w-36'>
                    <input type='checkbox' id='japanese' value='japanese' onChange={handleChange}/>
                    <label htmlFor='Japanese'>🇯🇵 Japanese</label><br></br>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='checkbox' id='korean' value='korean' onChange={handleChange}/>
                    <label htmlFor='Korean'>🇰🇷 Korean</label>
                </div>
                <div className='w-36'>
                    <input type='checkbox' id='mexican' value='mexican' onChange={handleChange}/>
                    <label htmlFor='Mexican'>🇲🇽 Mexican</label><br></br>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='checkbox' id='thai' value='thai' onChange={handleChange}/>
                    <label htmlFor='Thai'>🇹🇭 Thai</label>
                </div>
                <div className='w-36'>
                    <input type='checkbox' id='vietnamese' value='vietnamese' onChange={handleChange}/>
                    <label htmlFor='Vietnamese'>🇻🇳 Vietnamese</label><br></br>
                </div>
            </div>
        </div>
        <button className='w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center mt-8' onClick={handleClick}>Next</button>
    </div>
  )
}
