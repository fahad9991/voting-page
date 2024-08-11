// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCalPSOGndsWNRXCS2MWFZ_vaeSXEQVqlE",
  authDomain: "triviakw-dfe7f.firebaseapp.com",
  databaseURL: "https://triviakw-dfe7f-default-rtdb.firebaseio.com",
  projectId: "triviakw-dfe7f",
  storageBucket: "triviakw-dfe7f.appspot.com",
  messagingSenderId: "274369788646",
  appId: "1:274369788646:web:76b8cae5bcf9d404fd1927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get gameId from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

// Fetch game details
const gameDocRef = doc(db, "games", gameId);
getDoc(gameDocRef).then((docSnap) => {
  if (docSnap.exists()) {
    const gameData = docSnap.data();
    
    // Display team names
    document.getElementById('teamOneVote').innerText = `فريق 1: ${gameData.teamOneName}`;
    document.getElementById('teamTwoVote').innerText = `فريق 2: ${gameData.teamTwoName}`;
    
    // Display category and points
    document.getElementById('category').innerText = gameData.currentCategory || 'غير محدد';
    document.getElementById('points').innerText = gameData.currentPoints || '0';
  } else {
    console.log("No such game!");
  }
}).catch((error) => {
  console.log("Error getting game document:", error);
});

document.getElementById('teamOneVote').addEventListener('click', function() {
    vote('teamOne');
});

document.getElementById('teamTwoVote').addEventListener('click', function() {
    vote('teamTwo');
});

function vote(team) {
    const voteDocRef = doc(db, "games", gameId, "votes", team);
    
    setDoc(voteDocRef, { team: team }, { merge: true })
    .then(() => {
        document.getElementById('voteResult').innerText = `تم التصويت لفريق ${team === 'teamOne' ? '1' : '2'} بنجاح!`;
        document.getElementById('teamSelection').style.display = 'none';
        document.getElementById('voteSection').style.display = 'block';
    })
    .catch((error) => {
        console.error('Error during voting:', error);
        document.getElementById('voteResult').innerText = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
    });
}
