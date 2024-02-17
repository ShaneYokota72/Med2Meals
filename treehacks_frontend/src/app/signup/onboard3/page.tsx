"use client"
import React, { useState } from 'react'

export default function page() {
    const [proteinGoal, setProteinGoal] = useState('');
    const [calorieGoal, setCalorieGoal] = useState('');

    function handleClick() {
        console.log(proteinGoal, calorieGoal);
        // make api call
        // if 200, redirect to login
    }
    return (
        <div className='flex min-h-screen flex-col items-center bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]'>
            <h1 className='text-6xl font-bold text-white mt-32'>Treehacks</h1>
            <h3 className='text-3xl font-bold text-white mt-28 text-center'>What is your dietery goal?</h3>
            <div className='flex flex-col gap-8 w-full items-center mt-12 [&_input]:mr-4 bg-[#33333340] p-6 rounded-lg'>
                <div className='flex flex-col gap-8 w-10/12'>
                    <div>
                        <p>Protein Goal</p>
                        <input 
                            type="number"
                            placeholder="Grams of protein (optional)"
                            value={proteinGoal}
                            className='w-full'
                            onChange={(e) => setProteinGoal(e.target.value)}
                        />
                    </div>

                    <div>
                        <p>Calorie Goal/limit</p>
                        <input
                            type="number"
                            placeholder="Calorie amount (optional)" 
                            value={calorieGoal}
                            className='w-full'
                            onChange={(e) => setCalorieGoal(e.target.value)}  
                        />
                    </div>
                </div>
            </div>
            <button className='w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center mt-8' onClick={handleClick} >Next</button>
        </div>
    )
}
