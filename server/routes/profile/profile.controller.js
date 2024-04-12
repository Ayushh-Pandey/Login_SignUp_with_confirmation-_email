const { mail } = require("../../config/sendEmail");
const Profile = require("../../models/userProfileModel");
const User = require("../../models/userRegistrationModel");

async function createProfile(req, res) {
    const { pic, location, interests, userId } = req.body;

    if (!pic || !location || !interests || !userId) {
        return res.status(400).json( 'feild is missing' );
    }

    const newProfile = new Profile({
        user: userId,
        pic: pic,
        location: location,
        interests: interests
    })
    await newProfile.save();

    const user = await User.findOne({_id:userId})
    const userEmail = user.email;

    mail(userEmail);

    res.status(200).json({
        userId: userId,
        pic: newProfile.pic,
        location: newProfile.location,
        interests: newProfile.interests
    })
}

const mailToUser = async (req, res) => {
    const {userEmail} = req.body;
    
    const result = mail(userEmail);
    if(result!=="Error")
        return res.status(200).json(`Email sent to ${userEmail}`);

    res.status(404).json('Error sending mail, Try again')
}

module.exports = { createProfile, mailToUser};

