import React, { use, useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointments,
    cancelAppointments,
  } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const { currency } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-3">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="test-xl font-semibold text-gray-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="test-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-10 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2.5 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <img src={assets.list_icon} alt="" className="w-5 h-5" />
            <p className="font-semibold text-gray-700">Latest Booking</p>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="ml-4 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {item.userData.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                <div className="ml-4">
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <img
                        onClick={() => cancelAppointments(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                      <img
                        onClick={() => completeAppointments(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt="Confirm"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
