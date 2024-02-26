import MiniCard from "../MiniCard"

type Props = {
    c: any[];
    setDetail: any;
}
const ChallengesDefault = ({c, setDetail}:Props) => {
  return <>
   <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {c.map((b: any) => <MiniCard key={b.id} title={b.title} stat={b.description} subtitle="" />)}
    </div>
</>
}
export default ChallengesDefault