const firebaseConfig = {
    apiKey: "AIzaSyANU7_s7cWyi9-jbuHCECJZ8t41p4_XXzI",
    authDomain: "dailybread-30424.firebaseapp.com",
    databaseURL: "https://dailybread-30424-default-rtdb.firebaseio.com",
    projectId: "dailybread-30424",
    storageBucket: "dailybread-30424.appspot.com",
    messagingSenderId: "504484265726",
    appId: "1:504484265726:web:f37678251276cb5c1befaf",
    measurementId: "G-59L66WFCK3"
};

const app = firebase.initializeApp(firebaseConfig);
console.log(app);


function ready() {
    const newUser = {
        fname : document.getElementById('fname').value,
        lname : document.getElementById('lname').value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value,
        pass : document.getElementById('pass').value,
        join : document.getElementById('join').value,
    }
    const db = firebase.firestore();
    const outcome = db.collection('users').add(newUser);
    alert("test0");
    outcome.then ( (ref) => {
        alert("tes1");
        console.log(ref);
        alert("test2");
    }) .catch((error) => {
        console.log(error);
    })
}
   

