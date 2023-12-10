
import GoalRecommendation from '@/app/components/Tracking/GoalRecommendation';
const Page = ({params}) => {

    return (
        <div>
          <p>Post: {params.id}</p>
          <GoalRecommendation id={params.id}/>
        </div>
      );
}

export default Page;