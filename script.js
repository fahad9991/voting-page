// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

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

let selectedTeam = null;
const gameId = new URLSearchParams(window.location.search).get('gameId');

document.getElementById('teamOneSelect').addEventListener('click', function() {
    selectedTeam = 'teamOne';
    showVoteSection();
});

document.getElementById('teamTwoSelect').addEventListener('click', function() {
    selectedTeam = 'teamTwo';
    showVoteSection();
});

document.getElementById('voteButton').addEventListener('click', function() {
    voteForTeam(selectedTeam);
});

function showVoteSection() {
    document.getElementById('teamSelection').style.display = 'none';
    document.getElementById('voteSection').style.display = 'block';
    document.getElementById('selectedTeamHeader').innerText = `تصويت لفريق ${selectedTeam === 'teamOne' ? '1' : '2'}`;
}

async function voteForTeam(team) {
    try {
        const voteDocRef = doc(db, "games", gameId, "votes", team);
        const voteDoc = await getDoc(voteDocRef);

        if (!voteDoc.exists()) {
            await setDoc(voteDocRef, { count: 1 });
        } else {
            await updateDoc(voteDocRef, {
                count: increment(1)
            });
        }

        document.getElementById('voteResult').innerText = `تم التصويت لفريق ${team === 'teamOne' ? '1' : '2'} بنجاح!`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('voteResult').innerText = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
    }
}
