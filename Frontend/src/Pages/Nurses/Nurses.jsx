import NurseCard from "../../Components/Nurses/NurseCard";
import { nurses } from "../../assets/data/nurses";
import { BASE_URL } from "../../config";
import Error from "../../Components/Error/Error";
import Loader from "../../Components/Loader/Loading";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";

const Nurses = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
    console.log("handlesearch");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: nurses,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/nurses?query=${debounceQuery}`);

  const approvedNurses = nurses.filter(
    (nurse) => nurse.isApproved === "approved"
  );
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Nurse</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search nurse by name or location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              {approvedNurses.map((nurse) => (
                <NurseCard key={nurses.id} nurse={nurse} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Nurses;
