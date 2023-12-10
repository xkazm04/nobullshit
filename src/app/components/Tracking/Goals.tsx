import { useState } from 'react'
import Goal from './Goal';
import NoFound from '../typography/NoFound';
import { IlustratedFire } from '../icons/illustrations';
import { useRouter } from 'next/navigation';


const Goals = ({ selected, type }) => {
    const [goals, setGoals] = useState([
        { id: 1, name: 'Goal 1', category: 'Category 1', completed: true},
        { id: 2, name: 'Goal 2', category: 'Category 2', completed: false},
    ]);

    const Router = useRouter()
    const addGoal = () => {
        Router.push('/create')
    }

    return (
        <div className='flex flex-col relative'>
            <div className="text-main font-semibold flex flex-row justify-center my-8 relative">
                <div>{type}</div>
                <div className="absolute right-0">
                    <button className="btn-mini"
                        onClick={addGoal}
                    >+</button>
                </div>
            </div>

            {goals && goals.length > 0 ? goals.map((goal) => (
                <Goal id={goal.id} key={goal.id} name={goal.name} category={goal.category} completed={goal.completed}/>
            ))
            : <NoFound title={'No activities found'} description={'Add a new target to be better'} picture={<IlustratedFire/>}/>
            }
            <NoFound title={'No activities found'} description={'Add a new target to be better'} picture={<IlustratedFire/>}/>
        </div>
    );
}

export default Goals;