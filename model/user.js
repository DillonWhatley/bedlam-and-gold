module.exports = function(mongoose) {
  if (!mongoose) {
    console.error("Mongoose not initialized");
  }
  var User = mongoose.model('User', {
    id: Number,
    name: String
  });

  var user = new User({
    name: 'Bob'
  });
  user.save(function(err) {
    if (err) // ...
      console.log('user not saved');
  });

  function findByName(name, callback) {
    var bob = User.findOne({
      'name': 'Bob'
    }, callback);
  }

  return {
    findByName: findByName
  };
};
