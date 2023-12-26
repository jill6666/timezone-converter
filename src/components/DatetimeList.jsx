import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Card from "./DatetimeCard";

dayjs.extend(utc);
dayjs.extend(timezone);

const FORMAT = "YYYY-MM-DDTHH:mm:ss";

const DatetimeList = ({
  data,
  localCurrentDatetime,
  localTimezone,
  onChange,
  onRemove = () => {},
}) => {
  const convertedTimeOnChange = (e, timezone) => {
    const value = e?.target?.value;
    dayjs.tz.setDefault(timezone);

    const convertedToCurrentTime = dayjs
      .tz(dayjs.tz(value), localTimezone)
      .format(FORMAT);

    onChange && onChange(convertedToCurrentTime);

    dayjs.tz.setDefault();
  };
  return (
    <div className="flex flex-col space-y-2 items-center rounded-sm border w-full p-2">
      {data &&
        data.map((option) => {
          const convertedTime = dayjs(localCurrentDatetime)
            .tz(option?.value)
            .format(FORMAT);

          return (
            <div key={option?.value} className="w-full flex">
              <Card
                canBeEdited={true}
                backgroundColor={"#eee"}
                datetime={convertedTime}
                onChange={(e) => convertedTimeOnChange(e, option?.value)}
                label={option?.label}
                onRemove={() => onRemove(option?.value)}
              />
            </div>
          );
        })}
    </div>
  );
};
export default DatetimeList;
