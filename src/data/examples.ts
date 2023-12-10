import { GoalType, NoteType } from "@/app/types/TrackerTypes";
import { Category } from "@/data/enums";

export const goalExamples: GoalType[] = [
    {
        id: 1,
        appliedInDays: [1, 2, 3, 4, 5, 6, 7],
        active: true,
        title: 'NoFap',
        category: Category.Mental
    },
    {
        id: 2,
        appliedInDays: [1, 2, 3, 5, 6, 7],
        active: true,
        title: 'Pushups',
        category: Category.Physical
    },
    {
        id: 3,
        appliedInDays: [1, 2, 3, 4, 6, 7],
        active: true,
        title: 'Python programming',
        category: Category.Study

    },
    {
        id: 4,
        appliedInDays: [ 3, 4, 5, 6, 7],
        active: true,
        title: 'Tracker project',
        category: Category.SideHustle
    },
    {
        id: 5,
        appliedInDays: [1],
        active: true,
        title: 'Run',
        category: Category.Physical
    },
    {
        id: 6,
        appliedInDays: [1, 2, 7],
        active: true,
        title: 'Breath meditation',
        category: Category.Mental
    },
]

export const noteExamples: NoteType[] = [
    {
        id: 1,
        date: '2021-01-01',
        text: 'I made auth for Google and Github'
    },
    {
        id: 2,
        date: '2021-01-02',
        text: 'Covered unit tests for Login, Register, and ResetPassword'
    },
    {
        id: 3,
        date: '2021-01-03',
        text: 'Completed navigation for the app'
    }
]
    