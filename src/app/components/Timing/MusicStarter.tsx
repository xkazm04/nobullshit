import { DialogTrigger } from "../ui/dialog";
import { Music2Icon, YoutubeIcon } from "lucide-react";

const MusicStarter = () => {
    return  <DialogTrigger asChild><div className='flex flex-row mt-10 p-5 bg-red-900/10 rounded-2xl relative lg:cursor-pointer'>
    <div className='absolute bottom-3 right-3 opacity-40 animate-fadeIn'><Music2Icon size={10}/></div>
    <div className='absolute top-2 right-2 opacity-50 animate-fadeIn'><Music2Icon size={10}/></div>
    <div className='absolute top-4 left-2 opacity-40 animate-fadeIn'><Music2Icon size={10}/></div>
    <div className='absolute bottom-4 left-3 opacity-50 animate-fadeIn'><Music2Icon size={10}/></div>
  <button className='shadow-purple-500/70'><YoutubeIcon color='purple' strokeWidth={1.2} size={40}/></button>
</div>
</DialogTrigger>}

export default MusicStarter;