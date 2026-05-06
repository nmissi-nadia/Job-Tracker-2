const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req , res) => {
    const {email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hash});
    res.json({message: 'User registered', user});
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) return res.status(401).json({ error: 'User non trouve' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'password incourrect' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret123');
    res.json({ token });
});

module.exports = router;
