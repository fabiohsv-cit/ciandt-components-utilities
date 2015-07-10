# ciandt-components-utilities
Utilities to make life easier on settings and other needs during development with angularjs.

### Install

* Install the dependency:

   ```shell
   bower install ciandt-components-utilities --save
   ```
* Add utilities.js, utilities-filters.js and utilities-directives.js to your code:

   ```html
   <script src='assets/libs/ciandt-components-utilities/utilities.js'></script>
   <script src='assets/libs/ciandt-components-utilities/utilities-filters.js'></script>
   <script src='assets/libs/ciandt-components-utilities/utilities-directives.js'></script>
   ```
   - note that the base directory used was assets/libs, you should change bower_components to assets/libs or move from bower_components to assets/libs with grunt.
* Include module dependency:

   ```javascript
   angular.module('yourApp', ['ciandt.components.utilities']);
   ```
======

### How To Use

1. **ciandt.components.utilities.Utilities Functions**

* wrapElement(element, content, prepend): element content
   - this function wrap element into content. The param "prepend" indicate if element will be inserted in top or bottom content children.
   
   ```javascript
   app.directive("yourDirective", ['ciandt.components.utilities.Utilities', function (Utilities) {
      .
      .
      var element = $('<input></input>');
	  var div = Utilities.wrap(element, '<div><span></span></div>', true);
	  // div = <div><input></input><span></span></div>
	  .
	  Or
	  .
      var element = $('<input></input>');
	  var div = Utilities.wrap(element, '<div><span></span></div>', true);
	  // div = <div><span></span><input></input></div>
      .
      .
   }]);
   ```
* validateCpf(string): boolean
   - validate cpf function, return true if it's valid and false if it's invalid
* validateCnpj(string): boolean
   - validate cnpj function, return true if it's valid and false if it's invalid
* ngMaskDefaultAlias: object
   - return default alias masks from angular-ngMask
* enableCors($httpProvider)
   - configure $httpProvider to enable cors
* fixIISHttpHeaders($httpProvider)
   - configure $httpProvider to fix existent problem in IIS when If-Modified-Since is "0"
* configureRestangular(RestangularProvider)
   - configure Restangular to enable put method and an interceptor to handle binary response or paginated response data.
* applyExceptionHandler(handler)
   - set an exception javascript handler with detault messages for same situations. Param handler can be used to apply custom messages.
* applyModelStateMessages(response, defaultMessage)
   - this function check if the response has model state and apply the field messages, if it's exists, or return a message list to show. If has not model state return defaultMessage.

2. **Directives**

* appSlimScroll
   - apply jquery slim scroll plugin on element
* appValidateEquals
   - apply a validate equals between two fields, emit flag "equal" on ngModel
   ```html
   <input ng-model=password>
   <input ng-model=confirmPassword app-validate-equals="password">
   ```
* appFullScreenPage
   - should be used on first element of page to shows its full screen. This directive apply body-wide on body element.
* appDynamicDirective
   - this directive can be used to apply another directive dynamically
   ```html
   <form app-dynamic-directive="{{myCtrl.myModel.myFlag == true ? 'app-modal' : 'app-panel|ng-controller=myCtrl'}}"...
   ```
* appInterpolateFormat
   - this directive can be used to process a dynamic expression using $interpolate
* appAsyncValidate
   - this directive can be used to apply async validate, for example if your validate is processed with rest api.
   ```html
   <input ng-model=cpf app-async-validate="checkCpf" app-async-validate-message="CPF already used in another user">
   ```
   ```javascript
   app.controller('yourCtrl', [function($scope, $http){
      $scope.checkCpf = function(modelValue, viewValue, resolve, reject) {
         $http.get('yourUrl/' + modelValue).success(function(){
            resolve();
		 }).error(function(){
            reject();
		 });
	  }
   }
   ```
* appEnter
   - this directive can be used to process a controller method setted on enter pressed.

3. **Filters**

* selected:boolFieldName
   - this filter can be used to select the objects on informed list where the field setted in filter is true
   ```html
   <tr ng-repeat="item in items | selected:'boolFieldName'">
   ```
   - in this case will be repeated only items where 'boolFieldName' is equals to 'true'
* boolToText
   - translate boolean to text (Yes/No)
* translate:identifier:value
   - this filter can be used to translate values, it's similar to oracle translate.
   ```html
   {{value:translate:1:'Value 1':2:'Value 2'}}
   ```
* capitalize:text
   - this filter apply upper case on first letter