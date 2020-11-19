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
  console.log(123)
  try {
    const {itemName, description} = req.body;
    const item = new Item({
      itemName,
      description
    })
    await item.save()
    res.json({item})
  } catch (error) {
    res.status(500).json({error, message: error.message})
  }
})

module.exports = router;
