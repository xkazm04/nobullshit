import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import NoFound from "./components/typography/NoFound";
import Image from "next/image";
import fap from "./assets/fap.png"

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-between items-center w-full h-full">
        <div className='absolute z-10 w-full'><Header /></div>   
        <div className="flex flex-col justify-center h-full">
            <NoFound
                title="Seems like someone procrastinated when needed..."
                description="Error was reported, now it's my turn :)"
                picture={<Image src={fap} alt="fap" width={300} height={300} />}
            />
        </div>
        <div className='z-10 w-full'><BottomNav /></div>
        </div>
    );
}

export default PageNotFound;