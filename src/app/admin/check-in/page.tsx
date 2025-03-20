import { getLastestCheckIns } from "@/services/checkins";

const VoyageCheckIn = async () => {
    const checkin = await getLastestCheckIns()
    console.log(checkin[0].fields)

    return(
        <div>
            Admin only - VoyageCheckIn
        </div>
    )
 }

 export default VoyageCheckIn