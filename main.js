/**
 * Handles the sign in button press.
 */
function toggleSignIn() {

  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } 
  else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
    }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
     } 
     var check = 0;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          normalBtn();
          check = 1;
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            normalBtn();
            alert('Wrong password.');
            console.log(check);
          } else {
            check = 1;
            normalBtn();
            console.log(errorMessage);
            alert("Sorry try again!")
            
          }
          check = 1;
          console.log(error);
        });

        if (check === 0) {        
          console.log("Signed In")

          $('#btn-login').remove();
          var dummy = '<button id="btn-login" class="btn btn-success btn-xs"><i class="fa fa-circle-o-notch fa-spin"></i> Loading</button>\r\n';
          document.getElementById('btn-singIn').innerHTML += dummy
        }

    // $('#btn-login').remove();
    // var dummy = '<button id="btn-login" class="btn btn-success btn-xs"><i class="fa fa-circle-o-notch fa-spin"></i> Loading</button>\r\n';
    // document.getElementById('btn-singIn').innerHTML += dummy

    firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location = 'home.html'; //After successful login, user will be redirected to home.html
    		normalBtn();
        }
  	});
  
  }
}


function normalBtn() {
  // body...

  $('#btn-login').remove();
          var dummy = '<input type="button" name="" id="btn-login" class="btn btn-success" onclick="toggleSignIn()" value="Login">\r\n';
          document.getElementById('btn-singIn').innerHTML += dummy
}

//Singup

function handleSignUp() {
      var check = 0;

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var cpassword = document.getElementById('cpassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      if (password.localeCompare(cpassword)!=0) {
      	alert('password not matching');
      	return;
      }

      
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          console.log(errorMessage);
        }
        console.log(error);
        check = 1;
      });

      if (check == 0) {
        alert("created")
        window.location = 'index.html';
      }

      

    }

function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];



      window.location = 'index.html'; //After successful login, user will be redirected to home.html

    }
