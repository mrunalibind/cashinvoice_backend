import Student from "../models/student.model.js";

export const createStudent = async (req, res) => {
  try {
    
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const student = await Student.create(req.body);
    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const studentId = req.params?.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student retrieved successfully", student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalStudents = await Student.countDocuments(query);

    res.status(200).json({
      message: "Students retrieved successfully",
      students,
      totalStudents,
      currentPage: Number(page),
      totalPages: Math.ceil(totalStudents / limit),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params?.id;

    const student = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true } 
    );
    res.status(200).json({message:"Student updated successfully", student});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params?.id;

    await Student.findByIdAndDelete(studentId);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
