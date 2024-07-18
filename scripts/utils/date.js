import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatDate(date) {
    const day = dayjs(date);
    const formattedDate = day.format(`MMM D, YYYY`);
    return formattedDate;
}