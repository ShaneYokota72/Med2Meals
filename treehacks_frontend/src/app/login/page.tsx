"use client";
import React, { useState } from 'react'

export default function page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <div className="flex min-h-screen flex-col items-center justify-around bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]">
                <h1 className="text-6xl font-bold text-white">Treehacks</h1>
                <div className="flex flex-col gap-8 items-center">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-[#252937e0] px-8 py-4 text-white text-xl rounded-lg text-center" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#252937e0] px-8 py-4 text-white text-xl rounded-lg text-center" />
                    <button className="w-2/3 bg-[#252937] px-6 py-2 text-white text-xl rounded-lg text-center">Login</button>
                </div>
            </div>
        </div>
    )
}
