const User = require("../models/User");
const joi = require("joi");
const getallusers = async (req, res) => {
  const users = await User.find({});
  res.status(201).json({ users });
};

const userschema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().trim().required(),
    age: joi.number().integer().min(0).required(),
    city: joi.string().trim().required(),
    zipCode: joi.string().trim().regex(/^\d{5,}$/).required()
});

const createuser = async (req, res) => {
  const { error } = userschema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: "enter valid credentials"});
  }

  try {
    const { email, name, age, city, zipCode } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      email,
      name,
      age,
      city,
      zipCode,
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateuser = async (req, res) => {
    const { error } = userschema.validate(req.body); 
    if (error) {
        return res.status(400).json({ msg: "enter valid credentials" });
    }

    const userId = req.params.userId; 
    try {
        let user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

 
        user.name = req.body.name;
        user.email = req.body.email;
        user.age = req.body.age;
        user.city = req.body.city;
        user.zipCode = req.body.zipCode;

        await user.save();

        res.status(200).json({ user }); e
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const getuser = async (req, res) => {
    const userId = req.params.userId; 
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ user }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const deleteuser = async (req,res) => {
    const userId = req.params.userId
    const remove  = await User.findByIdAndDelete(userId)
    if(!remove){
        return res.status(404).json({msg:"user does not exist"})
    }
    res.status(201).json({msg:"deleted successfully"})

}

module.exports = { getallusers, getuser, createuser , updateuser , deleteuser};
