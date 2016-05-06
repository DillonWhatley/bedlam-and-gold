var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventoryItemSchema = new Schema({
  name: String
});

var InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

//convenience data access methods
var inventoryItemDAO = {
  InventoryItem: InventoryItem,
  findById: function(id, callback) {
    return InventoryItem.findOne({
      '_id': id
    }, callback);
  },
  findByIds: function(ids, callback) {
    return InventoryItem.find({
      '_id': {
        $in: ids
      }
    }, function(err, inventoryItems) {
      if (err) throw err;
      return callback(err, inventoryItems);
    });
  },
  create: function(inventoryItem, callback) {
    var transientInventoryItem = new InventoryItem(inventoryItem);
    transientInventoryItem.save(function(err, inventoryItem) {
      if (err) throw err;
      return callback(err, inventoryItem);
    });
  }
};

module.exports = inventoryItemDAO;
