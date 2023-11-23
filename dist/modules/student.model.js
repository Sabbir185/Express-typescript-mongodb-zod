"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [20, "First name can not be more than 20 characters"],
        validate: function (value) {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            return firstNameStr === value; // if same, then return true otherwise return false
        }
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: true
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true
    },
    motherContactNo: {
        type: String,
    },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String, required: [true, "ID is required"], unique: true },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: "{VALUE} is not a valid gender"
        },
        required: true
    },
    dateOfBirth: String,
    email: {
        type: String,
        required: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    profileImg: String,
    isActive: {
        type: String,
        enum: {
            values: ['active', 'blocked'],
            message: "{VALUE} is not a valid status"
        },
        default: 'active'
    },
});
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
