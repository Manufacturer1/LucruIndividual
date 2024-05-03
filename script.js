let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const maxScorePerQuestion = 10;
let totalScore = 0;

function showQuestion(index) {
    questions.forEach((question, i) => {
        if (i === index) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });

    if (index === 0) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline-block';
    }

    if (index === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

document.getElementById('securityTestForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let answeredQuestions = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('select').value;
        if (selectedOption !== '') {
            answeredQuestions++;
            if (selectedOption === 'yes') {
                totalScore += maxScorePerQuestion;
            }
        }
    });

    const totalQuestions = questions.length;
    const maximumPossibleScore = totalQuestions * maxScorePerQuestion;
    const percentageAchieved = (totalScore / maximumPossibleScore) * 100;
    const percentageFailure = 100 - percentageAchieved;

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
        <p>Total achieved score: ${totalScore}</p>
        <p>Total possible score: ${maximumPossibleScore}</p>
        <p>Total questions answered: ${answeredQuestions} out of ${totalQuestions}</p>
        <p>Company ISO 27001 percentage failure: ${percentageFailure.toFixed(2)}%</p>
    `;
});

showQuestion(currentQuestion);
