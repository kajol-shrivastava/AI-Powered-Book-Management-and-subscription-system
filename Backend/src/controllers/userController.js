import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js';
import bookModel from '../models/bookModel.js';
import mongoose from 'mongoose';
import { isValid,
    isValidRequest,
    isValidMail,
    isValidMobile,
    isValidUser,
    isValidTitle,
    checkPassword } from "../validator/validator.js"

//<<------------------------------------------Create User--------------------------------------------------->>    
const registerUser = async function (req, res) {
    try {
        const data = req.body
        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }

        //extracting params
        let { title, name, phone, email, password, address } = data
        const newuser = {}

        //validation starts
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }

        

        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: "Title must be among [Mr,Mrs,Miss]" })
        }

        newuser.title = title

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "name is required" })
        }

        if (!isValidUser(name)) {
            return res.status(400).send({ status: false, message: "Please enter a valid name" })
        }

        newuser.name = name

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: "phone is required" })
        }

        if (!isValidMobile(phone)) {
            return res.status(400).send({ status: false, message: "Please enter a valid indian phone number in string " })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }

        if (!isValidMail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email" })
        }

        const ifAlreadyExist = await userModel.findOne({ $or: [{ email: email }, { phone: phone }] })
        

        if (ifAlreadyExist) {
            return res.status(400).send({ status: false, message: "Email or Phone number already in use" })
        }

        newuser.email = email
        newuser.phone = phone

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }

        if (!checkPassword(password)) {
            return res.status(400).send({ status: false, message: "password length should be between 8-15 characters" })
        }

        newuser.password = password

        if(address){
        newuser.address = address}


        const newUser = await userModel.create(data)
        res.status(201).send({ status: true, message: "success", data: newUser })


    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

//<<---------------------------------------------user login-------------------------------------------------->>

const login = async function (req, res) {
    try {
        let data = req.body

        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }

        let email = data.username;
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }

        if (!isValidMail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email" })
        }

        let password = data.password
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        if (!checkPassword(password)) {
            return res.status(400).send({ status: false, message: "password length should be between 8-15 characters" })
        }

        const loginUser = await userModel.findOne({ email: email, password: password })
        if (!loginUser) {
            return res.status(401).send({ status: false, message: "login Credentials are wrong" }) //login email and password does not match validation.
        }

        let token = jwt.sign(
            {
                userId: loginUser._id,
                iat:Math.floor(Date.now()/1000),
                }, process.env.SECRET_KEY ,{expiresIn: '10h'}
        )
        res.setHeader("x-api-key", token)
        res.status(201).send({ status: true, message: 'Login Successful', data: {token} }) //creating jwt after successful login by author

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message , data : {}})
    }
}

const getDashboardData = async (req, res) => {
  try {
    const  userId  = req.loginUserId;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ status: false, message: 'Invalid userId' });
    }

    // Fetch user with continue reading books populated
    const user = await userModel.findById(userId)
      .populate('continueReading.bookId')
      .lean();

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Calculate plan expiry
    const today = new Date();
    const endDate = new Date(user.subscription?.endDate);
    const planExpiresIn = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

    // Get latest 10 books
    const latestBooks = await bookModel.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Construct response
    const response = {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        planExpiresIn
      },
      continueReading: user.continueReading,
      latestBooks
    };

    res.status(200).json({ status: true, message: 'Dashboard fetched successfully', data: response });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

export { registerUser, login ,getDashboardData}