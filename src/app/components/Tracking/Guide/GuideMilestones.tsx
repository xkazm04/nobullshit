'use client';
import { useState } from "react";

import { Checkbox } from "../../ui/checkbox";

const exampleMilestones = [
    {id: 1, title: 'Milestone 1', checked: false},
    {id: 2, title: 'Milestone 2', checked: false},
    {id: 3, title: 'Milestone 3', checked: false}
]

const GuideMilestones = () => {
    const [loading, setLoading] = useState(true);
    const [milestones, setMilestones] = useState(exampleMilestones);
    // Loading animation - to change from
    const getRecommendation = () => {
        console.log('getRecommendation');
        setTimeout(() => {
            setLoading(false);
        }, 10000);
    }
    const handleCheck = (id: any) => {
        setMilestones(milestones.map(milestone => 
            milestone.id === id ? {...milestone, checked: !milestone.checked} : milestone
        ));
    }
    return (
        <div className="page">
            <div>Guide milestones - title</div>
            {loading && <div className="flex flex-col">Loading</div>}
            {milestones.map((milestone) => (
                <div key={milestone.id} className="flex flex-row gap-3">
                    <Checkbox checked={milestone.checked} onChange={() => handleCheck(milestone.id)} />
                    <div>{milestone.title}</div>
                </div>
            ))}
        </div>
    );
}

export default GuideMilestones;