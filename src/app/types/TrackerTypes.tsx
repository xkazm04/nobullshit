export type HabitType = {
    id?: string;
    userId?: string;
    dayType?: boolean[];
    name: string;
    category: number;
    dateFrom?: string;
    dateTo?: string;
    isRecurring?: boolean;
    recurrenceType?: string;
    recurrenceInterval?: number;
    specificDays?: boolean[];
    active?: boolean;
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
    id: string,
    date: string,
    text: string
}
