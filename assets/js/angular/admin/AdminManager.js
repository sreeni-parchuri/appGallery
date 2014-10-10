/**
 * Created by sparchuri on 9/30/2014.
 */
var adminApp = angular.module('AdminApp',['ErrorMsg','ngTagsInput']);

adminApp.factory('AdminAppManager',['$q','$sce', function($q,$sce) {
  "use strict";
  var managerInstance ;

  managerInstance = {
    products : { name : 'sreeni' },
    product : {
      name : '',
      company : '',
      website : '',
      screenshots : [],
      productDesc : '',
      productFeatures : '',
      isFSCompatible : '',
      Category : '',
      platforms : [],
      version : '',
      languages : ''
    },


    getProducts : function () {
      return managerInstance.products;
    }
  };

  return managerInstance;

}]);

