"use strict";

define(['angular'], function () {

    angular.module("ciandt.components.utilities.filters", []).filter('selected', function () {
        return function (list, field) {
            if (!field) {
                field = 'selected';
            }
            return _.filter(list, function (item) { return item[field] == true });
        };
    }).filter('boolToText', function () {
        return function (boolValue) {
            if (boolValue === true)
                return "Sim";
            else
                return "Não";
        }
    }).filter('translate', function () {
        return (function (value) {
            //arguments[0] é ignorado porque é igual ao 'value' recebido pelo parâmetro.
            //Estrutura para entendimento: 
            //-> arguments em uma posição(i) ímpar é o valor que será comparado com o 'value'
            //-> caso seja igual, retorno o texto(string) associado a esse valor, que é arguments[i + 1].
            //Exemplo:
            //arguments[1] == true e arguments[2] == 'Sim'
            for (var i = 1; i < arguments.length; i = i + 2) {
                if (arguments[i] === value) {
                    return arguments[i + 1];
                }
            }
        })
    }).filter('capitalize', function () {
        return function (input) {
            return input.charAt(0).toUpperCase() + input.substr(1);
        }
    });
});