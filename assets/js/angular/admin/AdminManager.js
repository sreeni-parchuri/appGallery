/**
 * Created by sparchuri on 9/30/2014.
 */
var adminApp = angular.module('AdminApp',['ErrorMsg','ngTagsInput','serviceModule']);

adminApp.factory('AdminAppManager',['$q','$sce','serviceDiscovery','$http', function($q,$sce,serviceDiscovery,$http) {
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
      var responsePromise = serviceDiscovery.getService('/products/1').get();

      responsePromise.success(function(data, status, headers, config) {
        alert("Save success!");
      });
      responsePromise.error(function(data, status, headers, config) {
        alert("Save failed!");
      });
      return managerInstance.products;
    }

  };

  return managerInstance;

}]);

