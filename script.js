const db = firebase.firestore();
const gameId = "YOUR_GAME_ID"; // Replace with the actual game ID

// Function to update vote counts on the page
function updateVoteCounts(teamOneCount, teamTwoCount) {
    document.getElementById('teamOneVotes').textContent = `Votes: ${teamOneCount}`;
    document.getElementById('teamTwoVotes').textContent = `Votes: ${teamTwoCount}`;
}

// Real-time listener for vote counts
db.collection('games').doc(gameId).collection('votes').onSnapshot((snapshot) => {
    let teamOneCount = 0;
    let teamTwoCount = 0;

    snapshot.forEach((doc) => {
        if (doc.id === 'teamOne') {
            teamOneCount = doc.data().count || 0;
        } else if (doc.id === 'teamTwo') {
            teamTwoCount = doc.data().count || 0;
        }
    });

    updateVoteCounts(teamOneCount, teamTwoCount);
});

// Voting function
function vote(team) {
    const voteRef = db.collection('games').doc(gameId).collection('votes').doc(team);

    return db.runTransaction((transaction) => {
        return transaction.get(voteRef).then((voteDoc) => {
            if (!voteDoc.exists) {
                transaction.set(voteRef, { count: 1 });
            } else {
                const newCount = (voteDoc.data().count || 0) + 1;
                transaction.update(voteRef, { count: newCount });
            }
        });
    }).then(() => {
        document.getElementById('voteResult').innerText = `تم التصويت لفريق ${team === 'teamOne' ? '1' : '2'} بنجاح!`;
    }).catch((error) => {
        console.error('Error:', error);
        document.getElementById('voteResult').innerText = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
    });
}
