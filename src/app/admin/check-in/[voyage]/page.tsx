import { getCheckInsByVoyage } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";

const CheckinByVoyagePage = async ({params}: {params: {voyage: string}}) => {
    const records = await getCheckInsByVoyage(params.voyage)

    return <CheckinTable records={records}/>
 }
 
 export default CheckinByVoyagePage