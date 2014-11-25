var app = angular.module('githubsearch', []);



app.controller('SearchController', ['$scope', 'Github', function SearchController($scope, Github) {
    $scope.executeSearch = function executeSearch() {
       Github.searchRepos($scope.query, function (error, data) {
           if (!error) {
               $scope.repos = data.items;
           }
       });
    }
}])

app.factory('Github', function Github($http) {
    return {
        searchRepos: function searchRepos(query, callback) {
            $http.get('https://api.github.com/search/repositories', { params: { q: query } })
                .success(function (data) {
                    callback(null, data);
                })
                .error(function (e) {
                    callback(e);
                });
        }
    };
});


