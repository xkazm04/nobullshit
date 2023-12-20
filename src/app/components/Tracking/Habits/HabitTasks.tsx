import { useQuery } from "@tanstack/react-query";
import Task from "./HabitTask";

type Props = {
    habitId: string;
    percentage: number;
    setPercentage: (percentage: number) => void;
    tasksCompleted: number;
    setTasksCompleted: (tasksCompleted: number) => void;
};


const HabitTasks = ({habitId, percentage, setPercentage, tasksCompleted, setTasksCompleted}: Props) => {
    // Task nehodit sem
    // CRUD API 
    const completeTask = ({ id }) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                task.completed = !task.completed
            }
            return task
        }))
    }

    const data = []
    return    <div>
     {data && data.map((task) => (
        <div key={task.id}>
            <Task
                id={task.id}
                task={task}
                length={data.length}
                setPercentage={setPercentage}
                percentage={percentage}
                complete={completeTask}
            />
        </div>
    ))}
    </div>
}

export default HabitTasks;