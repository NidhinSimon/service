import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DateModal = ({handleclose}) => {
  const [value, setValue] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleSubmitdate = (value, selectedTime) => {
    if (selectedTime) {
      const selectedDay = dayjs(value);
      const formattedDate = selectedDay.format("dddd, MMMM D, YYYY");
      toast.success(`Selected time is ${formattedDate} ${selectedTime}`);
      handleclose(selectedTime,formattedDate)

    } else {
      toast.error("Please select a time.");
    }
  };

  const formattedDate = value
    ? dayjs(value).format("dddd, MMMM D, YYYY")
    : dayjs().format("dddd, MMMM D, YYYY");
  const allotedTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const currentHour = value ? dayjs(value).hour() : dayjs().hour();
  const selectedDay = dayjs(value);
  const tomorrow = selectedDay.add(1, "day");

  return (
    <div>
      <Toaster />
      <div>
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm  ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-3/5 w-2/5">
            <div className="flex justify-center">
              <DatePicker
                className="w-full h-10 "
                value={value}
                onChange={(newValue) => setValue(newValue)}
                defaultValue={dayjs()}
                minDate={tomorrow}
                views={["year", "month", "day"]}
              />
            </div>
            <div className="text-end mt-3">
              <p className="text-lg font-semibold"> {formattedDate}</p>
            </div>
            <div className="mt-5 ">
              <h1 className="text-2xl font-semibold text-indigo-500 ml-10">
                Time Slot
              </h1>
              <div className="grid grid-cols-4 mt-5 ml-10 cursor-pointer">
                {allotedTimes.map((time, index) => {
                  
                  const timeHour = dayjs(time, "h:mm A").hour();
                  return (
                    <div
                      key={index}
                      className={`bg-red-100 w-24 rounded-xl h-10 mt-3 ${
                        timeHour <= currentHour
                          ? "text-gray-400 cursor-not-allowed"
                          : selectedTime === time
                          ? "text-white hover: scale-110 duration-300 bg-slate-400"
                          : ""
                      }`}
                      onClick={() =>
                        timeHour > currentHour && handleTimeClick(time)
                      }
                    >
                      <p className="text-center mt-2">{time}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => handleSubmitdate(value, selectedTime)}
                  className="bg-indigo-500 w-20 h-10 rounded-xl text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateModal;
