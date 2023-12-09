import { useState } from 'react'
import Goal from './Goal';


const Goals = ({ selected, type }) => {
    const [goals, setGoals] = useState([
        { id: 1, name: 'Goal 1', category: 'Category 1', completed: true},
        { id: 2, name: 'Goal 2', category: 'Category 2', completed: false},
    ]);

    return (
        <div className='flex flex-col relative'>
            <div className="text-main font-semibold flex flex-row justify-center my-8">{type}</div>

            {goals.map((goal, index) => (
                <Goal id={goal.id} key={goal.id} name={goal.name} category={goal.category} completed={goal.completed}/>
            ))}
        </div>
    );
}

export default Goals;