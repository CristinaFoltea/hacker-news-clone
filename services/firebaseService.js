app.service( 'FirebaseService', [ function() {
    var version = "/v0/";

    this.fetchSnapshot = function( uri ) {
        return firebase.database().ref( version + uri ).once( 'value' ).then( function( snapshot ) {
            return snapshot.val();
        });
    };

    this.fetchEntireItemTree = function( itemId ) {
        return firebase.database().ref( version + 'item/' + itemId ).once( 'value' ).then( function( snapshot ) {
            return snapshot.val();
        });
    };
}]);
