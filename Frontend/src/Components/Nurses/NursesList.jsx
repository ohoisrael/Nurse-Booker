import { BASE_URL } from "../../config";
import Error from "../Error/Error";
import Loader from "../Loader/Loading";
import useFetchData from "../../hooks/useFetchData";
import NurseCard from "./NurseCard";

const NursesList = () => {
  const { data: nurses, loading, error } = useFetchData(`${BASE_URL}/nurses`);
  const approvedNurses = nurses.filter(
    (nurse) => nurse.isApproved === "approved"
  );

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {approvedNurses.map((nurse) => (
            <NurseCard key={nurse.id} nurse={nurse} />
          ))}
        </div>
      )}
    </>
  );
};

export default NursesList;
