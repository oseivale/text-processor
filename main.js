var textProcessorForm = document.getElementById('text-processor-form')
var tableBody = document.getElementById('table-body')
var tableBodyAlphaSorted = document.getElementById('table-body-alpha-sorted')
var tableBodyNumberSorted = document.getElementById('table-body-number-sorted')
var textBoxContent = document.getElementById('text-content')
var wordCount = document.getElementById('word-count')
var alphaSortBtn = document.getElementById('alpha-sort')
var numberSortBtn = document.getElementById('number-sort')

// State that we want to manage:
function initState() {
    let wordList = []
    let words = []

    return {
        getTotalWordCount: () => wordList.length > 0 ? wordList.length : 0,
        getWordList: () => {
            const textReducer = (acc, curr) => {
                if (!acc.hasOwnProperty(curr)) {
                    acc[curr] = 1
                } else {
                    acc[curr] += 1
                }
                return acc
            }

            tableBody.style.display = ""
            tableBodyAlphaSorted.style.display = "none"
            tableBodyNumberSorted.style.display = "none"

            wordList = textBoxContent.value.split(" ").map(word => (
                word.replace(/[^A-Za-z0-9]/g, "").toLowerCase()
            ))

            const processedText = wordList.reduce(textReducer, {})

            for (const [key, value] of Object.entries(processedText)) {
                words.push({
                    name: key, amount: value
                })
            }
            return words
        },
        getSortedWords: () => {
            function compareNames(a, b) {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            }
            tableBodyAlphaSorted.style.display = ""
            tableBody.style.display = "none"
            tableBodyNumberSorted.style.display = "none"
            return words.sort(compareNames);
        },
        getSortedNumbers: () => {
            function compareNumbers(a, b) {
                const numA = a.amount;
                const numB = b.amount;

                if (numA < numB) {
                    return -1;
                }
                if (numA > numB) {
                    return 1;
                }
                return 0;
            }
            tableBodyNumberSorted.style.display = ""
            tableBody.style.display = "none"
            tableBodyAlphaSorted.style.display = "none"
            return words.sort(compareNumbers);
        },
        getWordsByFirstLetter: () => {

        }

    }
}

// Initialize state
const appState = initState()

function alphaFilter(event) {
    event.preventDefault()

    appState.getSortedWords().map(word => {

        var newTableRow = document.createElement('tr')
        var dataName = document.createElement('td')
        var dataAmount = document.createElement('td')

        newTableRow.appendChild(dataName).innerHTML = word.name
        newTableRow.appendChild(dataAmount).innerHTML = word.amount

        tableBodyAlphaSorted.appendChild(newTableRow)
    })
    wordCount.innerText = appState.getTotalWordCount()
}

function submitForm(event) {
    event.preventDefault()

    appState.getWordList().map(word => {

        var newTableRow = document.createElement('tr')
        var dataName = document.createElement('td')
        var dataAmount = document.createElement('td')

        newTableRow.appendChild(dataName).innerHTML = word.name
        newTableRow.appendChild(dataAmount).innerHTML = word.amount

        tableBody.appendChild(newTableRow)
    })

    wordCount.innerText = appState.getTotalWordCount()
}

function numberFilter(event) {
    event.preventDefault()

    appState.getSortedNumbers().map(word => {

        var newTableRow = document.createElement('tr')
        var dataName = document.createElement('td')
        var dataAmount = document.createElement('td')

        newTableRow.appendChild(dataName).innerHTML = word.name
        newTableRow.appendChild(dataAmount).innerHTML = word.amount

        tableBodyNumberSorted.appendChild(newTableRow)
    })
    wordCount.innerText = appState.getTotalWordCount()
}

function filterByLetter() {

}


textProcessorForm.addEventListener('submit', submitForm)
alphaSortBtn.addEventListener('click', alphaFilter)
numberSortBtn.addEventListener('click', numberFilter)