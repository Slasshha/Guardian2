// Code goes here
(function() {
  var app = angular.module("newsViewer", []);


  var MainController = function($scope, $http) {

    var newsDownloaded = function(response) {
      $scope.myData = response;
      console.log(response);
      $scope.numPages = response.data.response.pages;
      $scope.currentPage = response.data.response.currentPage;
      $scope.newsList = response.data.response.results;

      console.log($scope.newsList.length);

    };

    var onError = function(reason) {
      $scope.error = "Sorry, we couldn't find news for you. Please try again later."
    };



    var getNews = function(reqPage) {

      $http.get("https://content.guardianapis.com/search?api-key=test&page=" + reqPage)
        .then(newsDownloaded, onError);


    };

    getNews(1);
    
    
    $scope.updateNewsList = function(Event) {
    if (Event.which === 13)
    getNews($scope.currentPage);
    };


    $scope.updateNewsPrevious = function() {
      $scope.currentPage = $scope.currentPage-1;
      getNews($scope.currentPage);

    };

    $scope.updateNewsNext = function() {
      $scope.currentPage = $scope.currentPage+1;
      getNews($scope.currentPage);

    };


   
    

  };



  app.controller("MainController", ["$scope", "$http", MainController]);



}());