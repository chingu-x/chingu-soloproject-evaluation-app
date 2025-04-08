import { CheckIn } from "@/types/CheckinTypes";
import { DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Row } from "@tanstack/table-core";
import { roleColors } from "@/styles/roles";
import { getRole } from "@/lib/getRole";
import { progressColor } from "@/styles/checkin/progress";

const CheckInDialogContent = ({record}: {record: Row<CheckIn>}) => {
    return <DialogContent className={`border-4 ${progressColor[record.original.fields["Progress Rating"]]?.border}`}>
        <DialogDescription>
            <div className="flex flex-col gap-4">
                <div>
                    <p>Email: {record.original.fields["Email"]}</p>
                    <p>Discord Name: {record.original.fields["Discord Name"]}</p>
                    <p>Role: {record.original.fields["Role"]}</p>
                </div>

                <div>
                    <p>Team: {record.original.fields["Team No."]}</p>
                    <p>{record.original.fields["Sprint No."]}</p>
                </div>

                <p>Team Communications: {record.original.fields["Team Communications"]}</p>

                <p>Member Comments: <br/>{record.original.fields["Addl. Comments"]}</p>

                <div>
                    <p>Deployed? {record.original.fields["Deployed to Prod"]}</p>
                    <p>Individual feedback sent? {record.original.fields["Individual Feedback Sent"]}</p>
                    <p>Ack email sent? {record.original.fields["Ack. Email Sent"]}</p>
                </div>

            </div>

        </DialogDescription>
    </DialogContent>
 }

 export default CheckInDialogContent