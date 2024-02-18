import clsx from 'clsx'
import React from 'react'

interface OrdersProps {
    chef: string | null,
    compensation: Number,
    isDelivered: boolean,
    recipe: {
        title: string,
        description: string,
        imageLink: string,
        ingredients: Array<string>,
        instructions: Array<string>
    },
    request_user: string,
    _id: string

}

export default function Orders({
    chef,
    compensation,
    isDelivered,
    recipe,
    request_user,
    _id
}:OrdersProps ) {

    const [open, setOpen] = React.useState(false)
    const [hide, setHide] = React.useState(false)

    const takeOrder = async () => {
        const response = await fetch('http://localhost:4000/issuecredential', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                orderID: _id,
                email: localStorage.getItem('email')
            })
        })

        if(response.ok){
            console.log("order received");
            setHide(true);
            alert("order taken!");
        }
    }

  return (
    <div key={_id} className={clsx('flex p-8 flex-col gap-4 w-full bg-slate-200 rounded-lg', {"hidden": hide})} onClick={() => {setOpen(!open)}}>
        <img src={recipe.imageLink} alt={recipe.title} width={500} height={300} className=' w-full height-auto rounded-lg mx-auto'/>
        <div className=''>
            <h2 className='text-3xl font-bold text-[#3e3e3e]'>{recipe.title}</h2>
            <p className='text-[#3e3e3e]'>{recipe.description}</p>
        </div>
        {
            open && (
                <div>
                    <h3 className='text-2xl font-bold text-[#3e3e3e]'>Ingredients</h3>
                    <ul className='text-[#3e3e3e]'>
                        {recipe.ingredients.map((ingredient:any, index:any) => (
                        <div className='flex gap-4'>
                            <span>{index+1}. </span><li key={index}>{ingredient}</li>
                        </div>
                        ))}
                    </ul>
                    <h3 className='text-2xl font-bold text-[#3e3e3e]'>Instructions</h3>
                    <ol className='text-[#3e3e3e]'>
                        {recipe.instructions.map((instruction:any, index:any) => (
                        <div className='flex gap-4'>
                            <span>{index+1}. </span><li key={index}>{instruction}</li>
                        </div>
                        ))}
                    </ol>
                    <div className='mt-4 font-medium text-center w-full py-2 px-4 bg-green-400 rounded-lg' onClick={(e) => {
                        e.stopPropagation();
                        console.log("ask chef");
                        takeOrder();
                    }}>
                        Take on this recipe for ${String(compensation)}😎
                    </div>
                </div>
            )
        }
    </div>
  )
}
