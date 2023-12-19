import Habit from './Habit';
import NoFound from '../../typography/NoFound';
import { IlustratedFire } from '../../icons/illustrations';
import { Dialog, DialogTrigger } from '../../ui/dialog';
import Modal from '../../Modal';
import HabitNew from './HabitNew';
import { HabitType } from '@/app/types/TrackerTypes';
import { useQuery } from '@tanstack/react-query';
import { getHabits } from '@/app/apiFns/habitApis';

const HabitsDaily = ({day }) => {
    const renderDialog = () => {
        return <Modal title={'Create a habit'} description={''} content={<HabitNew/>} />
    }
    const {data, error} = useQuery({
        queryKey: ['habits'],
        queryFn: getHabits
    })

    // Day to filter day
    return (
        <div className='flex flex-col relative my-5 full-h'>
            <Dialog>
                <div className="text-main font-mono flex flex-row justify-start px-3 py-3">
                    <div>Habits</div>
                    {error && <div>Error fetching</div>}
                    <div className="absolute right-2 top-0">
                        <DialogTrigger asChild>
                            <button className="btn-action">+</button>
                        </DialogTrigger>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                {data && data.length > 0 ? data.map((h:HabitType) => (
                    <div key={h.habitId}><Habit habit={h} /></div>
                ))
                : <NoFound title={'No activities found'} description={'Add a new target to be better'} picture={<IlustratedFire/>}/>
                }
                </div>
                {renderDialog()}
            </Dialog>
        </div>
    );
}

export default HabitsDaily;