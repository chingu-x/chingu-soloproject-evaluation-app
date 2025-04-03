import { getLastestCheckIns } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";

const VoyageCheckIn = async () => {
    const checkin = await getLastestCheckIns()

    return(
        <div>
            Admin only - VoyageCheckIn
            <CheckinTable records={checkin} />
        </div>
    )
 }

 export default VoyageCheckIn