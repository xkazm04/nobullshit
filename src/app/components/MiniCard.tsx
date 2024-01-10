type Props = {
    stat: any;
    title: string;
    subtitle: string;
}

const MiniCard = ({ stat, title, subtitle }: Props) => {
        return <div className='p-2 flex flex-col justify-center relative rounded-xl items-center w-[120px] h-[100px]
            shadow-md shadow-gray-950 from-gray-600/10 to-gray-600/20 bg-gradient-to-br
        '>
            <div className="font-bold text-sm">{stat}</div>
            <div className="typo-long text-xs">{title}</div>
            <div className="text-xs tracking-wider text-gray-500 capitalize leading-6 absolute top-0">{subtitle}</div>
        </div>
}

export default MiniCard