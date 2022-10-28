const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Cocktail = require('../models/Cocktail');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', auth, async (req, res) => {
   try {
      if (req.user.role === 'user') {
        const cocktails = await Cocktail
            .find({publish: true})
            .populate('addedBy', 'displayName')
            .populate({
              path: 'ratings',
              populate: {
                path: 'user',
                select: 'displayName'
              }
            });
          res.send(cocktails);
      } else if (req.user.role === 'admin') {
        const cocktails = await Cocktail
            .find()
            .populate('addedBy', 'displayName')
            .populate({
              path: 'ratings',
              populate: {
                path: 'user',
                select: 'displayName'
              }
            });
        res.send(cocktails);
      }
    } catch (e) {
      res.sendStatus(500);
    }
});

router.get('/my_cocktails', auth, async (req, res) => {
  try {
      const cocktails = await Cocktail
          .find({'addedBy': req.user._id})
          .populate('addedBy', 'displayName')
          .populate({
            path: 'ratings',
            populate: {
              path: 'user',
              select: 'displayName'
            }
          });
      res.send(cocktails);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const cocktail = await Cocktail
        .findById(req.params.id)
        .populate('addedBy', 'displayName')
        .populate({
          path: 'ratings',
          populate: {
            path: 'user',
            select: 'displayName'
          }
        });

    if (!cocktail) {
      res.status(404).send({message: 'Cocktail is not found!'})
    }
    res.send(cocktail);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/' , auth, upload.single('image'), async (req, res) => {
  const {title, recipe, ingredients} = req.body;

  if (!title || !recipe || !ingredients || !req.file) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const cocktailData = {
    title,
    recipe,
    ingredients: JSON.parse(ingredients),
    image: `uploads/${req.file.filename}`,
    addedBy: req.user._id
  };

  try {
    const cocktail = new Cocktail(cocktailData);
    await cocktail.save();

    res.send(cocktail);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

router.put('/:id/publish', auth, permit('admin'), async (req, res) => {
  try {
    const filter = {_id: req.params.id};
    const options = {publish: true};
    await Cocktail.updateOne(filter, options);
    res.send({message: 'Item has been published'});
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put('/:id/rate', auth, async (req, res) => {
  const {rating} = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).send({error: 'Rate from 1 to 5!'});
  }

  try {
    await Cocktail.updateOne({
      _id: req.params.id
    }, {
      $addToSet: {ratings: {user: req.user._id, rating: rating}}
    });
    res.send({message: 'Item has been rated'});
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    await Cocktail.deleteOne({_id: req.params.id});
    res.send({message: 'Item has been deleted'})
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;