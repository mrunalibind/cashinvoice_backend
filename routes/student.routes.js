import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware(["admin"]), createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", roleMiddleware(["admin"]), updateStudent);
router.delete("/:id", roleMiddleware(["admin"]), deleteStudent);

export default router;
