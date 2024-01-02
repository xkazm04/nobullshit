'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingAnim from "./components/LoadingAnim";
import useGetUser from "./lib/hooks/useGetUser";



export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const isUserIdentified = useGetUser()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      if (isUserIdentified) {
        router.push('/daily')
      } else {
        router.push('/intro')
      }
    }, 500)
  }, [router]);

  return (
    <div className="flex flex-col h-full w-full">
        {loading && <LoadingAnim />}
    </div>
  )
}
