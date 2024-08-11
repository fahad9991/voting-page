document.addEventListener('DOMContentLoaded', function() {
    let selectedTeam = '';

    document.getElementById('teamOneSelect').addEventListener('click', function() {
        selectedTeam = 'teamOne';
        document.getElementById('selectedTeamHeader').innerText = 'تصويت لفريق 1';
        document.getElementById('voteSection').style.display = 'block';
    });

    document.getElementById('teamTwoSelect').addEventListener('click', function() {
        selectedTeam = 'teamTwo';
        document.getElementById('selectedTeamHeader').innerText = 'تصويت لفريق 2';
        document.getElementById('voteSection').style.display = 'block';
    });

    document.getElementById('voteButton').addEventListener('click', function() {
        document.getElementById('voteResult').innerText = `تم التصويت لفريق ${selectedTeam === 'teamOne' ? '1' : '2'} بنجاح!`;
    });
});
