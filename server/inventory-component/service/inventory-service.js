var inventoryItemDAO = require('../data-access/inventory-item-dao');
var InventoryService = function() {};

InventoryService.prototype.create = function(inventoryItem, callback) {
  inventoryItemDAO.create(inventoryItem, callback);
};

InventoryService.prototype.findById = function(inventoryItemId, callback) {
  return inventoryItemDAO.findById(inventoryItemId, callback);
};

InventoryService.prototype.collectItem = function(inventoryItemId, callback) {
  //method stub
};

//Expects a user with an inventory array with each item in the array of the form
// {inventoryItemId: id, count: theCount}
InventoryService.prototype.findByUser = function(user, callback) {
  var inventoryItemIds = [];
  var inventoryItemIdToCount = {};
  user.inventory.forEach(function(inventoryItemReference) {
    inventoryItemIds.push(inventoryItemReference.inventoryItemId);
    inventoryItemIdToCount[inventoryItemReference.inventoryItemId] = inventoryItemReference.count;
  });
  inventoryItemDAO.findByIds(inventoryItemIds, function(err, inventoryItems) {
    inventoryItems.forEach(function(item) {
      item.count = inventoryItemIdToCount[item._id];
    });
    callback(err, inventoryItems);
  });
};

module.exports = new InventoryService();
