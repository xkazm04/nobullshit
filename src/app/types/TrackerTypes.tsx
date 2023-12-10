

export type GoalType = {
    id: number,
    appliedInDays: number[],
    active: boolean,
    title: string,
    category: string
}

export type NoteType = {
    id: number,
    date: string,
    text: string
}