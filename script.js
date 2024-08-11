// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, increment } from "firebase/firestore";

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

// Get the gameId from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

// Function to get team names from Firestore
async function getTeamNames(gameId) {
    const gameDoc = await getDoc(doc(db, "games", gameId));
    if (gameDoc.exists()) {
        const gameData = gameDoc.data();
        const teamOneName = gameData.teamOneName;
        const teamTwoName = gameData.teamTwoName;
        
        document.getElementById('teamOneName').innerText = teamOneName;
        document.getElementById('teamTwoName').innerText = teamTwoName;

        // Attach event listeners for voting
        document.getElementById('teamOneSelect').addEventListener('click', function() {
            showVoteSection(teamOneName);
        });

        document.getElementById('teamTwoSelect').addEventListener('click', function() {
            showVoteSection(teamTwoName);
        });
    } else {
        console.log("No such game!");
    }
}

// Function to show the voting section
function showVoteSection(selectedTeam) {
    document.getElementById('teamSelection').style.display = 'none';
    document.getElementById('voteSection').style.display = 'block';
    document.getElementById('selectedTeamHeader').innerText = `تصويت لفريق ${selectedTeam}`;
    
    // Voting button action
    document.getElementById('voteButton').addEventListener('click', function() {
        voteForTeam(selectedTeam);
    });
}

// Function to register the vote
async function voteForTeam(teamName) {
    const voteRef = doc(db, "games", gameId, "votes", teamName);
    await updateDoc(voteRef, {
        count: increment(1)
    });
    document.getElementById('voteResult').innerText = `تم التصويت لفريق ${teamName} بنجاح!`;
}

// Get team names when the page loads
getTeamNames(gameId);
