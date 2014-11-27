var app = angular.module('githubsearch', []);
var language_objects = new Array;

app.controller('SearchController', ['$scope', 'Github', function SearchController($scope, Github) {
    $scope.executeSearch = function executeSearch() {
       Github.findUser($scope.query, function (error, data) {
           if (!error) {
               $scope.user = data;
               Github.getUrl(data.repos_url, function(error, data) {
                   getRepos(data, Github, iterateRepos);
               });
           }
       });
    }
}])

function iterateRepos(object) {
    console.log(object)
}

function getRepos(objects, Github, callback) {
    var i = 0
    function gitForLoop() {
        if (i < objects.length) {
            var languages_url = objects[i].languages_url
            Github.getUrl(languages_url, function(error, data) {
                language_objects.push(data)
            });
            i++
                setTimeout(gitForLoop, 0)
            callback(language_objects)
        }
    }
    gitForLoop(function(){
    });
}



app.factory('Github', function Github($http) {
    return {
        findUser: function findUser(query, callback) {
            $http.get('https://api.github.com/users/' + query )
            .success(function (data) {
                callback(null, data);
            })
            .error(function (e) {
                callback(e);
            });
        },
        getUrl: function getUrl(url, callback) {
            $http.get(url)
            .success(function (data) {
                callback(null, data);
            })
            .error(function (e) {
                callback(e);
            });
        }

    };
});


