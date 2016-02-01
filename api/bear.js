module.exports = function (mongoose, router) {

  // Object model
  var bearSchema = mongoose.Schema({
      name: {
        type: String,
        required: true
      }
  });

  var Bear = mongoose.model('Bear', bearSchema);
  

  // REST Routes

  // GET all bears
  router.get('/', function (req, res) {
    Bear.find()
      .then(function (bears) { res.json(bears); })
      .catch(function (err) { res.send(err); });
  });

  // PUT bear
  router.post('/', function (req, res) {
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save()
      .then(function (bear) { res.json(bear); })
      .catch(function (err) { res.send(err); });
  });

  // GET bear by id
  router.get('/:id', function (req, res) {
    Bear.findById(req.params.id)
      .then(function (bear) { res.json(bear); })
      .catch(function (err) { res.send(err); });
  });

  router.put('/:id', function (req, res) {
    Bear.findById(req.params.id)
      .then(function (bear) {
        bear.name = req.body.name || bear.name;
        return bear.save().then(function (bear) {
          res.json(bear);
        });
      })
      .catch(function (err) { res.send(err); });
  });

  // Return the router for mounting.
  return router;
};
