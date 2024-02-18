"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Recipe } from '@/util/RecipeType'
import RecipeComponent from '@/components/RecipeComponent'

export default function page() {
    const [recipes, setRecipes] = useState<Recipe[]>([
      // {
      //   id: 1,
      //   name: "Chicken Alfredo",
      //   userId: 1,
      //   description: "creamy Chicken Alfredo",
      //   imageLink: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
      //   isDelivered: false,
      //   compenstation: 20,
      //   ingredients: "1 lb fettuccine\n1/2 cup unsalted butter\n1 cup heavy cream\n1 cup grated parmesan cheese\n1/2 tsp salt\n1/4 tsp black pepper\n2 cups cooked chicken",
      //   reciepe: "1)Chicken Alfredo\n 2)dothis\n 3)dothis\n",
      //   user: {
      //     name: "chef1",
      //   }
      
      // },
      // {
      //   id: 1,
      //   name: "Chicken Alfredo",
      //   userId: 1,
      //   description: "creamy Chicken Alfredo",
      //   imageLink: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
      //   isDelivered: false,
      //   compenstation: 20,
      //   ingredients: "1 lb fettuccine\n1/2 cup unsalted butter\n1 cup heavy cream\n1 cup grated parmesan cheese\n1/2 tsp salt\n1/4 tsp black pepper\n2 cups cooked chicken",
      //   reciepe: "1)Chicken Alfredo\n 2)dothis\n 3)dothis\n",
      //   user: {
      //     name: "chef1",
      //   }
      
      // }
      ])

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
