app.controller('homeCtrl', function($scope, $http) {

    $scope.search = {};
    $scope.selection = [];
    $scope.filter = {};
    $scope.filter.att_brand = [];

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

    $http.get('/home/get_brands')
        .then(function (response){
            $scope.search.brands = response.data;
            //$scope.filter.att_brand = $scope.search.brands;
        });
    $http.get('/home/get_att/att_cpu')
        .then(function (response){
            $scope.search.cpus = response.data;
            //$scope.filter.att_cpu = $scope.search.cpus;
        });
    $http.get('/home/get_att/att_screen_size')
        .then(function (response){
            $scope.search.screens = response.data;
            //$scope.filter.att_screen_size = $scope.search.screens;
        });


    $http.get('http://api.openweathermap.org/data/2.5/weather?q=ramat&units=metric&appid=ebef723e3d1bc29c60a071f1b0d2278e')
        .then(function (response) {
            $scope.weather = response.data.main.temp + "℃ - " + response.data.weather[0].description;
        });

    $scope.clear = function(){
        angular.forEach($scope.search.brands, function (item) {
            item.Selected = false;
        });

        $scope.filter.att_cpu = undefined;
        $scope.filter.att_screen_size = undefined;

        $http.get('/home/getLaptops')
            .then(function (response){
                console.log(response.data);
                $scope.laptops = response.data;
            });
    };

    $scope.doQuery = function(filter){
        var selectedItems = $scope.search.brands.filter(function (item) {
            return item.Selected;
        });
        filter.att_brand = selectedItems.map(function (o){ return o._id});

      console.log(filter);
        $http.post('/home/adv_search/', filter)
            .then(function (response){
                $scope.laptops = response.data;
            });
    };
});
