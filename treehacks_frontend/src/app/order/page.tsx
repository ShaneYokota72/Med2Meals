"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Recipe } from '@/util/RecipeType'
import RecipeComponent from '@/components/RecipeComponent'

export default function page() {
    const [recipes, setRecipes] = useState<Recipe[]>([/* 
        {
          id: 1,
          name: "Chicken Alfredo",
          userId: 1,
          isDelivered: false,
          compenstation: 20,
          reciepe: "Chicken Alfredo",
          user: {
            name: "chef1",
          }
        },
        {
          id: 1,
          name: "Chicken Alfredo",
          userId: 1,
          isDelivered: false,
          compenstation: 20,
          reciepe: "Chicken Alfredo",
          user: {
            name: "chef1",
          }
        },
       */])

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/order', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            
            })
            const data = await response.json()
            setRecipes(data)
        }
        fetchRecipes()
    }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#FFC371] to-[#FF5F6D] p-10 w-full">
        <Image src="/MiniLogo.png" alt='logo' width={200} height={200} className='w-1/4 h-auto'/>
        <div className='mt-8 flex flex-col'>
            <h1 className="text-xl font-bold text-white">Order Near You</h1>
            <div className='flex flex-col gap-4 mt-4'>
            {recipes.map((recipe, index) => (
                <RecipeComponent {...recipe} index={index} key={index} type='chef'/>
            ))}
            </div>
        </div>
    </div>
  )
}
