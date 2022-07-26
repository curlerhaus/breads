const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const breadSeedData = require('../models/seed.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      res.render('index', {
        breads: foundBreads,
        title: 'Index Page'
      })
      // console.log(foundBreads)
    })
})


// NEW
// breads.get('/new', (req, res) => {
//   res.render('new')
// })

//New Steph
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
  .then(foundBread => {
    res.render('edit', {
      bread: foundBread
    })
  })
})



// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

//Create Many
// breads.get('/data/seed', (req, res) => {
//   Bread.insertMany([
    
//   ])
//     .then(createdBreads => {
//       res.redirect('/breads')
//     })
// })

//Create Many Steph
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(breadSeedData)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})


// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deleteBread => {
      res.status(303).redirect('/breads')
    })
})

// Delete All
breads.get('/deleteAll', (req, res) => {
  Bread.deleteMany({})
  .then(deletedAll => {
    res.redirect('/breads')
  })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updateBread => {
      console.log(updateBread)
      res.redirect(`/breads/${req.params.id}`)
    })
})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        const bakedBy=foundBread.getBakedBy()
        // console.log(bakedBy)
          res.render('show', {
              bread: foundBread
          })
      })
      .catch(err => {
        res.send('404')
        console.log("error404 page")
      })
})


module.exports = breads
