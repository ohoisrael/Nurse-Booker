import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import Error from "../../Components/Error/Error";
import Loader from "../../Components/Loader/Loading";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const NurseDetails = () => {
  const { id } = useParams();
  const {
    data: nurse,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/nurses/${id}`);

  const {
    name,
    email,
    phone,
    bio,
    gender,
    location,
    ticketPrice,
    timeSlots,
    about,
    photo,
  } = nurse;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-5">
            <figure>
              <img src={photo} alt="" className="nurse-card-image" />
            </figure>

            <div>
              <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                {location}
              </span>
              <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                {name}
              </h3>
              <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                {bio}
              </p>
            </div>
            <div>
              <SidePanel
                nurseId={nurse._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NurseDetails;
