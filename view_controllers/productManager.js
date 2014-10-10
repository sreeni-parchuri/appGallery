var prodKeyIndex = 0;
module.exports = {
 productList : {},
 create: function(product){
   this.createProductKey = function () {
     return prodKeyIndex += 1;
   };
   var prodKey = this.createProductKey();
   product.productId = prodKey;
   this.productList[prodKey] = product;
   return prodKey;
 },
  read: function(prodKey){
    return this.productList[prodKey];
  },

  list: function () {
    return this.productList;
  }

};