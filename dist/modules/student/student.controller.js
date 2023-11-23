"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const getStudentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("OK");
});
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        const result = yield student_service_1.StudentServices.createStudentIntoDB(studentData);
        return res.status(200).json({
            error: false,
            msg: 'Student is created successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentFromDB();
        return res.status(200).json({
            error: false,
            msg: 'Success',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const singleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
        return res.status(200).json({
            error: false,
            msg: 'Success',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.studentController = {
    getStudentList,
    createStudent,
    getAllStudents,
    singleStudent,
};
