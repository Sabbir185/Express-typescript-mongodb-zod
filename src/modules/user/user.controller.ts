import {UserServices} from './user.service';
import {Request, Response} from 'express';
import {ordersValidationSchema, userValidationSchema} from './user.validation';

const createUser = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        const zodParsedData = userValidationSchema.parse(body);
        const result = await UserServices.createUserIntoDB(zodParsedData);
        return res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: {
                ...result,
                _id: undefined,
                __v: undefined,
                password: undefined,
                orders: undefined
            },
        });
    } catch (error: any) {
        if (error?.name === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 400,
                    description: JSON.stringify(error?.issues[0])
                },
            });
        } else if (error?.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Bad request, user already exists!',
                error: {
                    code: 11000,
                    description: `Duplicate field found, ${Object.keys(error?.keyValue)[0]} - ${error?.keyValue[Object.keys(error?.keyValue)[0]]}`
                },
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 500,
                    description: 'Server side error',
                },
            });
        }
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        const {userId} = req.params;
        // user checking from database by using static method
        const isUserExists = await UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // data validation and updating the user information
        const zodParsedData = userValidationSchema.parse(body);
        const result = await UserServices.updateUserIntoDB(Number(userId), zodParsedData);
        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });

    } catch (error: any) {
        if (error?.name === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 400,
                    description: JSON.stringify(error?.issues[0])
                },
            });
        } else if (error?.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Bad request, user already exists!',
                error: {
                    code: 11000,
                    description: `Duplicate field found, ${Object.keys(error?.keyValue)[0]} - ${error?.keyValue[Object.keys(error?.keyValue)[0]]}`
                },
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 500,
                    description: 'Server side error',
                },
            });
        }
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUserFromDB();
        if (result?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const result = await UserServices.getSingleUserFromDB(Number(userId));
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        // user checking from database by using static method
        const isUserExists = await UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // user delete from database
        const result = await UserServices.deleteUserFromDB(Number(userId));
        if (result?.deletedCount >= 1 && result?.acknowledged === true) {
            return res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed! please try again",
                data: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
};

// Product order
const addProductInOrder = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        const {userId} = req.params;
        // user checking from database by using static method
        const isUserExists = await UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }

        // order data validation and after that, append product into orders
        const parsedOrderData = ordersValidationSchema.parse(body)
        const result = await UserServices.addProductInOrderIntoDB(Number(userId), parsedOrderData);

        if (result?.modifiedCount >= 1 && result?.acknowledged === true) {
            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Failed! please try again",
                data: null
            });
        }
    } catch (error: any) {
        if (error?.name === 'ZodError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid order information',
                error: {
                    code: 400,
                    description: error?.issues[0]?.message
                },
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Server side error',
                error: {
                    code: 500,
                    description: 'Server side error',
                },
            });
        }
    }
};

const getAllOrdersForSpecificUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        // user checking from database by using static method
        const isUserExists = await UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // get users order information
        const result = await UserServices.getAllOrdersForSpecificUserFromDB(Number(userId));
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
};

const totalPriceForSpecificUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        // user checking from database by using static method
        const isUserExists = await UserServices.checkUserExistsOrNotFromDB(Number(userId));
        if (!isUserExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!"
                }
            });
        }
        // get total price of user
        const result = await UserServices.totalPriceForSpecificUser(Number(userId));
        return res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server side error',
            error: {
                code: 500,
                description: 'Server side error',
            },
        });
    }
};


export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addProductInOrder,
    getAllOrdersForSpecificUser,
    totalPriceForSpecificUser
};
