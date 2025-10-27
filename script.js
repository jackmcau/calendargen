const fileInput = document.getElementById("fileInput")

/* 
    The entire program will be based off of reading this file
    and parsing it
*/

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            json = JSON.parse(fileContent);
            parseJSON(json);
        };

        reader.readAsText(file);
    }
});

function parseMonth(month) {
    return (month == "January") ? 0 : 
           ((month == "February") ? 1 : 
           ((month == "March") ? 2 : 
           ((month == "April") ? 3 : 
           ((month == "May") ? 4 : 
           ((month == "June") ? 5 : 
           ((month == "July") ? 6 :
           ((month == "August") ? 7 :
           ((month == "September") ? 8 :
           ((month == "October") ? 9 :
           ((month == "November") ? 10 :
           ((month == "December") ? 11 : 0
    )))))))))));
}

function getIntAsString(arg) {
    asString = arg.toString();
    if(asString.length == 1) {
        return "0" + asString;
    }
    return asString;
}

function getDaysInMonth(year, month) {
    return new Date(Date.UTC(year, month+1, 0)).getDate() + 1;
}

function parseJSON(json) {
    fileInput.style.display = "none";
    const leftcol = document.getElementById("leftcol");
    leftcol.style.display = null;
    const rightcol = document.getElementById("rightcol");
    rightcol.style.display = null;
    const month = document.getElementById("month");
    month.innerText = json.data.month;
    const year = document.getElementById("year");
    year.innerText = json.data.year;

    /*
        Filling in days of the month
    */
    monthAsInt = parseMonth(json.data.month)
    date = new Date(Date.UTC(parseInt(json.data.year), monthAsInt, parseInt(json.data.day)));
    daysInMonth = getDaysInMonth(parseInt(json.data.year), monthAsInt);
    daysInPastMonth = getDaysInMonth(parseInt(json.data.year), ((monthAsInt-1 < 0) ? 11 : monthAsInt-1));
    firstDayOfMonth = new Date(Date.UTC(parseInt(json.data.year), monthAsInt, 1)).getDay() + 1;
    if (firstDayOfMonth > 6) {
        firstDayOfMonth = 0;
    }

    children = Array.from(document.getElementById("calrow1").children)
                .concat(Array.from(document.getElementById("calrow2").children))
                .concat(Array.from(document.getElementById("calrow3").children))
                .concat(Array.from(document.getElementById("calrow4").children))
                .concat(Array.from(document.getElementById("calrow5").children));

    for(let i = 0; i < children.length; i++) { // index 0 is firstDayOfMonth days before the starting index of the month
        if(i < firstDayOfMonth) {
            children[i].innerHTML = `<hr><p class="day inactive">${getIntAsString(daysInPastMonth-(firstDayOfMonth-i)+1)}</p>`;
        } else if (i <= parseInt(json.data.day) + firstDayOfMonth - 1) {
            children[i].innerHTML = `<hr><p class="day" id="${i-firstDayOfMonth+1}">${getIntAsString(i-firstDayOfMonth+1)}</p>`;
        } else if (i < daysInMonth + firstDayOfMonth) {
            children[i].innerHTML = `<hr><p class="day future" id="${i-firstDayOfMonth+1}">${getIntAsString(i-firstDayOfMonth+1)}</p>`;
        } else {
            children[i].innerHTML = `<hr><p class="day inactive">${getIntAsString(i-daysInMonth-firstDayOfMonth+1)}</p>`;
        }
    }

    /*
        Filling in keys
    */

    
}