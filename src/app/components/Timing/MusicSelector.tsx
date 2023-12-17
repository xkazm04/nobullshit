import { useEffect, useState } from "react";
import { DialogClose } from "../ui/dialog";
import { PlayCircleIcon } from "lucide-react";

const recommendedExamples = [{
    id: 1,
    name: 'Focus',
    description: 'Focus on your work',
    link: 'https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy?si=8e9e9e9e9e9e9e9e',
},
    {
        id: 2,
        name: 'Chill',
        description: 'Chill out',
        link: 'https://open.spotify.com/playlist/37i9dQZF1DX7ZUug1ANKRP?si=8e9e9e9e9e9e9e9e',
    },
    {
        id: 3,
        name: 'Workout',
        description: 'Workout',
        link: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP?si=8e9e9e9e9e9e9e9e',
    },
    {
        id: 4,
        name: 'Study',
        description: 'Study',
        link: 'https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6?si=8e9e9e9e9e9e9e9e',
    },
    {
        id: 5,
        name: 'Sleep',
        description: 'Sleep',
        link: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp?si=8e9e9e9e9e9e9e9e',
    }
]

const MusicSelector = () => {
    useEffect(() => {
        console.log('MusicSelector loaded')
    }, [])
    const [description, setDescription] = useState('' as string)
    const [link, setLink] = useState('' as string)

    const changeDescription = ({description, link}) => {
        setDescription(description)
        setLink(link)
        // use animate
    }
    
    return (
        <div className="flex flex-col justify-center items-center w-full py-10">
                <div className="flex flex-row justify-between w-full gap-10">
                    <div className="flex flex-col justify-center gap-2">
                        <div>Pick mood</div>
                        {recommendedExamples.map((p) => {
                            return <div 
                                    key={p.id} 
                                    className="items-left title-menu px-3 py-2 w-[100px] bg-purple-800/10 rounded-xl"
                                    onClick={() => {changeDescription({description: p.description, link: p.link})}}>
                                {p.name}
                            </div>
                            })}
                    </div>
                    <div className="flex flex-col justify-start gap-2 w-full relative">
                        <div className="flex flex-row justify-start">
                            <div className="">Description</div>
                        </div>
                        <div className="text-xs">{description}</div>
                        <DialogClose>
                            <div className="absolute bottom-0 right-5">
                                <a href={link} target="_blank" rel="noreferrer"><PlayCircleIcon size={30} strokeWidth={1.2} /></a>
                            </div>
                        </DialogClose>
                    </div>
                </div>
        </div>
    );
}

export default MusicSelector;