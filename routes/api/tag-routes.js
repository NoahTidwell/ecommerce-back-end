const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"]
      }
      
    ]
  }).then(dbResposne => res.json(dbResposne))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: ProductTag,
        attributes: ["id", "product_id", "tag_id"]
      }
      
    ]
  }).then(dbResposne => res.json(dbResposne))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbResposne => res.json(dbResposne))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbResposne => {
    if(!dbResposne) {
      res.status(404).json({ message: 'This Tag ID does not exist.'});
      return;
    }
    res.json(dbResposne);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbResposne => {
    if(!dbResposne) {
      res.status(404).json({ message: "This tag ID does not exists."});
      return;
    }
    res.json(dbResposne);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
