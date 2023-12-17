type MinProps = {
    mins: number,
    setMins: React.Dispatch<React.SetStateAction<number>>,
}

type HourProps = {
    hrs: number,
    setHrs: React.Dispatch<React.SetStateAction<number>>,
}

export const incrementMinutes = ({mins, setMins}: MinProps) => {
    if (mins < 60) {
        setMins(mins + 1)
    } else {
        setMins(0)
    }
  }

export const decrementMinutes = ({mins, setMins}:MinProps) => {
    if (mins > 0) {
        setMins(mins - 1)
    } else {
        setMins(60)
    }
}

export const incrementHours = ({hrs, setHrs}:HourProps) => {
    setHrs(hrs + 1)
}

export const decrementHours = ({hrs, setHrs}: HourProps) => {
    setHrs(hrs - 1)
}
