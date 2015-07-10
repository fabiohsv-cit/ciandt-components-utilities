"use strict";

define(['slimscroll', 'angular'], function (app) {
    angular.module("ciandt.components.utilities.directives", []).directive("appSlimScroll", [function () {
        return {
            restrict: "A",
            link: function (scope, ele, attrs) {
                return ele.slimScroll({
                    height: attrs.scrollHeight || "100%"
                });
            }
        };
    }]).directive("appValidateEquals", [function () {
        return {
            require: "ngModel",
            link: function (scope, ele, attrs, ngModelCtrl) {
                var me = attrs.ngModel;
                var matchTo = attrs.validateEquals;

                scope.$watch(me, function (value) {
                    if (value) {
                        ngModelCtrl.$setValidity('equal', scope.$eval(me) === scope.$eval(matchTo));
                    } else {
                        ngModelCtrl.$setValidity('equal', true);
                    }
                });

                scope.$watch(matchTo, function (value) {
                    ngModelCtrl.$setValidity('equal', scope.$eval(me) === scope.$eval(matchTo));
                });
            }
        }
    }]).directive("appFullScreenPage", function () {
        return {
            restrict: "A",
            controller: ["$scope", "$element", "$location", function ($scope, $element, $location) {
                jQuery('body').addClass('body-wide');

                $scope.$watch(function () {
                    return $location.path();
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        jQuery('body').removeClass('body-wide');
                    }
                });
            }]
        };
    }).directive('appDynamicDirective', ['$compile', '$interpolate', function ($compile, $interpolate) {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var appDynamicDirective = element.attr('app-dynamic-directive');
                element.removeAttr('app-dynamic-directive');
                if (appDynamicDirective) {
                    // remove conteúdo do elemento para aplicar as diretivas e recompilar
                    var children = element.children();
                    element.empty();
                    return {
                        pre: function (scope, element) {
                            // atribui as diretivas novas
                            if (appDynamicDirective.indexOf('{{') > -1) {
                                appDynamicDirective = $interpolate(appDynamicDirective)(scope);
                            }
                            var _attrs = appDynamicDirective.split('|');
                            angular.forEach(_attrs, function (_attr) {
                                var _attr = _attr.split('=');
                                element.attr(_attr[0], _attr.length > 1 ? _attr[1] : '');
                            });
                        },
                        post: function (scope, element) {
                            // adiciona o conteúdo do elemento novamente
                            element.append(children);
                            // recompila
                            $compile(element)(scope);
                        }
                    };
                }
            }
        }
    }]).directive('appInterpolateFormat', ['$interpolate', function ($interpolate) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                //TODO henriqueb adicionar capacidade de lidar com arrays e etc - improvement
                var appInterpolateFormat = element.attr('app-interpolate-format');
                ngModel.$formatters.push(function (value) {
                    return $interpolate(appInterpolateFormat)(value);
                });
            }
        };
    }]).directive('appAsyncValidate', ['$q', function ($q) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                if (attrs.appAsyncValidateMessage) {
                    ctrl.$asyncValidators.appAsyncValidate = function (modelValue, viewValue) {
                        return $q(function (resolve, reject) {
                            scope.$eval(attrs.appAsyncValidate)(modelValue, viewValue, resolve, reject);
                        });
                    };
                }
            }
        };
    }]).directive('appEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.appEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
});