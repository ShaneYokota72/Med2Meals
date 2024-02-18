import { Recipe } from '@/util/RecipeType';
import clsx from 'clsx';
import React from 'react'

const data = {
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
  
  }

export default function Recommendation({
    id,
    name,
    userId,
    description,
    imageLink,
    isDelivered,
    compensation,
    ingredients,
    reciepe,
    user,
}: Recipe) {
    async function orderRecipe() {
        const response = await fetch('http://localhost:4000/createorder', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                title: name, 
                description: description,
                ingredients: ingredients,
                instructions: reciepe,
                email: localStorage.getItem('email')
            })
        })

        if(response.ok){
            console.log("order placed");
            setHide(true);
            alert("order placed");
        } else {
            console.log("order failed");
            alert("order failed");
        }
    }

    const [hide, setHide] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    return (
        <div key={id} className={clsx('flex p-8 flex-col gap-4 w-full bg-slate-200 rounded-lg', {"hidden": hide})} onClick={() => {setOpen(!open)}}>
            <img src={imageLink} alt={name} width={500} height={300} className=' w-full height-auto rounded-lg mx-auto'/>
            <div className=''>
                <h2 className='text-3xl font-bold text-[#3e3e3e]'>{name}</h2>
                <p className='text-[#3e3e3e]'>{description}</p>
            </div>
            {
                open && (
                    <div>
                        <h3 className='text-2xl font-bold text-[#3e3e3e]'>Ingredients</h3>
                        <ul className='text-[#3e3e3e]'>
                            {ingredients.map((ingredient, index) => (
                            <div className='flex gap-4'>
                                <span>{index+1}. </span><li key={index}>{ingredient}</li>
                            </div>
                            ))}
                        </ul>
                        <h3 className='text-2xl font-bold text-[#3e3e3e]'>Instructions</h3>
                        <ol className='text-[#3e3e3e]'>
                            {reciepe.map((instruction, index) => (
                            <div className='flex gap-4'>
                                <span>{index+1}. </span><li key={index}>{instruction}</li>
                            </div>
                            ))}
                        </ol>
                        <div className='mt-4 font-medium text-center w-full py-2 px-4 bg-green-400 rounded-lg' onClick={(e) => {
                            e.stopPropagation();
                            console.log("ask chef");
                            orderRecipe();
                        }}>
                            Ask Chef to cook this recipe 👨‍🍳
                        </div>
                    </div>
                )
            }
        </div>
    )
}