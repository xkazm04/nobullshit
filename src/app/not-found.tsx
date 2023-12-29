import Header from "./components/Header";
import NoFound from "./components/typography/NoFound";
import Image from "next/image";
import fap from "./assets/fap.png"

const PageNotFound = () => {
    return (
        <div className="page">
            <div className='absolute z-10 w-full'><Header /></div>   
            <div className="flex flex-col justify-center h-full">
                <NoFound
                    title="Sorry, I fucked up..."
                    description="Error was reported, my turn to fix :)"
                    picture={<Image src={fap} alt="fap" width={300} height={300} />}
                />
            </div>
        </div>
    );
}

export default PageNotFound;