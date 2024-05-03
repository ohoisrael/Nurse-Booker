import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const NurseCard = ({ nurse }) => {
  const { name, photo, location } = nurse;

  return (
    <div className="p-3 lg:p-5">
      <div>
        <img src={photo} alt={name} className="nurse-card-image" />
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCFOF3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {location}
        </span>

        <Link
          to={`/nurses/${nurse._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181a1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NurseCard;
