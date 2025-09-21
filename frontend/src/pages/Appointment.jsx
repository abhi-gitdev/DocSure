import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(""); // Initialize slotTime state

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    let slots = [];

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Create the date string in the SAME format as used in booking
        let day = currentDate.getDate().toString().padStart(2, "0");
        let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`; // Format: DD_MM_YYYY (with leading zeros)
        const slotTime = formattedTime;

        // Check if slot is booked (safe check for undefined slots_booked)
        const isSlotAvailable =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push({
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i
        ),
        slots: timeSlots,
      });
    }

    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book appointment");
      return navigate("/login");
    }

    try {
      const selectedDay = docSlots[slotIndex];
      const selectedSlot = selectedDay.slots.find(
        (slot) => slot.time === slotTime
      );

      if (!selectedSlot) {
        toast.warn("Please select a time slot before booking.");
        return;
      }

      const date = new Date(selectedSlot.datetime);

      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`; // Format: DD_MM_YYYY
      console.log("Booking appointment on:", slotDate, "at", selectedSlot.time);

      // CHANGE: Use selectedSlot.time instead of slotTime
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime: selectedSlot.time, // FIX: Use the actual selected time
        },
        { headers: { token } }
      );

      if (data && data.success) {
        toast.success(data.message || "Appointment booked successfully!");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data?.message || "Something went wrong while booking.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* ----doctors details---- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ----doc info : name degree exp ----*/}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* ---doc about--- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            {/* ---doc fees--- */}
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fees:{" "}
              <span className="text-gray-700">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ----BOOKING SLOTS ---- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 ? (
              docSlots.map((daySlot, index) => (
                <div
                  key={index}
                  className={`text-center py-6  min-w-16 rounded-full cursor-pointer transition-all ease-in-out duration-200 ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  } `}
                  onClick={() => setSlotIndex(index)} // Handle selection
                >
                  {/* Display day of the week and date */}
                  <p className="font-medium">
                    {daysOfWeek[daySlot.date.getDay()]}
                  </p>
                  <p className="text-sm">{daySlot.date.getDate()}</p>
                </div>
              ))
            ) : (
              <p>No available slots</p>
            )}
          </div>
          {/* ----TIME SLOTS---- */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              Array.isArray(docSlots[slotIndex]?.slots) && // Check if 'slots' is an array
              docSlots[slotIndex].slots.map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
        {/* ----related doctors---- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
