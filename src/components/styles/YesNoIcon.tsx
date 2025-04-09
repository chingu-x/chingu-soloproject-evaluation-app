import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

const YesNoIcon = ({answer}: {answer: string}) => {
    if (answer.toLowerCase()  === "yes")
        return <CheckCircle className="text-green-500"/>
    else if (answer.toLowerCase()  === "no")
        return <XCircle className="text-red-500"/>
    else
        return <HelpCircle className="text-yellow-500"/>
}

export default YesNoIcon