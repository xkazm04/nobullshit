import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="w-[393px] h-[852px] relative mobile-body rounded-[40px]">
        <div className="left-[178px] top-[22px] absolute text-white text-sm font-normal font-['Roboto'] capitalize tracking-wide">Stepper</div>
        <div className="left-[103px] top-[354px] absolute text-white text-sm font-normal font-['Roboto'] capitalize tracking-wide">No more bullshit<br />No more excuses<br />Your turn</div>
        <div className="w-[221.05px] h-7 left-[67px] top-[316px] absolute">
        </div>
      </div>
    </main>
  )
}
