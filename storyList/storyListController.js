app.controller( "storyListController", function( $scope, FirebaseService ) {
    $scope.currentPage = 0;
    $scope.topStories = $scope.topStories || [];

    var formatIdsArray = function( ids, topStoryIds ) {
        var count = 0;
        var values = [];
        ids.forEach( function( id ) {
            if ( count < 20 ) {
                values.push( id );
                count++;
            }
            else {
                topStoryIds.push( values );
                count = 0;
                values = [];
            }
        });
    };

    var retrieveTopStoriesIds = function() {
        var topStoryIds = [];

        return FirebaseService.fetchSnapshot( "topstories" ).then( function( storyIds ) {
            formatIdsArray( storyIds, topStoryIds );
            return topStoryIds;
        });
    };

    var retrieveTopStoriesForCurrentPage = function() {
        var topStories = [];

        retrieveTopStoriesIds().then( function( topStoryIds ) {
            topStoryIds[ $scope.currentPage ].forEach( function( id ) {
                FirebaseService.fetchSnapshot( 'item/' + id ).then( function( story ) {
                    if ( story.kids ) {
                        story.comments = [];
                        story.kids.forEach( function( commentId ) {
                            FirebaseService.fetchSnapshot( 'item/' + commentId ).then( function( comment ) {
                                story.comments.push( comment );
                            });
                        });
                    }

                    topStories.push( story );
                });
            });
        });
        console.log( topStories );
        return topStories;
    };

    $scope.topStories[ $scope.currentPage ] = retrieveTopStoriesForCurrentPage();
});
