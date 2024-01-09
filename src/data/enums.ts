
export const categories = [
    { id: 1, name: 'Coding', logo: 'HammerIcon', description: "Improve expertize in IT area", examples: ['React', 'Azure DevOps'] ,color: '#7dd3fc',illustration: 'codingIcon'}, 
    { id: 2, name: 'Skill', logo: 'SkullIcon', description: "Practice anything and become master craftsman", examples: ['Woodworking', 'Cooking'] ,color: '#c4b5fd',illustration: 'skillIcon' },
    { id: 3, name: 'Fit', logo: 'HeartPulseIcon', description: "Run, push, pull. Sweat blood, look better, be stronger",examples: ['Push ups', 'Pull ups'] ,color: '#6ee7b7',illustration: 'fitIcon'  },
    { id: 4, name: 'Health', logo: 'GraduationCapIcon', description: "Feel healthy and happy",examples: ['Food', 'Yoga'] ,color: '#d9f99d',illustration: 'healthIcon' },
    { id: 5, name: 'Study', logo: 'PersonStandingIcon', description: "Academic, Research, Learn",examples: ['Topic research', 'Academic learning'] ,color: '#fca5a5',illustration: 'studyIcon' },
    { id: 6, name: 'Side', logo: 'BriefcaseIcon', description: "Work on side projects to support others or make more money",examples: ['Charity', 'Side job'] ,color: '#a5b4fc',illustration: 'sideIcon' }
    ];

export enum Category {
    Coding = 1,
    Skill = 2,
    Fit = 3,
    Health = 4,
    Social = 5,
    Side = 6
}

export enum DailyTypes {
    Morning = "1",
    Day = "2",
    Evening = "3"
}
