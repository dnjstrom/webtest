module.exports = function (router) {

  router.get('/', function (req, res) {
    var users = req.db.get('users');
    users.find().then(function (records) {
      res.json(records);
    });
  });

  return router;
};
