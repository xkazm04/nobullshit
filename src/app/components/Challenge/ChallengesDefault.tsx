import MiniCard from "../MiniCard"
import Divider from "../animations/Divider"

type Props = {
    c: any;
    setDetail: any;
}
const ChallengesDefault = ({c, setDetail}:Props) => {
  return <>
   <div className="grid grid-cols-3 gap-3 my-2">
        {c.map(b => <MiniCard key={b.id} title={b.title} stat={b.description} />)}
    </div>
</>
}
export default ChallengesDefault