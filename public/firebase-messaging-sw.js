
// importScripts("https://www.gstatic.com/firebasejs/3.7.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/3.7.1/firebase-messaging.js")

// console.log('Notification permission granted.2222');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBlqPwHbiD5xJ4Ni2XJR8PY59Pp6YIT-fo",
    authDomain: "test1-f73d3.firebaseapp.com",
    databaseURL: "https://test1-f73d3.firebaseio.com",
    projectId: "test1-f73d3",
    storageBucket: "test1-f73d3.appspot.com",
    messagingSenderId: "840194169268"
  };
  firebase.initializeApp(config);

  // Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
