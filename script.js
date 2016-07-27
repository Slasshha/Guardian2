
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



        /* var getNews = function(reqPage) {

            $http.get("https://content.guardianapis.com/search?api-key=test&page=" + reqPage)
                .then(newsDownloaded, onError);


        };

        getNews(1); */




        $scope.updateNewsList = function(Event) {

            $scope.currentPageInt = parseInt($scope.currentPage);

            if (  ! Number.isInteger($scope.currentPageInt) ) {
                $scope.error = $scope.currentPage + " is not a valid page number.";
                console.log( Number.isInteger($scope.currentPageInt) );
                console.log($scope.currentPageInt);
            } else
            if ($scope.currentPage < 1 || $scope.currentPage > $scope.numPages) {
                $scope.error = "Page number should be within the range 1-" + $scope.numPages;
            } else if (Event.which === 13) {
                $scope.error = "";
                loadNews.getTopNews($scope.currentPage);
            }

        };


        $scope.updateNewsPrevious = function() {
            $scope.currentPage = $scope.currentPage - 1;
            loadNews.getTopNews($scope.currentPage);

        };

        $scope.updateNewsNext = function() {
            $scope.currentPage = $scope.currentPage + 1;
            loadNews.getTopNews($scope.currentPage);

        };


    loadNews.getTopNews(1, newsDownloaded, onError);    

    };

   

    
    app.controller("MainController", ["$scope", "$http", "loadNews", MainController]);

    

}());




