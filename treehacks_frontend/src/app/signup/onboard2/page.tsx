"use client"
import React, { useState } from 'react'

export default function page() {
    type Restriction = 'vegan' | 'vegetarian' | 'glutenFree' | 'dairyFree' | '';
    const [restriction, setRestriction] = useState<Restriction>(''); // ['vegan', 'vegetarian', 'glutenFree', 'dairyFree'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRestriction(e.target.value as Restriction);
    }

    const handleClick = () => {
        console.log(restriction);
        // make api call
        // if 200, redirect to /signup/onboard3
    }

  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]'>
        <h1 className='text-6xl font-bold text-white mt-32'>Treehacks</h1>
        <h3 className='text-3xl font-bold text-white mt-28 text-center'>What is your dietry restriction?</h3>
        <div className='flex flex-col gap-8 w-full items-center mt-12 [&_input]:mr-4 bg-[#33333340] p-6 rounded-lg'>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='radio' id='vegan' name='restriction' value='vegan' onChange={handleChange}/>
                    <label htmlFor="vegan">Vegan</label>
                </div>
                <div className='w-36'>
                    <input type='radio' id='vegetarian' name='restriction' value='vegetarian' onChange={handleChange}/>
                    <label htmlFor="vegetarian">Vegetarian</label><br></br>
                </div>
            </div>
            <div className='flex gap-8'>
                <div className='w-36'>
                    <input type='radio' id='glutenFree' name='restriction' value='glutenFree' onChange={handleChange}/>
                    <label htmlFor="glutenFree">Gluten Free</label>
                </div>
                <div className='w-36'>
                    <input type='radio' id='dairyFree' name='restriction' value='dairyFree' onChange={handleChange}/>
                    <label htmlFor="dairyFree">Dairy Free</label><br></br>
                </div>
            </div>
            <div>
                <input type='radio' id='none' name='restriction' value='' onChange={handleChange}/>
                <label htmlFor="none">None</label>
            </div>
        </div>
        <button className='w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center mt-8' onClick={handleClick}>Next</button>
    </div>
  )
}
