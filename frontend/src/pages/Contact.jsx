import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12 bg-white ">
      <h2 className="text-xl md:text-2xl font-semibold mb-8 text-gray-500">
        CONTACT <span className="font-bold text-gray-800">US</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_image} // ✅ Replace with your image path
            alt="Doctor consultation"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Contact Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* Office Info */}
          <div>
            <h3 className="text-lg font-semibold mb-1">OUR OFFICE</h3>
            <p>
              34709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>
            <p className="mt-2">Tel: (745) 555-0132</p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@docsure.com"
                className="text-blue-600 underline"
              >
                support@docsure.com
              </a>
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="text-lg font-semibold mb-1">CAREERS AT DOCSURE</h3>
            <p>
              Join our team and help us build the future of healthcare. Explore
              our current job openings and career opportunities.
            </p>
            <button className="mt-3 px-5 py-2 border border-gray-500 text-gray-700 rounded-md hover:bg-black hover:text-white transition-all duration-200">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
