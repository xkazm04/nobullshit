'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingAnim from "./components/LoadingAnim";


export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isUserIdentified = localStorage.getItem('user');
    setTimeout(() => {
      setLoading(false)
      if (isUserIdentified) {
        router.push('/intro')
      } else {
        router.push('/intro')
      }
    }, 2000)
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
        {loading && <LoadingAnim />}
    </div>
  )
}
