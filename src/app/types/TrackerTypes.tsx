

export type TrackerType = {
    id?: number,
    days: boolean[],
    dayType: boolean[],
    active?: boolean,
    name: string,
    category: number
    recurrnece?: RecurrenceObject
}

export type RecurrenceObject = {
    dateFrom: Date,
    dateTo?: Date,
    isRecurring: boolean,
    recurrenceType: RecurrenceRepetition,
    recurrenceInterval: number,
    specificDays: boolean[],
}

export type RecurrenceRepetition = 'Week' | 'Month' 


export type NoteType = {
    id: number,
    date: string,
    text: string
}
