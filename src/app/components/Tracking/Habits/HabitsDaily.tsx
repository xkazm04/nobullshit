
import Habit from './Habit';
import NoFound from '../../typography/NoFound';
import { IlustratedFire } from '../../icons/illustrations';
import { Dialog, DialogTrigger } from '../../ui/dialog';
import Modal from '../../Modal';
import HabitNew from './HabitNew';
import { HabitType } from '@/app/types/TrackerTypes';

const HabitsDaily = ({habits }) => {
    const renderDialog = () => {
        return <Modal title={'Create a goal'} description={''} content={<HabitNew setFn={undefined} />} />
    }

    return (
        <div className='flex flex-col relative'>
            <Dialog>
                <div className="text-main font-semibold flex flex-row justify-center my-8 relative ">
                    <div>Habits</div>
                    <div className="absolute right-0">
                        <DialogTrigger asChild>
                            <button className="btn-mini">+</button>
                        </DialogTrigger>
                    </div>
                </div>

                {habits && habits.length > 0 ? habits.map((h:HabitType) => (
                    <Habit id={h.id} key={h.id} name={h.name} category={h.category} completed={h.completed} type={'Goals'}/>
                ))
                : <NoFound title={'No activities found'} description={'Add a new target to be better'} picture={<IlustratedFire/>}/>
                }
                {renderDialog()}
            </Dialog>
        </div>
    );
}

export default HabitsDaily;