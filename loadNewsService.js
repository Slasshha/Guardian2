(function() {

	var module = angular.module("newsViewer");

	 module.service('loadNewsService', [ "$http", function ($http) {

        this.getTopNews = function(reqPage) {
            return $http.get("https://content.guardianapis.com/search", {
	            	params: {
		            	'api-key': 'test',
		            	'page': reqPage
		            }
	            })
                .then(function (responce) {
                	return responce.data;
                });
        }; 
    } ] 
    );

	

}());
   





   