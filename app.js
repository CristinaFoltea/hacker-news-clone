var app = angular.module( "hackerNewsApp", [] );
var config = {
    databaseURL: "https://hacker-news.firebaseio.com"
};

firebase.initializeApp( config );
