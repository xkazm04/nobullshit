import BottomNav from "../components/BottomNav"
import TodoComponent from "../components/Tasks/TodoComponent"
import TodoNew from "../components/Tasks/TodoNew"
import HeaderComponent from "../components/ui/header"

const todoExamples = [{
    id: 1,
    name: 'First todo',
},
{
    id: 2,
    name: 'Second todo',
},
{
    id: 3,
    name: 'Third todo',
}]

const Page = () => {
    // Get todos
    // Wrap to hydrate
    // Return todos
    return <div className="page">
        <HeaderComponent page={'Tasks'} />
        <div className="flex flex-col mt-[20%]">
            <div className='typo-long'>Simple todolist, like thousands of others</div>
            <div className='flex flex-col gap-1'>
                {todoExamples.map(todo => (
                    <TodoComponent key={todo.id} data={todo} />
                ))}</div>
        </div>
        <div className='z-10 w-full'>
            <div><TodoNew /></div>
            <BottomNav />
        </div>
    </div>
}

export default Page