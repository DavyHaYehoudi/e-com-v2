import { Router } from "express";
import {
  getNotesAdminController,
  updateNotesAdminController,
} from "../../../controllers/note/notesAdminController.js";
const router = Router();

router.get("/:customerId/notes", getNotesAdminController);
router.put("/:customerId/notes", updateNotesAdminController);

export default router;
