import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAnH6PWV3E6pB81Jpv_4MOJNzJRexbzib4",
    authDomain: "simple-app-dbdd8.firebaseapp.com",
    projectId: "simple-app-dbdd8",
    storageBucket: "simple-app-dbdd8.appspot.com",
    messagingSenderId: "528354660695",
    appId: "1:528354660695:web:736bfcd91412170e8bae12",
    measurementId: "G-Q4SJQ9QFE9"
  };

var fire = firebase.initializeApp(firebaseConfig);
export default fire;


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyAnH6PWV3E6pB81Jpv_4MOJNzJRexbzib4",
//     authDomain: "simple-app-dbdd8.firebaseapp.com",
//     projectId: "simple-app-dbdd8",
//     storageBucket: "simple-app-dbdd8.appspot.com",
//     messagingSenderId: "528354660695",
//     appId: "1:528354660695:web:736bfcd91412170e8bae12",
//     measurementId: "G-Q4SJQ9QFE9"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>