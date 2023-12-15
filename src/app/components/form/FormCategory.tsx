import { categories } from "@/data/enums";

const FormCategory = ({ activeCategory, setActiveCategory }) => {
    return (
        <> 
            <div className="cat-row">Which area you want to improve?</div>
            <div className="flex flex-row flex-wrap pt-4">
                {categories.map(c => (
                    <div key={c.id}>
                        <div 
                            className="bg-gray-950 text-gray-300 py-1 px-3 rounded-2xl border border-transmain my-1
                            lg:hover:bg-gray-900 lg:cursor-pointer"
                            onClick={() => setActiveCategory(c)}
                        >
                            <div className={`w-3 h-3 rounded-full inline-block mr-2 ${activeCategory.id === c.id ? 'bg-main' : 'bg-gray-900'}`} />
                            {c.name}
                        </div>
                    </div>
                ))}
            </div>
        </> 
    );
}

export default FormCategory;