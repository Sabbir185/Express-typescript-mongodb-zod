import {User} from '../user.model';
import {TUser, TUserOrders} from './user.interface';
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

    const updatedUser = await User.findOneAndUpdate({userId}, {
        $set: {
            ...userData,
            password: hashPassword
        }
    }, {new: true}).select({password: 0, _id: 0, __v: 0, orders: 0});

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


//From Here product order part start
const addProductInOrderIntoDB = async (userId: number, product: TUserOrders) => {
    const result = await User.updateOne({userId}, {$push: {orders: product}});
    return result;
};

const getAllOrdersForSpecificUserFromDB = async (userId: number) => {
    const result = await User.aggregate([
        {
            $match: {userId},
        },
        {
            $project: {
                orders: 1,
                _id: 0,
            }
        }
    ])
    return result[0];
};

const totalPriceForSpecificUser = async (userId: number) => {
    const result = await User.aggregate([
        {
            $match: {userId},
        },
        { $unwind: {path: '$orders', preserveNullAndEmptyArrays: true}},
        {
            $group: {
                _id: "$_id",
                totalPrice: {$sum: {$multiply: ["$orders.price", "$orders.quantity"]}},
            }
        },
        {
            $project: {
                totalPrice: {$ifNull: ["$totalPrice", 0]},
                _id: 0,
            }
        }
    ])
    return {
        totalPrice: result?.length > 0 ? result[0]?.totalPrice : 0
    };
};


export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserIntoDB,
    checkUserExistsOrNotFromDB,
    addProductInOrderIntoDB,
    getAllOrdersForSpecificUserFromDB,
    totalPriceForSpecificUser
};
