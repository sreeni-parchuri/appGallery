'use strict';

describe('ErrorMsgCtrl function', function () {

  // This makes the ErrorMsg angular module available to all of the tests
  beforeEach(angular.mock.module("ErrorMsg"));
  
  describe('ErrorMsgCtrl', function () {
    var scope;
    
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      var ctrl = $controller("ErrorMsgCtrl", {$scope: scope});
    }));
    
    it("should exist and have functions", function () {
      expect(scope.setError).to.be.a("function");
      expect(scope.setGenericError).to.be.a("function");
      expect(scope.tryAgain).to.be.a("function");
    });
  });

});