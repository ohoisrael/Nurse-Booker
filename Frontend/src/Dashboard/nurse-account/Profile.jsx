import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageCloudinary from "../../utils/uploadCloudinar";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ nurseData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    location: "",
    ticketPrice: 0,
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: nurseData?.name,
      email: nurseData?.email,

      phone: nurseData?.phone,
      bio: nurseData?.bio,
      location: nurseData?.location,
      ticketPrice: nurseData?.ticketPrice,
      timeSlots: nurseData?.timeSlots,
      about: nurseData?.about,
      photo: nurseData?.photo,
    });
  }, [nurseData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    try {
      const res = await fetch(`${BASE_URL}/nurses/${nurseData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTimeSlotChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[index][name] = value;
    setFormData({ ...formData, timeSlots: updatedTimeSlots });
  };

  const addTimeSlot = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeSlots: [
        ...prevFormData.timeSlots,
        { day: "", startingTime: "", endingTime: "" },
      ],
    }));
  };

  const deleteTimeSlot = (indices) => {
    const updatedTimeSlots = formData.timeSlots.filter(
      (_, index) => !indices.includes(index)
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeSlots: updatedTimeSlots,
    }));
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Location*</p>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g Tema, Accra"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div>
            <p className="form__label">Ticket Price*</p>
            <input
              type="number"
              placeholder="₵"
              name="ticketPrice"
              onChange={handleInputChange}
              value={formData.ticketPrice}
              className="form__input"
              required
            />
          </div>

          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <p className=" form__label">Day*</p>
                  <select
                    name="day"
                    value={item.day}
                    onChange={(e) => handleTimeSlotChange(index, e)}
                    className="form__input py-3.5"
                  >
                    <option value="">Select</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <p className="form__label">Starting Time*</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    onChange={(e) => handleTimeSlotChange(index, e)}
                    className="form__input"
                  />
                </div>
                <div>
                  <p className="form__label">Ending Time*</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    onChange={(e) => handleTimeSlotChange(index, e)}
                    className="form__input"
                  />
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                    onClick={() => deleteTimeSlot([index])}
                  >
                    <AiOutlineDelete onClick={() => deleteTimeSlot([index])} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-default"
            type="button"
            onClick={addTimeSlot}
          >
            Add Time Slot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="avatarImg"
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
