'use strict';

angular.module('core').controller('HeaderController', ['$scope',
    function($scope) {
        $scope.isCollapsed = false;

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });
    }
]);
