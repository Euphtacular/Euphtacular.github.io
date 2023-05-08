const letters = document.querySelectorAll('.letter-box');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

console.log(letters);

async function init() {
    let currentGuess = '';
    let currentRow = 0;

    const res = await fetch("http://words.dev-apis.com/word-of-the-day");
    const fresObj = await res.json();
    const word = resObj.word.toUpperCase();
    setLoading(false);

    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            currentGuess += letter;
        } else {
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }

        letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
    }

    async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            // do nothing
        }

        currentRow++;
        currentGuess = '';
    }

    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    }

    document.addEventListener('keydown', function handleKeyPress (event) {
        const action = event.key;

        console.log(action);

        if (action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            // do nothing
        }
    });
   
    function isLetter(letter) {
        return /^[a-zA-Z]$/.test(letter);
}
}

function nextLetter(current, nextBoxID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextBoxID).focus();
    }
}
window.onload = function () {
    var firstBox = document.getElementById('letter-one-one');
    firstBox.focus();
    firstBox.select();
}

function setLoading(isLoading) {
    loadingDiv.classList.toggle('hidden', !isLoading);
}

init ();