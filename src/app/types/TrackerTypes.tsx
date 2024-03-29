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
    ai?: boolean;
    volume_start?: number;
    volume_target?: number;
    volume_units?: string;
    volume_actual?: number; 
}

export type Habits = {
    habits: HabitType[];
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
    text: string,
    type: string,
}

export type TaskInput = {
    user_id: string;
    habit_id: string;
    name: string;
}

export type TaskUpdate = {
    name?: string;
    completed?: boolean;
}

export type TaskType = {
    id: string;
    user_id: string;
    tracker_id: string;
    name: string;
    completed: boolean;
    date: string;
}

export type UserType = {
    username?: string;
    email: string;
}

export type CompType = {
    habit_id: string
    day: string
    completed: boolean
    volume_actual?: number
    volume_units?: string
}