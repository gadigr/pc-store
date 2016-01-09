module.exports = function(app) {
    var home = require('../controllers/home');
    app.route('/')
        .get(home.render);

    app.route('/home')
        .get(home.render);

    app.route('/home/GetLaptops')
        .get(home.getAllLaptops);

    app.route('/home/get_att/:att')
        .get(home.getSearchValues);

    app.route('/home/get_brands')
        .get(home.getBrands);

    app.route('/home/adv_search/')
        .post(home.advancedSearch);

    //app.route('/home/GetMovies/:qry/:director/:genre/:minPrice/:maxPrice/:minYear/:maxPrice')
    //    .get(home.getMovies);
    //
    //app.route('/home/GetAllDirectors')
    //    .get(home.allDirectors);
}
