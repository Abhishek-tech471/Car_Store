const validator = require("validator");
const { handel_error } = require("../template/snippets")
const User = require("../db/models/user")
const bcrypt = require("bcrypt");
exports.get = (req, res) => {
    res.send('Welcome to the CarDekho API');
}

exports.login =async (req, res) => {
    try{
        let { email, password } = req.body;

        if(!email || !password){
            handel_error("Please enter your email and password", 400);
        }
        else if(!validator.isEmail(email)){
            handel_error("Please enter a valid email", 400);
        }
        else if(!validator.isStrongPassword(password, {})){
            handel_error("Please enter a strong password", 400);
        }
        let user = await User.findOne({ email });
        if (!user) {
            handel_error("no user found", 401);
        }
        let  compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            handel_error("Invalid email or password", 401);
        }
        res.status(200).json({ result: true, message: "Login successful" });
    } catch (error) {
        res.status(error.status || 400).json({ result: false, message: error.message });
    }
}

schema.methods.generate_auth_token = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

schema.pre

exports.register = async (req, res) => {
    try {
        const { name, email, phoneNo, password } = req.body;
        if (!name || !validator.isLength(name, { min: 3, max: 30 })) {
            handel_error("Please enter your name", 400);
        } else if (!email || !validator.isEmail(email)) {
            handel_error("Please enter a valid email", 400);
        } else if (!phoneNo || !validator.isMobilePhone(phoneNo, "en-IN")) {
            handel_error("Please enter a valid indian phone number", 400);
        } else if (!password || !validator.isStrongPassword(password, {})) {
            handel_error("Please enter a strong password", 400);
        }

        const user = new User({ name, email, phoneNo, password });
        await user.save();
        return res.status(201).json({ result: true, message: "User registred successfully" })
    } catch (error) {
        res.status(error.status || 400).json({ result: false, message: error.message })
    }
}