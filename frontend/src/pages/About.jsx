import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div>
        <p className="text-center text-2xl pt-10 text-gray-500">
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to DocSure, your all-in-one solution for managing your
            healthcare journey with ease. We understand that navigating doctor
            appointments and health records can be complex, so we've created a
            platform to simplify it all. DocSure is designed to empower you with
            the tools you need to take control of your health.
          </p>
          <p>
            At DocSure, we are committed to revolutionizing healthcare access
            through technology. We constantly update our platform with the
            latest features to ensure a seamless and intuitive user experience.
            From your first booking to ongoing care management, DocSure is your
            trusted partner, providing support and convenience every step of the
            way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision is to make healthcare accessible and stress-free for
            everyone. We strive to build a strong connection between patients
            and healthcare professionals, ensuring you can find and book the
            right care precisely when you need it.
          </p>
        </div>
      </div>

      <div>
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>EFFICIENCY:</b>
          <p>
            Effortless appointment scheduling that seamlessly fits into your
            busy schedule.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>
            Gain access to a wide network of verified and trusted healthcare
            professionals right in your local area.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>PERSONALIZATION:</b>
          <p>
            Receive tailored recommendations and timely reminders to help you
            proactively manage your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
