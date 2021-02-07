var tab1 = "";
var tab2 = "";
var tab3 = "";
var tab4 = "";
var tab5 = "";
var tab6 = "";
var tab7 = "";
var tab8 = "";
var tab9 = "";
var tabFate = "";
var tabTemp = "";
var tabGoal = "";
var tabFamily = "";
var tabHabits = "";
var tabBit = "";

function calculate() {
    var dateString = String(document.getElementById("date").value);
    var arraysOfString = dateString.split(".");

    var dayDigits = arraysOfString[0].split('').map(Number);
    if (dayDigits[0] == 0) dayDigits.shift();

    var monthDigits = arraysOfString[1].split('').map(Number);
    if (monthDigits[0] == 0) monthDigits.shift();

    var yearDigits = arraysOfString[2].split('').map(Number);

    // 1
    var firstWorkerNumber = arraysSum(dayDigits, monthDigits, yearDigits);

    // 2
    var secondWorkerNumber = digitsSum(firstWorkerNumber);

    // 3
    var thirdWorkerNumber = firstWorkerNumber - (2 * dayDigits[0]);

    // 4
    var fourthWorkerNumber = digitsSum(thirdWorkerNumber);

    // 5
    var liveCount = dayDigits.length + monthDigits.length + yearDigits.length + 4;

    var resultString = dateString + firstWorkerNumber.toString() +
        secondWorkerNumber.toString() +
        thirdWorkerNumber.toString() +
        fourthWorkerNumber.toString();

    var dict = makeCellDict(resultString);

    var fate = digitsFate(secondWorkerNumber);
    tabFate = fate.toString();

    var summaryTd = document.getElementById("summary");
    summaryTd.innerHTML = "Дата рождения: " + dateString + " <br><br> Число судьбы: " + fate;

    var tempTd = document.getElementById("Темперамент");
    var tempValue = dict["Удача"].length + dict["Логика"].length + dict["Интерес"].length;
    tabTemp = tempValue.toString();
    tempTd.innerHTML = "Темперамент" + " <br> " + (tempValue == 0 ? "-" : tempValue);

    var goalTd = document.getElementById("Цель");
    var goalValue = dict["Характер"].length + dict["Здоровье"].length + dict["Удача"].length;
    tabGoal = goalValue.toString();
    goalTd.innerHTML = "Цель" + " <br> " + (goalValue == 0 ? "-" : goalValue);

    var familyTd = document.getElementById("Семья");
    var familyValue = dict["Энергия"].length + dict["Логика"].length + dict["Долг"].length;
    tabFamily = familyValue.toString();
    familyTd.innerHTML = "Семья" + " <br> " + (familyValue == 0 ? "-" : familyValue);

    var hobyTd = document.getElementById("Привычки");
    var hobyValue = dict["Интерес"].length + dict["Труд"].length + dict["Память"].length;
    tabHabits = hobyValue.toString();
    hobyTd.innerHTML = "Привычки" + " <br> " + (hobyValue == 0 ? "-" : hobyValue);

    var bitTd = document.getElementById("Быт");
    var bitValue = dict["Здоровье"].length + dict["Логика"].length + dict["Труд"].length;
    tabBit = bitValue.toString();
    bitTd.innerHTML = "Быт" + " <br> " + (bitValue == 0 ? "-" : bitValue);

    var copyButton = document.getElementById("copyButton1");
    copyButton.style.visibility = "visible";
}

function digitsFate(secondWorkerNumber) {
    if (secondWorkerNumber == 11) {
        return secondWorkerNumber;
    }

    var sum = secondWorkerNumber;
    var stringNumber = sum.toString();

    while (stringNumber.length != 1) {
        sum = digitsSum(sum);
        stringNumber = sum.toString();
    }

    return sum;
}

function arraysSum(firstArray, secondArray, thirdArray) {
    var sum = 0;
    firstArray.forEach( element => sum += element );
    secondArray.forEach( element => sum += element );
    thirdArray.forEach( element => sum += element );
    return sum
}

function digitsSum(value) {
    var sum = 0;
    var digits = value.toString().split('').map(Number);
    digits.forEach( element => sum += element );
    return sum
}

function countElementIn(element, array) {
    var resultString = "";
    var elementString = element.toString();
    for (i = 0; i < array.length; i++) {
        if (array[i] == elementString) resultString += elementString;
    }

    return resultString
}

function makeCellDict(resultString) {
    let tds = ["Характер", "Энергия", "Интерес", "Здоровье", "Логика", "Труд", "Удача", "Долг", "Память"];
    var result = {}

    for (i = 1; i <= tds.length; i++) {
        var a = i;

        var count = countElementIn(a, resultString);
        var cellName = tds[a - 1];
        result[cellName] = count;

        var td = document.getElementById(cellName);
        td.innerHTML = cellName + " <br> " + (count.length == 0 ? "-" : count);

        i = a;

        switch (true) {
            case (a == 1):
                tab1 = count.length == 0 ? "-" : count;
                break;
            case (a == 2):
                tab2 = count.length == 0 ? "-" : count;
                break;
            case (a == 3):
                tab3 = count.length == 0 ? "-" : count;
                break;
            case (a == 4):
                tab4 = count.length == 0 ? "-" : count;
                break;
            case (a == 5):
                tab5 = count.length == 0 ? "-" : count;
                break;
            case (a == 6):
                tab6 = count.length == 0 ? "-" : count;
                break;
            case (a == 7):
                tab7 = count.length == 0 ? "-" : count;
                break;
            case (a == 8):
                tab8 = count.length == 0 ? "-" : count;
                break;
            case (a == 9):
                tab9 = count.length == 0 ? "-" : count;
                break;
            default:
                break;
        }
    }

    return result
}

function copy() {
    var result = tab1.toString() + "/" +
        tab2 + "/" +
        tab3 + "/" +
        tab4 + "/" +
        tab5 + "/" +
        tab6 + "/" +
        tab7 + "/" +
        tab8 + "/" +
        tab9 + "/" +
        "ЧС" + tabFate + "/" +
        "темп" + tabTemp + "/" +
        "цель" + tabGoal + "/" +
        "семья" + tabFamily + "/" +
        "прив" + tabHabits + "/" +
        "быт" + tabBit;

    copyStringToClipboard(result);
    alert("Таблица скопирована");
}

function copyStringToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
