'use client';
import YouTube from "react-youtube"
import { useEffect } from "react";

type Props = {
    setCondition: (condition: boolean) => void
}
const IntroPromo = ({setCondition}: Props) => {
    const size = {
        height: '200',
        width: '320',
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 0
        },
      };

      useEffect(() => {
        setTimeout(() => {
            setCondition(true)
        }, 1000)
    }, [setCondition])
    
    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-20">
                <div className="typo-long">
                    You have decided to improve yourself in order to achieve path of happinness...your own, or others you care about
                </div>
                <div>
                    <YouTube videoId="7Gi0OEOl84Y" opts={size} />
                </div>
                <div className="typo-long">
                    Im here to help you motivate, track your effort and set goals step by step.
                </div>
        </div>
    )
}

export default IntroPromo