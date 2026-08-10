import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const PERU_TIMEZONE = "America/Lima";
export const nowInPeru = () => dayjs().tz(PERU_TIMEZONE);

export const nowAsDate = () => nowInPeru().toDate();
export const toPeruString = (
  date: Date | string | number = new Date(),
  format: string = "YYYY-MM-DD HH:mm:ss"
) => dayjs(date).tz(PERU_TIMEZONE).format(format);

export const nowTimestamp = () => nowInPeru().valueOf();