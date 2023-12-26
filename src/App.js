import { useState, useEffect } from "react";
import "./App.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Card from "./components/DatetimeCard";
import DatetimeList from "./components/DatetimeList";
import store from "store2";

dayjs.extend(utc);
dayjs.extend(timezone);

const OPTIONS = [
  { label: "🇨🇦 Toronto", value: "America/Toronto" },
  { label: "🇨🇦 Vancouver", value: "America/Vancouver" },
];
const FORMAT = "YYYY-MM-DDTHH:mm:ss";

function App() {
  const currentDatetime = dayjs().format(FORMAT);
  const timezone = dayjs.tz.guess();
  const [localTime, setLocalTime] = useState({ currentDatetime, timezone });
  const [targetList, setTargetList] = useState(OPTIONS);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storageList = store.get("convertList");
    setTargetList(storageList || OPTIONS);
  }, []);

  const localTimeOnChange = (e) => {
    setLocalTime((prev) => ({ ...prev, currentDatetime: e?.target?.value }));
  };
  const convertedTimeOnChange = (convertedToCurrentTime) => {
    setLocalTime((prev) => ({
      ...prev,
      currentDatetime: convertedToCurrentTime,
    }));
  };

  const handleOnRemove = (val) => {
    const filterList = targetList.filter((i) => i.value !== val);
    setTargetList(filterList);
    store.set("convertList", filterList);
  };

  const handleAddLocation = (e) => {
    e.preventDefault();

    const name = document?.forms?.["addForm"]?.["name"]?.value;
    const timezone = document?.forms?.["addForm"]?.["timezone"]?.value;

    const newList = [...targetList, { label: name, value: timezone }];
    setTargetList(newList);
    store.set("convertList", newList);

    handleShowDialog(false);
  };

  const handleShowDialog = (isOpen) => {
    const dialog = document.querySelector("dialog");

    isOpen && dialog && dialog.showModal();
    !isOpen && dialog && dialog.close();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-bold text-2xl w-full p-4 border-b text-center">
        Timezone Converter
      </h1>
      <div className="max-w-[800px] p-4 space-y-4">
        <Card
          datetime={localTime.currentDatetime}
          onChange={localTimeOnChange}
          label={`Current: ${localTime.timezone || "-"}`}
        />
        <div className="flex flex-col items-start space-y-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-[#eee]">Seleted locations:</h1>
            <i
              className="ri-add-circle-line text-2xl px-2 cursor-pointer"
              onClick={() => handleShowDialog(true)}
            ></i>
          </div>
          <DatetimeList
            data={targetList}
            localCurrentDatetime={localTime.currentDatetime}
            localTimezone={localTime.timezone}
            onChange={convertedTimeOnChange}
            onRemove={handleOnRemove}
          />
        </div>

        <dialog open={false}>
          <div className="p-4 flex flex-col space-y-4 relative">
            <i
              className="ri-close-circle-fill text-2xl px-2 cursor-pointer absolute top-0 right-0"
              onClick={() => handleShowDialog(false)}
            ></i>
            <p>Add a new local time!</p>
            <form
              className="flex flex-col space-y-2"
              name="addForm"
              method="dialog"
              onSubmit={handleAddLocation}
            >
              <input
                name="name"
                placeholder="Display name."
                className="border p-2"
              />
              <input
                name="timezone"
                placeholder="Timezone."
                className="border p-2"
              />
              <button
                type="submit"
                className="bg-[#282c34] text-white rounded-md p-2"
                onClick={() => handleShowDialog(false)}
              >
                OK
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default App;
