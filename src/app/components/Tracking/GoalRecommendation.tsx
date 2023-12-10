'use client';
import { useState } from "react";

const GoalRecommendation = (id: number) => {
    const [subgoal, setSubgoal] = useState('');
    const [description, setDescription] = useState('');
    const [requirement, setRequirement] = useState('');
    const [days, setDays] = useState([]);
    const [showDays, setShowDays] = useState(false);
    const [amount, setAmount] = useState(0);
    const [showAmount, setShowAmount] = useState(false);

    const sendSubgoal = async() => {
        console.log('sendSubgoal')
    }

    const sendRequirement = async() => {
        console.log('sendRequirement')
    }

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="flex flex-col w-full h-full justify-between p-4">
            <div>
                <label htmlFor="goal-description" className="mb-2 text-gray-700">What would you like to achieve?</label>
                <input
                    id="goal-description"
                    className="border p-2 mb-4 bg-slate-950 text-white rounded-lg w-full italic"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe your goal"
                />

                <fieldset className="mb-4">
                    <legend className="mb-2 text-gray-700">Select days of the week:</legend>
                    {weekDays.map((day, index) => (
                        <div key={index}>
                            <input 
                                id={`day-${index}`}
                                type="checkbox" 
                                className="form-checkbox h-5 w-5 text-gray-600" 
                                checked={days.includes(day)}
                                onChange={() => {
                                    if (days.includes(day)) {
                                        setDays(days.filter(d => d !== day));
                                    } else {
                                        setDays([...days, day]);
                                    }
                                }}
                            />
                            <label htmlFor={`day-${index}`} className="ml-2 text-gray-700">{day}</label>
                        </div>
                    ))}
                </fieldset>

                <label htmlFor="repetitions" className="mb-2 mt-4 text-gray-700">Number of repetitions per day:</label>
                <input
                    id="repetitions"
                    className="border p-2 mb-4 bg-slate-950 text-white rounded-lg w-full italic"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(Number(event.target.value))}
                    placeholder="Enter a number"
                />

                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={sendSubgoal}
                >
                    Submit
                </button>
            </div>           
        </div>
    );
}

export default GoalRecommendation;