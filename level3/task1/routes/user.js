
import express from 'express';
import User from '../models/users.js';



const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



//  task  2 is here 
//  get users also

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  get by  id 

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }     
catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//  put 

router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true },{returnDocument: 'after'}
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  delete user

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//  task  4 advanced query  is here


router.get('/users', async (req, res, next) => {
    try {
        // 1. Query params nikalo
        const { search, sort, page = 1, limit = 10 } = req.query;

        // 2. Filter banao
        const filter = search
            ? { name: { $regex: search, $options: 'i' } }
            : {}; // search nahi hai toh sab do

        // 3. Pagination calculate karo
        const skip = (page - 1) * limit;

        // 4. Query run karo
        const users = await User.find(filter)
            .sort(sort ? { [sort]: 1 } : {})
            .skip(skip)
            .limit(Number(limit));

        // 5. Total count
        const total = await User.countDocuments(filter);

        res.status(200).json({ total, page: Number(page), users });
    } catch (err) {
        next(err);
    }
});
export default router;
//  CRUD APP  IS HERE 