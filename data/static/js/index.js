const searchElement = document.getElementById("search");
const searchInput = document.getElementById("searchText");

let searchVisible = false;
let predicted;

function openSearch() {
    setHint("");
    predicted = undefined;
    searchInput.value = '';
    searchElement.style.display = "block";
    searchInput.focus();
    searchVisible = true;
}

function closeSearch() {
    searchElement.style.display = "none";
    searchVisible = false;
    index.forEach(def => {
        document.getElementById(def.id).style.display = 'block'
    });
}

function toggleSearch() {
    if (!searchVisible) openSearch();
    else closeSearch();
}

function setHint(value) {
    const elem = document.getElementById("hint");
    if (!value) {
        elem.style.display = 'none'
    } else {
        elem.style.display = 'block'
    }
    elem.innerText = value
}

function openPredicted() {
    if (!predicted) return;
    window.open(predicted.href, '_blank').focus();
}

function search(query) {
    const terms = query.split(" ").filter(x => !!x);
    let cp = index;

    for (const term of terms) {
        cp = cp.filter((def) => def.term.includes(term))
    }

    return cp
}

function updateFilter() {
    const query = searchInput.value.trim().toLowerCase();
    let first;

    const filtered = search(query);
    const visited = {};

    // show matched
    filtered.forEach((def) => {
        if (!first) {
            first = def.config;
        }
        document.getElementById(def.id).style.display = 'block'
        visited[def.id] = true;
    });

    // hide unfiltered
    index.forEach(def => {
        if (visited[def.id]) {
            return
        }
        document.getElementById(def.id).style.display = 'none'
    });

    predicted = first;
    if (predicted) {
        if (predicted.name) {
            setHint(`press Enter to go to ${predicted.name} (${predicted.href})`)
        } else {
            setHint(`press Enter to go to ${predicted.href}`)
        }
    } else {
        setHint("")
    }
}

document.onkeyup = function (e) {
    if (e.key === '/' && !searchVisible) {
        openSearch();
    }

    if (searchVisible) {
        if (e.key === 'Escape') {
            closeSearch();
        } else if (e.key === 'Enter') {
            openPredicted();
        } else {
            updateFilter();
        }
    }

}