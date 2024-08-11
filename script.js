// استخراج القيم من الرابط
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const points = urlParams.get('points');
const category = urlParams.get('category');

// عرض المعلومات المستلمة على الصفحة
document.getElementById('questionPoints').innerText = `قيمة السؤال: ${points} نقطة`;
document.getElementById('questionCategory').innerText = `فئة السؤال: ${category}`;




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


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function vote(team) {
    const voteRef = db.collection("games").doc(gameId).collection("votes").doc("firstVote");

    voteRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Vote already exists, team: ", doc.data().team);
            document.getElementById('voteResult').innerText = `تم التصويت بالفعل من قبل الفريق الآخر.`;
        } else {
            voteRef.set({ team: team }).then(() => {
                console.log("Vote recorded for team: ", team);
                document.getElementById('voteResult').innerText = `تم التصويت لفريق ${team === 'teamOne' ? '1' : '2'} بنجاح!`;
                document.getElementById('teamOneVote').disabled = true;
                document.getElementById('teamTwoVote').disabled = true;
            }).catch((error) => {
                console.error("Error recording vote:", error);
                document.getElementById('voteResult').innerText = 'حدث خطأ أثناء التصويت. حاول مرة أخرى.';
            });
        }
    }).catch((error) => {
        console.error("Error checking vote existence:", error);
        document.getElementById('voteResult').innerText = 'حدث خطأ أثناء التحقق من التصويت. حاول مرة أخرى.';
    });
}
