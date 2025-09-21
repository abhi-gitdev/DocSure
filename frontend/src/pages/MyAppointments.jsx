import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate();
  const getUserAppoinments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppoinments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const appointmentRazorpay = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(
  //       backendUrl + "/api/user/payment-razorpay",
  //       { appointmentId },
  //       { headers: { token } }
  //     );

  //     if (data.success) {
  //       console.log(data.order);
  //     }
  //   } catch (error) {}
  // };

  useEffect(() => {
    if (token) {
      getUserAppoinments();
    }
  }, [token]);
  return (
    <div className="p-4">
      {" "}
      {/* Added padding for overall layout */}
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointment
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-col items-center gap-4 py-4 border-b md:grid md:grid-cols-[auto_1fr_auto] md:gap-6 md:items-start"
            key={index}
          >
            {/* Doctor Image Container */}
            <div className="flex-shrink-0">
              {" "}
              {/* Prevents image from shrinking */}
              <img
                className="w-32 h-32 object-cover rounded-full bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>

            {/* Doctor Info Container (now a direct child of the main item container) */}
            <div className="text-sm text-zinc-600 w-full text-center md:text-left">
              {" "}
              {/* Ensures content takes full width on mobile, centers text, aligns left on desktop */}
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address?.line1}</p>
              <p className="text-xs">{item.docData.address?.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
              {/* Removed the empty div that was previously present within the combined info/buttons container */}
            </div>

            {/* Buttons Container (now a direct child of the main item container, separate from info) */}
            <div className="flex flex-col gap-2 mt-4 w-full sm:w-60 mx-auto md:mx-0 md:mt-0 md:justify-self-end">
              {/* Centered buttons on mobile using mx-auto, no top margin on desktop (md:mt-0), and aligned to the end of the grid column on desktop (md:justify-self-end) */}
              {!item.cancelled && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="text-sm text-stone-500 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 text-red-500 rounded ">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 bordr border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
