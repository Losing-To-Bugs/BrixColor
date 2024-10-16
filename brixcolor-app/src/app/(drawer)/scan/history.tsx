import InfoPopup from "../../../components/InfoPopup";
import HistoryList from "@/components/HistoryList";
const data = {
    color: "0x9B9A5A",
    confidence: 92,
    brick: "1x4_thin"
}


export default () => {
    return (<HistoryList/>)
    // return (<InfoPopup data={data}/>)
}
