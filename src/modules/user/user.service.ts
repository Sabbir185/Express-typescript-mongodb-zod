import { User } from '../user.model';
import { TUser } from './user.interface';


const createUserIntoDB = async (user: TUser) => {

};

const updateUserIntoDB = async (user: object) => {

};

const getAllUserFromDB = async () => {

};

const getSingleUserFromDB = async (id: string) => {

};

const deleteUserFromDB = async (id: string) => {

};


export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserIntoDB
};
