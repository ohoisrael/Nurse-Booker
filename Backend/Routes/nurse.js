import express from "express";
import { updateNurse, deleteNurse, getAllNurse, getSingleNurse, getNurseProfile } from "../Controllers/nurseController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", getSingleNurse)
router.get("/", getAllNurse)
router.put("/:id", authenticate, restrict(["nurse"]), updateNurse)
router.delete("/:id", authenticate, restrict(["nurse"]), deleteNurse)
router.get("/profile/me", authenticate, restrict(["nurse"]), getNurseProfile)


export default router;