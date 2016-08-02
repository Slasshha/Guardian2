
(function() {
    var app = angular.module("newsViewer", []);

    var MainController = function($scope, $http, loadNewsService) {
        $scope.currentPage = 1;
        $scope.error = "";
        $scope.numPages = null;
        $scope.currentPage = null;
        $scope.newsList = null;
         
        var loadNewsList = function() {
            loadNewsService
                .getTopNews($scope.currentPage)
                .then(newsDownloaded, onError);
        };

        var newsDownloaded = function(data) {
            $scope.numPages = data.response.pages;
            $scope.currentPage = data.response.currentPage;
            $scope.newsList = data.response.results;
            $scope.error = "";
        };

        var onError = function(reason) {
            $scope.error = "Sorry, we couldn't find news for you. Please try again later."
        };
        
        $scope.updateNewsList = function() {
            $scope.currentPageInt = parseInt($scope.currentPage);

            if (!Number.isInteger($scope.currentPageInt)) {
                $scope.error = $scope.currentPage + " is not a valid page number.";
            } else if ($scope.currentPage < 1 || $scope.currentPage > $scope.numPages) {
                $scope.error = "Page number should be within the range 1-" + $scope.numPages;
            } else  {
                $scope.error = "";
                loadNewsList();
            }
        };

        $scope.updateNewsPrevious = function() {
            $scope.currentPage -= 1;
            loadNewsList();
        };

        $scope.updateNewsNext = function() {
            $scope.currentPage += 1;
            loadNewsList();
        };

        $scope.refresh = function() {
            $scope.currentPage = 1;
            loadNewsList();
        };

        loadNewsList();    
    };
    
    app.controller("MainController", ["$scope", "$http", "loadNewsService", MainController]);
}());




