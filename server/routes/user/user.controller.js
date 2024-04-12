const Profile = require("../../models/userProfileModel");
const User = require("../../models/userRegistrationModel")
const bcrypt = require("bcrypt")

async function createUser(req, res) {
    const { name, username, email, password, userId } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json('All feild are required');
    }

    if (userId) {
        const existedUser = await User.findOne({ _id: userId });
        existedUser.email = email;
        existedUser.name = name;
        existedUser.username = username;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        existedUser.password = hashedPassword;

        await existedUser.save();
        return res.status(200).json({
            name: existedUser.name,
            username: existedUser.username,
            email: existedUser.email,
            userId: existedUser._id
        });
    }

    const emailExists = await User.find({ email: email });
    if (emailExists.length > 0) {
        return res.status(400).json('Email already in use, try using different email');
    }
    const usernameExists = await User.find({ username: username });
    if (usernameExists.length > 0) {
        return res.status(400).json('Username not available, choose different username');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: hashedPassword
    })
    await newUser.save();
    
    res.status(200).json({
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        userId: newUser._id
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('All feild are required');
    }
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
        return res.status(400).json('Wrong email')
    }
    const passMatch = await bcrypt.compare(password, userFound.password);
    if (!passMatch) {
        return res.status(400).json('Wrong password');
    }
    const userProfile = await Profile.findOne({user:userFound._id});

    res.status(200).json({
        userId: userFound._id,
        name: userFound.name,
        username: userFound.username,
        email: userFound.email,
        pic:userProfile.pic,
        interests:userProfile.interests,
        location:userProfile.location
    })
}

module.exports = { createUser, loginUser };