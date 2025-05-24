
const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.post('/', async(req, res) =>{

    const newItem = new Item({name: req.body.name});

    await newItem.save();
    res.json(newItem);
})

router.get('/',async(req,res) =>
{
    const items = await Item.find();
    res.json(items);
});


// Update
router.put('/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;