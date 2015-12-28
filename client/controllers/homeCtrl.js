app.controller('homeCtrl', function($scope, $http) {

    console.log('home');

    $http.get('/home/getLaptops')
        .then(function (response){
           console.log(response.data);
            $scope.laptops = response.data;
        });

});/**
 * Created by gadi on 12/28/2015.
 */
