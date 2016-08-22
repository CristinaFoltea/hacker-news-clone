app.directive( 'listItem', function() {
    return {
        scope: {
            listItem: '=listItem'
        },
        templateUrl: 'listItem.html'
    };
});
