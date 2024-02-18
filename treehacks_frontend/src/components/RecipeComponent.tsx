import React from 'react'
import Image from 'next/image'
import { Recipe } from '../util/RecipeType'

interface RecipeComponentProps extends Recipe{
    index: number;
    type: "user" | "chef"
}

const recipe = {
  id: 1,
  name: "Chicken Alfredo",
  userId: 1,
  descriotion: "creamy Chicken Alfredo",
  imageLink: "https://www.simplyrecipes.com/thmb/5b6b0cK1Hw8Rd7vVw7g3Y7J8zV8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chicken-Fettuccine-Alfredo-LEAD-1-6c8a2c7f6c5b4e2b8f3e0d2d3e6d2d3e.jpg",
  isDelivered: false,
  compenstation: 20,
  ingredients: "1 lb fettuccine\n1/2 cup unsalted butter\n1 cup heavy cream\n1 cup grated parmesan cheese\n1/2 tsp salt\n1/4 tsp black pepper\n2 cups cooked chicken",
  reciepe: "1)Chicken Alfredo\n 2)dothis\n 3)dothis\n",
  user: {
    name: "chef1",
  }

}

export default function RecipeComponent({
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
  index,
  type
}: RecipeComponentProps) {
  const [open, setOpen] = React.useState(false)

  const ingredientsList = ingredients.split("\n");
  const reciepeList = reciepe.split("\n");

  return (
    <div key={index} className='flex p-8 flex-col gap-4 w-full bg-slate-200 rounded-lg' onClick={() => {setOpen(!open)}}>
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
                        {ingredientsList.map((ingredient, index) => (
                          <div className='flex gap-4'>
                            <span>{index+1}. </span><li key={index}>{ingredient}</li>
                          </div>
                        ))}
                    </ul>
                    <h3 className='text-2xl font-bold text-[#3e3e3e]'>Instructions</h3>
                    <ol className='text-[#3e3e3e]'>
                        {reciepeList.map((instruction, index) => (
                          <div className='flex gap-4'>
                            <span>{index+1}. </span><li key={index}>{instruction}</li>
                          </div>
                        ))}
                    </ol>
                    {
                      type === "user" && (
                        <div className='mt-4 font-medium text-center w-full py-2 px-4 bg-green-300 text-xl' onClick={(e) => {
                          e.stopPropagation();
                          console.log("ask chef");
                        }}>
                          Ask for Chefs to help you cook this recipe
                        </div>
                      )
                    }
                    
                </div>
            )
        }
        {
          type === "chef" && (
            <>
              <h5>User: {user.name}</h5>
              <h5>Compensation: ${compensation}</h5>
              <div className='mt-4 font-medium text-center w-full py-2 px-4 bg-green-300 text-xl' onClick={(e) => {
                e.stopPropagation();
                console.log("help cook chef");
              }}>
                Help User cook this recipe
              </div>
            </>
          )
        }
    </div>
  )
}
