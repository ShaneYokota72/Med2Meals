"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    async function login(){

        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({username, password})
        // })
        // const data = await response.json()
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({email, password})
        });

        if(response.ok){
            // link to dashboard?email:<email> encode the url
            // const encodedEmail = encodeURIComponent(email) 
            localStorage.setItem("email", email);
            router.push(`/dashboard`);
        } else {
            alert("login credential wrong")
        }
    }

    return (
        <div>
            <div className="flex min-h-screen flex-col items-center justify-around bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]">
                {/* <h1 className="text-6xl font-bold text-white">Treehacks</h1> */}
                <Image src="/Logo.png" alt='logo' width={200} height={200} className='w-10/12 h-auto'/>
                <div className="flex flex-col gap-8 items-center">
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#252937e0] px-8 py-4 text-white text-xl rounded-lg text-center" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#252937e0] px-8 py-4 text-white text-xl rounded-lg text-center" />
                    <button className="w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}
