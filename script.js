// Firebase configuration
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
firebase.initializeApp(firebaseConfig);

// Get Firestore instance
const db = firebase.firestore();

// Extract gameId from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

// References to DOM elements
const teamOneNameSpan = document.getElementById('teamOneName');
const teamTwoNameSpan = document.getElementById('teamTwoName');
const teamOneVoteButton = document.getElementById('teamOneVote');
const teamTwoVoteButton = document.getElementById('teamTwoVote');
const voteResult = document.getElementById('voteResult');

// Fetch game data and update team names
db.collection("games").doc(gameId).get().then((doc) => {
    if (doc.exists) {
        const gameData = doc.data();
        teamOneNameSpan.innerText = gameData.teamOneName;
        teamTwoNameSpan.innerText = gameData.teamTwoName;
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

// Voting logic
teamOneVoteButton.addEventListener('click', function() {
    vote('teamOne');
});

teamTwoVoteButton.addEventListener('click', function() {
    vote('teamTwo');
});

function vote(team) {
    const voteRef = db.collection("games").doc(gameId).collection("votes").doc("firstVote");

    voteRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Vote already exists, team: ", doc.data().team);
            voteResult.innerText = `تم التصويت بالفعل من قبل الفريق الآخر.`;
        } else {
            voteRef.set({ team: team }).then(() => {
                console.log("Vote recorded for team: ", team);
                voteResult.innerText = `تم التصويت لفريق ${team === 'teamOne' ? '1' : '2'} بنجاح!`;
                document.getElementById('teamOneVote').disabled = true;
                document.getElementById('teamTwoVote').disabled = true;
            }).catch((error) => {
                console.error("Error recording vote:", error);
                voteResult.innerText = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
            });
        }
    }).catch((error) => {
        console.error("Error checking vote existence:", error);
        voteResult.innerText = 'حدث خطأ أثناء التحقق من التصويت. حاول مرة أخرى.';
    });
}

