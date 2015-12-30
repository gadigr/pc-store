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

    //app.route('/home/GetMovies/:qry/:director/:genre/:minPrice/:maxPrice/:minYear/:maxPrice')
    //    .get(home.getMovies);
    //
    //app.route('/home/GetAllDirectors')
    //    .get(home.allDirectors);
}
