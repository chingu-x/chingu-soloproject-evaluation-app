import { getLastestCheckIns } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";

const VoyageCheckIn = async () => {
    const checkin = await getLastestCheckIns()

    return(
        <div>
            <h1 className="text-center">Latest 100 Voyage Check-ins</h1>
            <CheckinTable records={checkin} />
        </div>
    )
 }

 export default VoyageCheckIn