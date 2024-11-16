const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {auth} = require('../middlewares/auth');
require('dotenv').config();

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
      
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access Denied. Admins only.' });
      }
  
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching users.' });
    }
  })

router.post('/register',async(req,res) => {
    try {
        const {username , password,role} = req.body;
        
        if(!username || !password)
        {
            return res.json(400).json({error:'Username and password are required'});
        }
        const existingUser = await User.findOne({username});

        if(existingUser)
        {
            return res.status(400).json({error:'Username Already Exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password,salt);

        //saving the encrypted password in db
        const newuser = await User({username, password:hashedPassword , role});
        await newuser.save();

        res.status(201).json({message:'User registered successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
  
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      //token to be sent 
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error during login.' });
    }
  });

module.exports = router;