var Ref = new Firebase("https://firepower.firebaseio.com");

private getUser(): void {
            if (!this.currentAuth) {
                return;
            }
            this.Ref.child('users').child(this.currentAuth.uid).once('value', function(snapshot) {
                  Gebruiker.prototype.makeUser(snapshot.val())             
            });
        }

        private makeUser(data) {
            var _achterNaam: string;
            var _email: string;
            var _voorNaam: string;
           
            /**
             * deze gebruik ik nu om geguser wat zichtbaar te maken voor ontwikkeling
             * hierna gewoon var x = data gebruiken
             */
            //Gebruiker.prototype.gegUser = data;
            this.gegUser = data;
            var x = this.gegUser;
            //alert(x.achterNaam)
            switch (x.provider) {
                case 'password':

                    if (!x.achterNaam) {
                        _achterNaam = '';
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = '';
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = x.password.email;
                    }
                    else {
                        _email = x.email;
                    }
                    break;

                case 'facebook':
                    if (!x.achterNaam) {
                        _achterNaam = x.facebook.cachedUserProfile.last_name;
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = x.facebook.cachedUserProfile.first_name;
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = x.facebook.cachedUserProfile.email;
                    }
                    else {
                        _email = x.email;
                    }

                    break;

                case 'google':
                    if (x.achterNaam === undefined) {
                        _achterNaam = x.google.cachedUserProfile.family_name;
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = x.google.cachedUserProfile.given_name;
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = '';
                    }
                    else {
                        _email = x.email;
                    }

                    break;

                //default:
                case undefined:
                if (!x.achterNaam) {
                        _achterNaam = '';
                    }
                    else {
                        _achterNaam = x.achterNaam;
                    }
                    if (!x.voorNaam) {
                        _voorNaam = '';
                    }
                    else {
                        _voorNaam = x.voorNaam;
                    }
                    if (!x.email) {
                        _email = '';
                    }
                    else {
                        _email = x.email;
                    }
                    break;
                    break;
            }

            this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
        }
        
         "users": {
     // "$user_id": {
        // grants write access to the owner of this user account
        // whose uid must exactly match the key ($user_id)
       // ".write": "$user_id === auth.uid",
       ".write": true,
        ".read": true
      //}
    },
    
    "halterSchijven": {
       ".write": true,
        ".read": true
    
   },
    
    "metingSoorten": {
      
        ".write": true,
        ".read": true
      
    },
    "oefeningen": {
      
        ".write": true,
        ".read": true
      
    },
    "oneRepMaxen": {
      
        ".write": true,
        ".read": true
      
    },
    "trainingen": {
       ".write": true,
        ".read": true
    
   },
    
    "trainingsMethodes": {
       ".write": true,
        ".read": true
    
   },
    "trainingsSchemas": {
       ".write": true,
        ".read": true
    
   }
   
  }