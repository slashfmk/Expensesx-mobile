import moment from "moment";

const convertTime = (apiTime: any) => {
    const chunked = apiTime.split(":");

    const date = new Date();
    date.setHours(chunked[0]);
    date.setMinutes(chunked[1]);
    return moment(date).format('h:mm a');
}

export default {convertTime}
