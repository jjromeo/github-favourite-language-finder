var app = angular.module('githubsearch', []);

app.controller('SearchController', function($scope) {
})

app.factory('Github', function($http) {
    return {
    };
});

searchRepos: function(query, callback){
    $http.get('https://api.github.com/search/repositories', { params: {q: query} })
        .success(function(data) {
            callback(null, data);
        })
        .error(function(e) {
            callback(e);
        });
}
