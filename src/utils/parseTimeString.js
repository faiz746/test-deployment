// utils/parseTimeString.js
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const parseTimeStringToDayjs = (time) => {
  if (!time) return null;

  const parsed = dayjs(time, "hh:mm A", true); // strict mode

  return parsed.isValid() ? parsed : null;
};
