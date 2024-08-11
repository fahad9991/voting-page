document.getElementById('teamOneVote').addEventListener('click', function() {
    vote('teamOne');
});

document.getElementById('teamTwoVote').addEventListener('click', function() {
    vote('teamTwo');
});

function vote(team) {
    fetch(`https://your-firebase-function-url/vote?team=${team}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('voteResult').innerText = `تم التصويت لفريق ${team === 'teamOne' ? '1' : '2'} بنجاح!`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('voteResult').innerText = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
    });
}
