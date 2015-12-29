app.controller('homeCtrl', function($scope, $http) {

    $scope.search = {};

    // build canvas
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";

    // build gradient
    var gradient=ctx.createLinearGradient(0,0,c.width,0);
    gradient.addColorStop("0",'white');
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","white");

    // Fill with gradient
    ctx.fillStyle=gradient;
    ctx.fillText("Laptops'R'Us!",9,35);

    $http.get('/home/getLaptops')
        .then(function (response){
           console.log(response.data);
            $scope.laptops = response.data;
        });

    $http.get('/home/get_att/att_brand')
        .then(function (response){
            console.log(response);
            $scope.search.brands = response.data;
        })

});
