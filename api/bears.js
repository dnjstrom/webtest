module.exports = function (mongoose, router) {

  // Object model
  var bearSchema = mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      hobby: String
  });

  var Bear = mongoose.model('Bear', bearSchema);
  

  // REST Routes

  // Get all bears.
  router.get('/', function (req, res) {
    Bear.find()
      .then(function (bears) { res.json(bears); })
      .catch(function (err) {
        res.status(418);
        res.send(err);
      });
  });

  // Create a new bear.
  router.post('/', function (req, res) {
    var bear = new Bear();
    bear.name = req.body.name;
    bear.hobby = req.body.hobby;

    bear.save()
      .then(function (bear) { res.json(bear); })
      .catch(function (err) {
        res.status(418);
        res.send(err);
      });
  });

  // Get a specific bear by id.
  router.get('/:id', function (req, res) {
    Bear.findById(req.params.id)
      .then(function (bear) {
        res.json(bear);
      })
      .catch(function (err) {
        res.status(418);
        res.send(err.message);
      });
  });

  // Update a specific bear.
  router.put('/:id', function (req, res) {
    Bear.findById(req.params.id)
      .then(function (bear) {
        bear.name = req.body.name;
        bear.hobby = req.body.hobby;
        return bear.save().then(function (bear) {
          res.json(bear);
        });
      })
      .catch(function (err) {
        res.status(418);
        res.send(err);
      });
  });

  // Return the router for mounting.
  return router;
};
