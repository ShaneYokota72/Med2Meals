"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import { Recipe } from '../../util/RecipeType';
import RecipeComponent from '@/components/RecipeComponent';
import clsx from 'clsx';

export default function page() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      title: "Spaghetti",
      description: "A classic Italian dish",
      imageLink: "https://media.istockphoto.com/id/884287870/photo/grilled-chicken-alfredo.jpg?s=612x612&w=0&k=20&c=n0-f0Ex74UaL8dlTyYuw24H4MWZi3GysAbumvQzV4p4=",
      // imageLink: "/Logo.png",
      ingredients: ["spaghetti", "tomato sauce", "ground beef", "onion", "garlic"],
      instructions: ["Boil water", "Cook spaghetti", "Cook beef and onion", "Combine"]
    },
    {
      title: "Chicken Alfredo",
      description: "A creamy pasta dish",
      imageLink: "https://plus.unsplash.com/premium_photo-1671547330493-b07d377085ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHx8MHx8fDA%3D",
      // imageLink: "/Logo.png",
      ingredients: ["fettucine", "chicken", "butter", "heavy cream", "parmesan"],
      instructions: ["Boil water", "Cook pasta", "Cook chicken", "Combine"]
    }
  ])

  const [spin, setSpin] = useState(false)
  function search () {
    setSpin(true)
    setTimeout(() => {
      setSpin(false)
    }, 1000)
    /* loading time for geting recipe data */
    setSpin(false)
  }


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#FFC371] to-[#FF5F6D] p-10 w-full">
      <div>
        <Image src="/MiniLogo.png" alt='logo' width={200} height={200} className='w-1/4 h-auto'/>
        <div className='flex gap-4 mt-4 w-full'>
          <input type="text" placeholder="Search for recipes" className="bg-[#25293780] px-8 py-4 text-white text-xl rounded-lg text-center w-3/4"/>
          <Image src="/Pill.png" alt='search' width={50} height={50} className={clsx('aspect-square w-16 h-16 hover:scale-105', {"animate-spin": spin})} onClick={() => {search}}/>
        </div>
      </div>

      <div className='mt-8 flex flex-col'>
        <h1 className="text-xl font-bold text-white">Recipes Results</h1>
        <div className='flex flex-col gap-4 mt-4'>
          {recipes.map((recipe, index) => (
            <RecipeComponent {...recipe} index={index} key={index} type='user'/>
          ))}
        </div>
      </div>

    </div>
  )
}
