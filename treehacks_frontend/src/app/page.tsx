import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-gradient-to-r from-[#FFC371] to-[#FF5F6D]">
      <Image src="/Logo.png" alt='logo' width={200} height={200} className='w-10/12 h-auto'/>
      <div className="flex flex-col gap-8">
        <Link href="/login" className="bg-[#252937] px-8 py-4 text-white text-xl rounded-lg text-center">Login</Link>
        <Link href="/signup" className="bg-[#252937] px-8 py-4 text-white text-xl rounded-lg text-center">Sign Up</Link>
      </div>
    </main>
  );
}
