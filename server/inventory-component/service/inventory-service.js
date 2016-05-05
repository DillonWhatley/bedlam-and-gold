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

module.exports = new InventoryService();
