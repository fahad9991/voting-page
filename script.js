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
const db = firebase.firestore();

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

document.addEventListener('DOMContentLoaded', function() {
    const teamOneNameElem = document.getElementById('teamOneName');
    const teamTwoNameElem = document.getElementById('teamTwoName');
    const questionPointsElem = document.getElementById('questionPoints');
    const questionCategoryElem = document.getElementById('questionCategory');
    const questionInfoElem = document.getElementById('questionInfo');
    const voteSectionElem = document.getElementById('voteSection');
    let selectedTeam = '';

    // Fetch game data
    db.collection('games').doc(gameId).get().then(doc => {
        if (doc.exists) {
            const gameData = doc.data();
            teamOneNameElem.textContent = gameData.teamOneName;
            teamTwoNameElem.textContent = gameData.teamTwoName;

            if (gameData.currentQuestion) {
                questionPointsElem.textContent = gameData.currentQuestion.points;
                questionCategoryElem.textContent = gameData.currentQuestion.category;
                questionInfoElem.style.display = 'block';
            }
        } else {
            console.log('No such document!');
        }
    }).catch(error => {
        console.log('Error getting document:', error);
    });

    document.getElementById('teamOneSelect').addEventListener('click', function() {
        selectedTeam = 'teamOne';
        voteSectionElem.style.display = 'block';
        document.getElementById('selectedTeamHeader').textContent = `التصويت لفريق ${teamOneNameElem.textContent}`;
    });

    document.getElementById('teamTwoSelect').addEventListener('click', function() {
        selectedTeam = 'teamTwo';
        voteSectionElem.style.display = 'block';
        document.getElementById('selectedTeamHeader').textContent = `التصويت لفريق ${teamTwoNameElem.textContent}`;
    });

    document.getElementById('voteButton').addEventListener('click', function() {
        if (!selectedTeam) return;

        const votesRef = db.collection('games').doc(gameId).collection('votes');
        votesRef.get().then(snapshot => {
            if (snapshot.empty) {
                votesRef.add({ team: selectedTeam }).then(() => {
                    document.getElementById('voteResult').textContent = `تم التصويت لفريق ${selectedTeam === 'teamOne' ? teamOneNameElem.textContent : teamTwoNameElem.textContent} بنجاح!`;
                });
            } else {
                document.getElementById('voteResult').textContent = 'تم التصويت بالفعل!';
            }
        }).catch(error => {
            console.error('Error voting:', error);
            document.getElementById('voteResult').textContent = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
        });
    });
});
