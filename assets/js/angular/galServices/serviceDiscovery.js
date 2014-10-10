var galServices = angular.module('serviceModule',[]);

var servicesList = {
  "rel://applicationCreate": "/application"
};

galServices.factory("serviceDiscovery",["communicationAgent", '$q',function (communicationAgent,$q){
  return {
    getService : function (key) {
      return communicationAgent.interaction(key);
    }
  };
}]);

galServices.factory("communicationAgent",['$http',function ($http){
  var communicationAgentInstance = {
    get: function (url) {
      return $http.get(url);
    },
    put: function (url) {
      return $http.put(url);
    },
    post: function (url) {
      return $http.post(url);
    },
    "delete": function (url) {
      return $http["delete"]();
    },
    interaction: function (url) {
      var instance = {
        get : function () {
          return communicationAgentInstance.get(url);
        },
        put: function (requestBody) {
          return communicationAgentInstance.put(url,requestBody);
        },
        post: function (requestBody) {
          return communicationAgentInstance.post(url,requestBody);
        },
        "delete": function () {
          return communicationAgentInstance["delete"](url);
        }
      };
      return instance;
    }
  };
  return  communicationAgentInstance;
}]);