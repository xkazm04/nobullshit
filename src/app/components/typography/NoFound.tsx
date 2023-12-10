export type NoFoundType = {
    title: string,
    description: string,
    picture: any,
}

const NoFound = ({title, description, picture}: NoFoundType) => {
    return (
        <div className="flex flex-col justify-center items-center py-5 gap-2">
            <div>{picture}</div>
            <div className="font-bold font-['Inter'] capitalize tracking-wide text-xs pt-2">{title}</div>
            <div className="font-normal font-['Inter'] capitalize tracking-wide text-xs">{description}</div>
        </div>
    );
}

export default NoFound