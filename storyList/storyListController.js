app.controller( "storyListController", function( $scope, FirebaseService ) {
    $scope.currentPage = 0;
    $scope.topStories = $scope.topStories || [];
    $scope.lastVisited = localStorage.getItem( 'lastVisited' );

    /*
    ** formatIdsArray takes in an array of ids and formats them
    ** into a multi dimensional array where each index is an array
    ** of 20 ids. This will make pagination easier.
    */
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

    /* storyDomain will strip "www." but leave any subdomains */
    var storyDomain = function( url ) {
        var a = document.createElement( 'a' );
        a.setAttribute( 'href', url );
        return a.hostname.replace( "www.", "");
    };

    var storyTimeRelativeToNow = function( timestamp ) {
        return moment.unix( timestamp ).fromNow();
    };

    var retrieveTopStoriesIds = function() {
        var topStoryIds = [];

        return FirebaseService.fetchSnapshot( "topstories" ).then( function( storyIds ) {
            formatIdsArray( storyIds, topStoryIds );
            return topStoryIds;
        });
    };

    var retrieveTopStoriesForCurrentPage = function() {
        $scope.topStories = [];

        retrieveTopStoriesIds().then( function( topStoryIds ) {
            topStoryIds[ $scope.currentPage ].forEach( function( id ) {
                FirebaseService.fetchSnapshot( 'item/' + id ).then( function( story ) {
                    story.domain = storyDomain( story.url );
                    story.relativeTime = storyTimeRelativeToNow( story.time );
                    $scope.topStories.push( story );
                    $scope.$apply();
                });
            });
        });
    };

    var calculateStartingNumber = function() {
        var storiesPerPage = 20;
        return storiesPerPage * ( $scope.currentPage ) + 1;
    }

    $scope.$watch( 'currentPage', function() {
        var startingNumber = calculateStartingNumber();
        var orderedList = document.getElementsByTagName( 'ol' )[ 0 ];
        orderedList.setAttribute( 'start', startingNumber );
        retrieveTopStoriesForCurrentPage();
    });

    var storyClicked = function( id ) {
        $scope.lastVisited = id;
        localStorage.setItem( 'lastVisited', id );
        alert( id );
    }
});
