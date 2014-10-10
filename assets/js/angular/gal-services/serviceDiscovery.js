(function (){

  var servicesList = {
    "rel://applicationCreate": "/application"
  };

  angular.factory("serviceDiscovery",["communicationAgent",function (communicationAgent){
    return {
      getService : function (key) {
        return $q.when(communicationAgent.interaction().setUrl(servicesList[key]));
      }
    };
  }]);

  angular.factory("communicationAgent",[function (){
    var communicationAgentInstance = {
      get: function (url) {
        $http.get(url);
      },
      put: function (url) {
        $http.put(url);
      },
      post: function (url) {
        $http.post(url);
      },
      "delete": function (url) {
        $http["delete"]();
      },
      interaction: function () {
        var instance = {
          setUrl: function (url) {
            instance.url = url;
          },
          get: function () {
            communicationAgentInstance.get(instance.url);
          },
          put: function (requestBody) {
            communicationAgentInstance.put(instance.url,requestBody);
          },
          post: function (requestBody) {
            communicationAgentInstance.post(instance.url,requestBody);
          },
          "delete": function () {
            communicationAgentInstance["delete"](instance.url);
          }
        };

        return instance;
      }
    };
    return  communicationAgentInstance;
  }]);

})();