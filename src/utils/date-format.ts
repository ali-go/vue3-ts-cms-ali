// 格式化时间
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const DEFAULT_FORMAT = "YYYY-MM-DD HH:mm:ss";
// 1.把utc字符串格式的时间转为YYYY-MM-DD HH:mm:ss
export function formatUtcString(
  utcString: string,
  format: string = DEFAULT_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format);
}
