const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = async (req,res,next) =>{
    try {
        const  authHeader = req.header('Authorization');
        if(!authHeader){
            return res.status(401).json({ error: 'Access Denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        if(!token)
        {
            return res.status(401).json({error:"Token not found"})
        }

        const decoded = jwt.verify(token,process.env.JWT_secret);

        //finding user for this id
        const user = await User.findById(decoded.id);
        if(!user)
        {
            return res.status(404).json({error:"User not found"});
        }

        //to give access the info of auth user to other middlewares 
        req.user = user; 
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

const isAdmin = async (req,res,next) =>{
    if(req.user.role !== 'Admin') return res.status(403).send('Access Forbidden');
    next();
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set token expiration
      });
  
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  };

module.exports = {auth , isAdmin};
