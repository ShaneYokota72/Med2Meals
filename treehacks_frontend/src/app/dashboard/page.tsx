"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Recipe } from '../../util/RecipeType';
import clsx from 'clsx';
import Recommendation from '@/components/Recommendation';
import Orders from '@/components/Orders';


export default function page() {
  const email = localStorage?.getItem('email')
  const [type, setType] = useState<"user" | "chef">("user")
  const [recipes, setRecipes] = useState<Recipe[]>([
    /* {
      id: 1,
      name: "Chicken Alfredo",
      userId: 1,
      description: "creamy Chicken Alfredo",
      imageLink: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
      isDelivered: false,
      compensation: 20,
      ingredients: "1 lb fettuccine\n1/2 cup unsalted butter\n1 cup heavy cream\n1 cup grated parmesan cheese\n1/2 tsp salt\n1/4 tsp black pepper\n2 cups cooked chicken",
      reciepe: "1)Chicken Alfredo\n 2)dothis\n 3)dothis\n",
      user: {
        name: "chef1",
      }
    
    },
    {
      id: 1,
      name: "Chicken Alfredo",
      userId: 1,
      description: "creamy Chicken Alfredo",
      imageLink: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
      isDelivered: false,
      compensation: 20,
      ingredients: "1 lb fettuccine\n1/2 cup unsalted butter\n1 cup heavy cream\n1 cup grated parmesan cheese\n1/2 tsp salt\n1/4 tsp black pepper\n2 cups cooked chicken",
      reciepe: "1)Chicken Alfredo\n 2)dothis\n 3)dothis\n",
      user: {
        name: "chef1",
      }
    
    } */
  ])
  const [orderlist, setOrderlist] = useState([])

  const [spin, setSpin] = useState(false)
  function search () {
    setSpin(true)
    setTimeout(() => {
      setSpin(false)
    }, 1000)
    /* loading time for geting recipe data */
    setSpin(false)
  }

  useEffect(() => {
    // call llm endpoint
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:4000/orders', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      const data = await response.json()
      setOrderlist(data)
      console.log(data)
    }

    const fetchRecipes = async () => {
      /* 
        LLM endpoint
      */
      // const response = await fetch('http://localhost:4000/recipes', {
      //   method: 'GET',
      //   headers: {'Content-Type': 'application/json'},
      // })
      // const data = await response.json()
      // setRecipes(data)

      setRecipes([
        {
          id: 1,
          name: "Chicken Alfredo",
          userId: 1,
          description: "creamy Chicken Alfredo",
          imageLink: "https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-bowl.jpg",
          isDelivered: false,
          compensation: 20,
          ingredients: ["ingredients 1 do this", "ingredients 2 do this", "ingredients 3 do this"],
          reciepe: ["step1", "step2", "step3"],
          user: {
            name: "chef1",
          }
        },
        {
          id: 1,
          name: "Lentil Soup",
          userId: 1,
          description: "Delicious Lentil Soup",
          imageLink: "https://cookieandkate.com/images/2019/01/best-lentil-soup-recipe-4.jpg",
          isDelivered: false,
          compensation: 20,
          ingredients: ["ingredients 1 do this", "ingredients 2 do this", "ingredients 3 do this"],
          reciepe: ["step1", "step2", "step3"],
          user: {
            name: "chef1",
          }
        
        }
      ])
    }

    if(type === "chef"){
      fetchOrders()
    } else if(type === "user"){
      fetchRecipes()
    }
  }, [type])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#FFC371] to-[#FF5F6D] p-10 w-full">
      <div>
        <Image src="/MiniLogo.png" alt='logo' width={200} height={200} className='w-1/4 h-auto'/>
        <div className='flex gap-4 mt-4 w-full'>
          <input type="text" placeholder="Look up pills" className="bg-[#25293780] px-8 py-4 text-white text-xl rounded-lg text-center w-3/4"/>
          <Image src="/Pill.png" alt='search' width={50} height={50} className={clsx('aspect-square w-16 h-16 hover:scale-105', {"animate-spin": spin})} onClick={() => {search}}/>
        </div>
      </div>
      <div className='flex gap-4 py-4'>
        <p className='px-4 py-2 bg-green-300 rounded-md hover:scale-105' onClick={() => {setType("chef")}}>Be a chef</p>
        <p className='px-4 py-2 bg-green-300 rounded-md hover:scale-105' onClick={() => {setType("user")}}>Get a chef</p>
      </div>
      {
        type === "chef" && (
          <div className='mt-8 flex flex-col'>
            <h1 className="text-xl font-bold text-white">Orders Near You 🍳</h1>
            <div className='flex flex-col gap-4 mt-4'>
              {orderlist.map((order:any, index) => (
                <Orders chef={order.chef} compensation={order.compensation} isDelivered={order.isDelivered} recipe={order.recipe} request_user={order.request_user} _id={order._id} />
              ))}
            </div>
          </div>
        )
      }
      {
        type === "user" && (
          <div className='mt-8 flex flex-col'>
            <h1 className="text-xl font-bold text-white">Recipes Results</h1>
            <div className='flex flex-col gap-4 mt-4'>
              {recipes.map((recipe, index) => (
                <Recommendation {...recipe} key={index}/>
              ))}
            </div>
          </div>
        )
      }
      

    </div>
  )
}
