'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http',
    function($scope, $http) {

        $scope.submit = 'Submit';

        /**
         * Submits the form
         */
        $scope.submitForm = function (e) {
            if ($scope.contact.$valid) {
                $scope.submit = 'Please wait...';
                $scope.success = null;
                $scope.error = null;

                // make the request
                $http.post('/contact_requests.json', $scope.data)
                    .success(function (response) {
                        $scope.data = null;
                        $scope.success = 'Thank you for your message, we will get in touch with you shortly';
                        $scope.reset($scope.contact);
                    })
                    .error(function (response) {
                        $scope.error = response.message;
                        $scope.submit = 'Submit';
                    });
            }
        };

        /**
         * Reset form after submission
         */
        $scope.reset = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }

            $scope.submit = 'Submit';
            $scope.data = angular.copy({});
        };

        $scope.reset();
    }
]);
