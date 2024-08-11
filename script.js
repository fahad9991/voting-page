// Assuming you have the team names from your game logic, let's say:
const teamOneName = "التفاحة الصاروخية";  // Replace with actual game data
const teamTwoName = "الفريق الثاني";      // Replace with actual game data

document.getElementById('teamOneName').textContent = teamOneName;
document.getElementById('teamTwoName').textContent = teamTwoName;

document.getElementById('teamOneSelect').addEventListener('click', function() {
    selectTeam('teamOne', teamOneName);
});

document.getElementById('teamTwoSelect').addEventListener('click', function() {
    selectTeam('teamTwo', teamTwoName);
});

function selectTeam(team, teamName) {
    document.getElementById('teamSelection').style.display = 'none';
    document.getElementById('voteSection').style.display = 'block';
    document.getElementById('selectedTeamHeader').textContent = `التصويت لفريق ${teamName}`;
    
    document.getElementById('voteButton').addEventListener('click', function() {
        vote(team);
    });
}

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
