import { ProgessRating } from "@/types/CheckinTypes";

type ProgressColor = {
    [key in ProgessRating]: {
        text: string;
        bg: string;
        border: string;
    }
}

export const progressColor:ProgressColor = {
    "GREEN - We have had a good start!": {
        text: 'text-green-900',
        bg: 'bg-green-900 text-white',
        border: 'border-green-900'
    },
    "YELLOW - I'm nervous we won't finish.":{
        text: 'text-yellow-500',
        bg: 'bg-yellow-600 text-black',
        border: 'border-yellow-900'
    },
    "RED - It doesn't look good right now":{
        text: 'text-red-500',
        bg: 'bg-red-900 text-white',
        border: 'border-red-900'
    }
}