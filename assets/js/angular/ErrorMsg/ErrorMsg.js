/**
 * THIS MODULE REQUIRES BOOTSTRAP.JS
 */


var errorMsgModule = angular.module('ErrorMsg', []);

errorMsgModule.controller('ErrorMsgCtrl', ['$scope', function ($scope) {
  //TODO Need to add function Error Code like GROUPS-NOT-LOADED
  //TODO Lets add all the message code in new line so that during merging the code if conflict its easy to know codes which are conflicting
  var handledErrorCodes = ['200', '204', '400', '401', '403', '404', '405', '408', '412', '500', '503'];
  $scope.language = lang;
  $scope.tryAgainCall;
  $scope.isRecoverable = true;
  /* Todo- Set this true or false depending on the error. Always true for now. */
  $scope.tryAgainVisible = false;
  $scope.modalDialogElement = null;
  //configuring error
  $scope.error = {
    title: '',
    description: '',
    tryagainFunc: null
  };

  $scope.dismissError = function () {
    if (!$scope.isRecoverable) {
      return;
    }
    $scope.errorMsg = false;
  };

  //setting an error message, error handling will be updated in iteration4.
  $scope.setError = function (errorCode, tryAgainFunc) {
    $scope.error.tryagainFunc = _.size(tryAgainFunc) ? tryAgainFunc : null;

    $scope.errorMsg = true;
    $scope.dataLoaded = true;

    if (typeof errorCode != 'undefined' && $scope.language['title-' + errorCode]) {
      $scope.error.title = $scope.language['title-' + errorCode];
      $scope.error.description = $scope.language['message-' + errorCode];
    } else {
      $scope.setGenericError();
    }
  };

  $scope.setErrorMessage = function (errorMessage, errorTitle, tryAgainFunc) {
    $scope.error.tryagainFunc = _.size(tryAgainFunc) ? tryAgainFunc : null;

    $scope.errorMsg = true;
    $scope.dataLoaded = true;

    $scope.error.title = errorTitle;
    $scope.error.description = errorMessage;

  };

  $scope.$watch('errorMsg', function (isShown) {
    if ($scope.modalDialogElement !== null) {
      if (isShown) {
        $scope.modalDialogElement.modal('show');
      } else if (!isShown) {
        $scope.modalDialogElement.modal('hide');
      }
    }
  });

  $scope.$on('EVENT:showErrorModal', function (event, args) {
    $scope.setErrorMessage(args.errorMessage, args.errorTitle, args.tryAgainFunc);
    $scope.modalDialogElement.modal({show: true, keyboard: false});
  });

  //setting a generic error
  $scope.setGenericError = function () {
    $scope.error.title = $scope.language['title-generic-error'];
    $scope.error.description = $scope.language['message-generic-error'];
  };

  $scope.tryAgain = function () {
    $scope.errorMsg = false;
    $scope.dataLoaded = false;
    $scope[$scope.error.tryagainFunc].call();
  };

}]);

errorMsgModule.directive('idxErrorAlert', function factory() {
  return {
    restrict: "A",
    replace: true,
    template: $(getSnippets()).find(".idx-error-alert").get(0).outerHTML,
    controller: 'ErrorMsgCtrl'
  };
});

errorMsgModule.directive('idxErrorModal', function factory() {
  return {
    restrict: "A",
    replace: true,
    template: $(getSnippets()).find(".idx-error-modal").get(0).outerHTML,
    controller: 'ErrorMsgCtrl',
    link: function (scope, element, attrs) {
      scope.modalDialogElement = element.modal();
    }
  };
});
