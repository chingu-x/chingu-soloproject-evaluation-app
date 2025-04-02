import { getLastestCheckIns } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";

const VoyageCheckIn = async () => {
    const checkin = await getLastestCheckIns()
    console.log(checkin)

    return(
        <div>
            Admin only - VoyageCheckIn
            <CheckinTable records={checkin} />
        </div>
    )
 }

 export default VoyageCheckIn