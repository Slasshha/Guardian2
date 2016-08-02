
(function() {
    var app = angular.module("newsViewer", []);


    var MainController = function($scope, $http, loadNews) {

        var newsDownloaded = function(response) {
            $scope.myData = response;
            console.log(response);
            $scope.numPages = response.data.response.pages;
            $scope.currentPage = response.data.response.currentPage;
            $scope.newsList = response.data.response.results;
            $scope.error = "";

            console.log($scope.newsList.length);

        };

        var onError = function(reason) {
            $scope.error = "Sorry, we couldn't find news for you. Please try again later."
        };
        


        $scope.updateNewsList = function(Event) {

            $scope.currentPageInt = parseInt($scope.currentPage);

            if (  ! Number.isInteger($scope.currentPageInt) ) {
                $scope.error = $scope.currentPage + " is not a valid page number.";
                console.log( Number.isInteger($scope.currentPageInt) );
                console.log($scope.currentPageInt);
            } else
            if ($scope.currentPage < 1 || $scope.currentPage > $scope.numPages) {
                $scope.error = "Page number should be within the range 1-" + $scope.numPages;
            } else  {
                $scope.error = "";
                loadNews.getTopNews($scope.currentPage, newsDownloaded, onError);
				
            }

        };


        $scope.updateNewsPrevious = function() {
            $scope.currentPage = $scope.currentPage - 1;
            loadNews.getTopNews($scope.currentPage, newsDownloaded, onError);

        };

        $scope.updateNewsNext = function() {
            $scope.currentPage = $scope.currentPage + 1;
            loadNews.getTopNews($scope.currentPage, newsDownloaded, onError);

        };

         $scope.refresh = function() {
            
            loadNews.getTopNews(1, newsDownloaded, onError);

        };


    loadNews.getTopNews(1, newsDownloaded, onError);    

    };

   

    
    app.controller("MainController", ["$scope", "$http", "loadNews", MainController]);

    

}());




