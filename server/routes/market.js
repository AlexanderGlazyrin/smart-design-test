const router = require('express').Router()
const Item = require('../models/item')

router.get('/market', async (req, res) => {
  try {
    const items = await Item.find({})
    res.status(200).json({items})
  } catch (error) {
    res.status(500).json({error, message: error.message})
  }
})

router.post('/new-item', async (req, res) => {
  try {
    const {itemName, description, params} = req.body;
    const item = new Item({
      itemName,
      description,
      params
    })
    await item.save()
    res.status(201).json({item})
  } catch (error) {
    res.status(500).json({error, message: error.message})
  }
})

router.delete('/delete-item', async (req, res) => {
  const {id} = req.body
  try {
    await Item.findByIdAndDelete(id);
    const items = await Item.find({})
    res.status(200).json({items})
  } catch (error) {
    res.status(500).json({error, message: error.message})
  }
})

module.exports = router;
