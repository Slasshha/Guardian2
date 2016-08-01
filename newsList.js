function NewsListController($scope, $element, $attrs) {
  var ctrl = this;
  
  ctrl.$onInit = function() {
	console.log('init component');
  }
 }
  
angular.module('newsViewer').component('newsList', {
    templateUrl: 'news_list.html',
    controller: NewsListController,
    bindings: {
        news: '<'
    }
});