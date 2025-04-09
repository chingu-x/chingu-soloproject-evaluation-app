import { CheckIn } from "@/types/CheckinTypes";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Row } from "@tanstack/table-core";
import { progressColor } from "@/styles/checkin/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import YesNoIcon from "@/components/styles/YesNoIcon";

const CheckInDialogContent = ({record}: {record: Row<CheckIn>}) => {
    return <DialogContent className={`border-4 ${progressColor[record.original.fields["Progress Rating"]]?.border}`}>
        <DialogDescription>
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-2xl">{record.original.fields["Discord Name"]}</h3>
                    <p>Email: {record.original.fields["Email"]}</p>
                    <p>Role: {record.original.fields["Role"]}</p>
                </div>

                <div className="flex gap-4">
                    <p>Team: {record.original.fields["Team No."]}</p>
                    <p>{record.original.fields["Sprint No."]}</p>
                </div>

                <p>Team Communications: {record.original.fields["Team Communications"]}</p>

                {record.original.fields["Addl. Comments"] &&
                    <p>Member Comments:
                        <ScrollArea className="h-[200px] w-full rounded-md border p-4 whitespace-break-spaces">
                            {record.original.fields["Addl. Comments"]}
                        </ScrollArea>
                    </p>
                }

                <div>
                    <p className="flex items-center gap-4">Deployed? <YesNoIcon answer={record.original.fields["Deployed to Prod"]}/></p>
                    <p className="flex items-center gap-4">Individual feedback sent? <YesNoIcon answer={record.original.fields["Individual Feedback Sent"]}/></p>
                    <p className="flex items-center gap-4">Ack email sent? <YesNoIcon answer={record.original.fields["Ack. Email Sent"]}/></p>
                </div>

            </div>

        </DialogDescription>
    </DialogContent>
 }

 export default CheckInDialogContent