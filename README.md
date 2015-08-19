# ng-jedi-utilities
Utilities to make life easier on settings and other needs during development with angularjs.

### Install

* Install the dependency:

   ```shell
   bower install ng-jedi-utilities --save
   ```
* Add utilities.js, utilities-filters.js and utilities-directives.js to your code:

   ```html
   <script src='assets/libs/ng-jedi-utilities/utilities-filters.js'></script>
   <script src='assets/libs/ng-jedi-utilities/utilities-directives.js'></script>
   <script src='assets/libs/ng-jedi-utilities/utilities.js'></script>
   ```
   - note that the base directory used was assets/libs, you should change bower_components to assets/libs or move from bower_components to assets/libs with grunt.
* Include module dependency:

   ```javascript
   angular.module('yourApp', ['jedi.utilities']);
   ```
======

### How To Use

1. **Functions**
   - first step: inject jedi.utilities.Utilities in your component so you can use functions below.

* wrapElement(element, content, prepend): element content
   - this function wraps "element" inside "content". The parameter "prepend" indicate if the element will be placed above or below content's children.
   
   ```javascript
   app.directive("yourDirective", ['jedi.utilities.Utilities', function (Utilities) {
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
   - return the default alias masks from angular-ngMask

* enableCors($httpProvider)
   - configure $httpProvider to enable cors

* fixIISHttpHeaders($httpProvider)
   - configure $httpProvider to fix existent problem in IIS when If-Modified-Since is "0"

* configureRestangular(RestangularProvider)
   - configure Restangular to enable put method and an interceptor to handle binary or paginated response data.

* applyExceptionHandler(handler)
   - set a javascript exception handler with standard messages for some situations. Parameter handler can be used to apply custom messages.

* applyModelStateMessages(response, defaultMessage)
   - this function checks if the response has a model state and apply the field messages, if it exists, or return a message list to show. If it doesn't have a model state return defaultMessage.

* getLocalStorage(id)
   - this function gets the object stored with id

* setLocalStorage(id, obj)
   - this function save the object with id

* removeLocalStorage(id)
   - this function remove the object stored with id

2. **Directives**

* jdSlimScroll
   - apply jquery slim scroll plugin on element

* jdValidateEquals
   - sets an "equals" valdation between two fields, emit flag "equal" on ngModel
   ```html
   <input ng-model="password">
   <input ng-model="confirmPassword" jd-validate-equals="password">
   ```
* jdFullScreenPage
   - should be used on first element of a page to show it in full screen. This directive apply body-wide css class on body element.

* jdDynamicDirective
   - this directive can be used to apply another directive dynamically
   ```html
   <form jd-dynamic-directive="{{myCtrl.myModel.myFlag == true ? 'jd-modal' : 'jd-panel|ng-controller=myCtrl'}}"...
   ```
* jdInterpolateFormat
   - this directive can be used to process a dynamic expression using $interpolate

* jdAsyncValidate
   - this directive can be used to apply asynchronous validation, for example if your validation is processed with rest api.
   ```html
   <input ng-model="cpf" jd-async-validate="checkCpf" jd-async-validate-message="CPF already used by another user">
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
   
* jdSelectSingle
   - this directive can be used inside select to auto-select collections with single item.
   ```html
   <select jd-input 
		jd-select-single="baseCtrl.baseModel.items" 
		jd-options="item as item.name for item in baseCtrl.baseModel.items"
		ng-model="baseCtrl.baseModel.selectItemModel" 
		/>
   ```
  
* jdEnter
   - this directive can be used to run a chosen controller method when the enter key is pressed.

3. **Filters**

* jdSelected:boolFieldName
   - this filter can be used to select the objects on the given list where the chosen field is true
   ```html
   <tr ng-repeat="item in items | selected:'boolFieldName'">
   ```
   - in this case, only items where 'boolFieldName' is equals to 'true' will be repeated

* jdBoolToText
   - translates boolean to text (Yes/No)

* jdTranslate:identifier:value
   - this filter can be used to translate values, it's similar to oracle translate.
   ```html
   {{value:translate:1:'Value 1':2:'Value 2'}}
   ```
* jdCapitalize:text
   - this filter change the first letter to upper case