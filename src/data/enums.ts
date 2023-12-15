
export const categories = [
    { id: 1, name: 'Skill', logo: 'HammerIcon', color: '#7dd3fc'},
    { id: 2, name: 'Physical', logo: 'SkullIcon', color: '#c4b5fd' },
    { id: 3, name: 'Health', logo: 'HeartPulseIcon', color: '#6ee7b7'  },
    { id: 4, name: 'Study', logo: 'GraduationCapIcon', color: '#d9f99d' },
    { id: 5, name: 'Social', logo: 'PersonStandingIcon', color: '#fca5a5' },
    { id: 6, name: 'Side hustle', logo: 'BriefcaseIcon', color: '#a5b4fc' },
    { id: 7, name: 'Mental', logo: 'BrainIcon', color:'#f0abfc' }
    ];

export enum Category {
    Skill = 1,
    Physical = 2,
    Health = 3,
    Study = 4,
    Social = 5,
    SideHustle = 6,
    Mental = 7
}

export enum DailyTypes {
    Morning = "1",
    Day = "2",
    Evening = "3"
}
