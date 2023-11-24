import {User} from '../user.model';
import {TUser} from './user.interface';
import bcrypt from "bcrypt";
import config from "../../config";

const createUserIntoDB = async (user: TUser) => {
    const newUser = new User({...user});
    await newUser.save()
    return newUser.toObject();
};


const updateUserIntoDB = async (userId: number, userData: TUser) => {
    // if user send password, then password will be updated
    const hashPassword = userData?.password && await bcrypt.hash(userData.password, Number(config.bcrypt_salt_rounds));

    const updatedUser = await User.findOneAndUpdate({userId}, {$set: {...userData, password: hashPassword}}, {new: true}).select({password: 0, _id: 0, __v: 0, orders: 0})
    return updatedUser;
};


const getAllUserFromDB = async () => {
    const users = await User.find({}).select({username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0});
    return users;
};


const getSingleUserFromDB = async (userId: number) => {
    return await User.isUserExists(userId)
};


const checkUserExistsOrNotFromDB = async (userId: number) => {
    return await User.isUserExists(userId);
}


const deleteUserFromDB = async (userId: number) => {
    const result = await User.deleteOne({userId});
    return result;
};


export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserIntoDB,
    checkUserExistsOrNotFromDB
};
