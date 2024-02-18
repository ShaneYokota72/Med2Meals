"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { Recipe } from '@/util/RecipeType'
import RecipeComponent from '@/components/RecipeComponent'

export default function page() {
    const [recipes, setRecipes] = useState<Recipe[]>([
        {
          title: "Spaghetti",
          description: "A classic Italian dish",
          //imageLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fcooking%2Frecipe-ideas%2Fa53695%2Fone-pot-chicken-alfredo-recipe%2F&psig=AOvVaw0RFLZ8JgaHgklrkq3CPjLR&ust=1708316824940000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDm-52GtIQDFQAAAAAdAAAAABAD",
          imageLink: "/Logo.png",
          ingredients: ["spaghetti", "tomato sauce", "ground beef", "onion", "garlic"],
          instructions: ["Boil water", "Cook spaghetti", "Cook beef and onion", "Combine"]
        },
        {
          title: "Chicken Alfredo",
          description: "A creamy pasta dish",
          //imageLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fcooking%2Frecipe-ideas%2Fa53695%2Fone-pot-chicken-alfredo-recipe%2F&psig=AOvVaw0RFLZ8JgaHgklrkq3CPjLR&ust=1708316824940000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDm-52GtIQDFQAAAAAdAAAAABAD",
          imageLink: "/Logo.png",
          ingredients: ["fettucine", "chicken", "butter", "heavy cream", "parmesan"],
          instructions: ["Boil water", "Cook pasta", "Cook chicken", "Combine"]
        }])

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
