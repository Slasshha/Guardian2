angular.module('newsViewer').component('newsList', {
    templateUrl: 'news_list.html',
    bindings: {
        news: '<'
    }
});