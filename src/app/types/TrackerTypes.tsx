export type HabitType = {
    userId: string;
    dayType: boolean[];
    name: string;
    category: string;
    dateFrom?: string;
    dateTo?: string;
    isRecurring?: boolean;
    recurrenceType?: string;
    recurrenceInterval?: number;
    specificDays?: boolean[];
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
