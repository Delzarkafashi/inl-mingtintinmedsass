
var sparadData = [];
        if (localStorage.getItem('sparadData')) {
            sparadData = JSON.parse(localStorage.getItem('sparadData'));
        }

        function sparaData() {
            var namnInput = document.getElementById("namnInput");
            var ageInput = document.getElementById("ageInput");
            var dataInput = document.getElementById("dataInput");
            var namn = namnInput.value;
            var ålder = ageInput.value;
            var data = dataInput.value;

            if (namn && ålder && data) {
                if (!isNaN(ålder)) {
                    var person = {
                        namn: namn,
                        ålder: ålder,
                        data: data
                    };
                    sparadData.push(person);
                    localStorage.setItem('sparadData', JSON.stringify(sparadData));

                    var alertPopup = document.createElement('div');
                    alertPopup.className = 'alert';
                    alertPopup.textContent = 'Din data har sparats!';
                    document.getElementById("alertContainer").appendChild(alertPopup);

                    setTimeout(function () {
                        document.getElementById("alertContainer").removeChild(alertPopup);
                    }, 3000);

                    namnInput.value = "";
                    ageInput.value = "";
                    dataInput.value = "";
                } else {
                    alert("Du måste skriva en siffra i ålderfältet.");
                }
            } else {
                alert("Fyll i både namn, ålder och data.");
            }
        }



        function visaAllaData() {
    var resultatDiv = document.getElementById("resultat");
    resultatDiv.innerHTML = "";

    var table = document.createElement("table");
    table.className = "data-table";

    // Lägg till rubrikerna i första raden
    var headerRow = table.insertRow();
    var headers = ["", "Tv program", "Ålder", "Kategorier"]; // "": tom cell för "x"-knappen
    headers.forEach(function (headerText) {
        var th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    sparadData.forEach(function (person, index) {
        var row = table.insertRow();

        // Lägg till "x"-knappen i första cellen
        var deleteCell = row.insertCell(0);
        deleteCell.innerHTML = `<span class="delete-icon" onclick="taBortData(${index})">x</span>`;

        // Lägg till data i resterande celler
        var namnCell = row.insertCell(1);
        var ålderCell = row.insertCell(2);
        var dataCell = row.insertCell(3);

        namnCell.textContent = person.namn;
        ålderCell.textContent = person.ålder;
        dataCell.textContent = person.data;
    });

    resultatDiv.appendChild(table);

    console.log("Visa all data körs!");
}



// Resten av din kod för att ta bort och söka data förblir oförändrad.


function taBortData(index) {
    sparadData.splice(index, 1);
    localStorage.setItem('sparadData', JSON.stringify(sparadData));
    visaAllaData(); // Uppdatera datavisningen efter borttagning
}

function sokData() {
    var sokordInput = document.getElementById("searchInput");
    var sokord = sokordInput.value.toLowerCase();

    // Kontrollera om sökfältet är tomt
    if (!sokord.trim()) {
        alert("Du glömde att skriva något i sökfältet.");
        return;
    }

    var filtreradData = sparadData.filter(function (person) {
        return (
            person.namn.toLowerCase().includes(sokord) ||
            person.ålder.toString().includes(sokord) ||
            person.data.toLowerCase().includes(sokord)
        );
    });

    var resultatDiv = document.getElementById("resultat");
    resultatDiv.innerHTML = "";

    if (filtreradData.length === 0) {
        resultatDiv.innerHTML = `<p> ${sokord} finns inte, prova igen.</p>`;
    } else {
        var table = document.createElement("table");
        table.className = "data-table";

        // Lägg till rubrikerna i första raden
        var headerRow = table.insertRow();
        var headers = ["", "Tv program", "Ålder", "Kategorier"]; // "": tom cell för "x"-knappen
        headers.forEach(function (headerText) {
            var th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // Fyll tabellen med data
        filtreradData.forEach(function (person) {
            var row = table.insertRow();

            // Lägg till "x"-knappen i första cellen
            var deleteCell = row.insertCell(0);
            deleteCell.innerHTML = `<span class="delete-icon" onclick="taBortData(${sparadData.indexOf(person)})">x</span>`;

            // Lägg till data i resterande celler
            var namnCell = row.insertCell(1);
            var ålderCell = row.insertCell(2);
            var dataCell = row.insertCell(3);

            namnCell.textContent = person.namn;
            ålderCell.textContent = person.ålder;
            dataCell.textContent = person.data;
        });

        resultatDiv.appendChild(table);
    }

    sokordInput.value = "";
}



        function rensaData() {
            sparadData = [];
            document.getElementById("resultat").innerHTML = "";
            alert("All data har rensats!");
        }

