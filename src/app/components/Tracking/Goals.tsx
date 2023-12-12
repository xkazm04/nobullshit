import { useState } from 'react'
import Goal from './Goal';
import NoFound from '../typography/NoFound';
import { IlustratedFire } from '../icons/illustrations';
import { Dialog, DialogTrigger } from '../ui/dialog';
import Modal from '../Modal';
import GoalNew from './GoalNew';



const Goals = ({ selected, type }) => {
    const [goals, setGoals] = useState([
        { id: 1, name: 'Goal 1', category: 'Category 1', completed: true},
        { id: 2, name: 'Goal 2', category: 'Category 2', completed: false},
    ]);

    const renderDialog = () => {
        return <Modal title={'Create a goal'} description={''} content={<GoalNew />} />
    }

    return (
        <div className='flex flex-col relative'>
            <Dialog>
                <div className="text-main font-semibold flex flex-row justify-center my-8 relative">
                    <div>{type}</div>
                    <div className="absolute right-0">
                        <DialogTrigger asChild>
                            <button className="btn-mini">+</button>
                        </DialogTrigger>
                    </div>
                </div>

                {goals && goals.length > 0 ? goals.map((goal) => (
                    <Goal id={goal.id} key={goal.id} name={goal.name} category={goal.category} completed={goal.completed}/>
                ))
                : <NoFound title={'No activities found'} description={'Add a new target to be better'} picture={<IlustratedFire/>}/>
                }
                {renderDialog()}
            </Dialog>
        </div>
    );
}

export default Goals;