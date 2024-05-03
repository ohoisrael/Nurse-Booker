import Booking from '../models/BookingSchema.js'
import Nurse from '../models/NurseSchema.js'

export const updateNurse = async (req, res) => {
    const id = req.params.id
    try {
        const updatedNurse = await Nurse.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({ success: true, message: "Successfully updated", data: updateNurse, })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update" })
    }
}

export const deleteNurse = async (req, res) => {
    const id = req.params.id;
    try {
        await Nurse.findByIdAndDelete(id,)

        res.status(200).json({ success: true, message: "Successfully deleted", })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete" })
    }
}

export const getSingleNurse = async (req, res) => {
    const id = req.params.id
    try {
        const nurse = await Nurse.findById(id,).select("-password")

        res.status(200).json({ success: true, message: "Nurse found", data: nurse, })
    } catch (error) {
        res.status(404).json({ success: false, message: "No Nurse found" })
    }
}

export const getAllNurse = async (req, res) => {
    try {

        const { query } = req.query
        let nurses;

        if (query) {
            nurses = await Nurse.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { location: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            nurses = await Nurse.find({}).select("-password")
        }

        res.status(200).json({
            success: true,
            message: "Users found",
            data: nurses,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Not found" })
    }
}

export const getNurseProfile = async (req, res) => {
    const nurseId = req.userId

    try {
        const nurse = await Nurse.findById(nurseId)

        if (!nurse) {
            return res.status(404).json({ success: false, message: 'Nurse not found' })
        }

        const { password, ...rest } = nurse._doc;
        const appointments = await Booking.find({ nurse: nurseId })

        res.status(200).json({ success: true, message: 'Profile info is getting', data: { ...rest, appointments }, })
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get " })
    }
}