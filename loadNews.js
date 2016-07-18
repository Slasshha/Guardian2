(function() {

	var module = angular.module("newsViewer");

	 module.service('loadNews', [ "$http", function ($http) {

        this.getTopNews = function(reqPage, newsDownloaded, onError) {
            $http.get("https://content.guardianapis.com/search?api-key=test&page=" + reqPage)
                .then(newsDownloaded, onError);
        }; 
    } ] 
    );

	

}());
   





   