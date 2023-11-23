import { UserServices } from './user.service';
import { Request, Response } from 'express';


const createUser = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await UserServices.createUserIntoDB(studentData);
    return res.status(200).json({
      error: false,
      msg: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await UserServices.createUserIntoDB(studentData);
    return res.status(200).json({
      error: false,
      msg: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    return res.status(200).json({
      error: false,
      msg: 'Success',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await UserServices.getSingleUserFromDB(studentId);
    return res.status(200).json({
      error: false,
      msg: 'Success',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await UserServices.getSingleUserFromDB(studentId);
    return res.status(200).json({
      error: false,
      msg: 'Success',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};


export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser
};
