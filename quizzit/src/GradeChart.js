let myChart = document.getElementById("myChart").getContext("2d");

const chartObject = []; // array of chart(myChart, object); 2nd parameter for class Chart.
var arrayOfCorrect = []; //array of user input

var barChart;
const barChart1 = {
    type: "bar",
    data: {
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
        datasets: [{
            label: "class result",
            data: [],
            backgroundColor: ["red", "yellow", "blue", "green", "orange", "purple", "aqua", "blueviolet", "coral", "greenyellow"],
            borderWidth: 2,
            borderColor: "gray"
        }]
    },
    options: {
        title: {
            display: true,
            text: "Class Outcome for Quiz#1",
            fontSize: 25,
        },
        legend: {
            position: "right",
        }
    },

};

chartObject.push(barChart1);

function input() {
    arrayOfCorrect = document.getElementById("numberOfCorrect").value.split(",");

    if (chartObject[0].data.datasets[0].data.length == 0) {
        for (let i = 0; i < arrayOfCorrect.length; i++) {
            chartObject[0].data.datasets[0].data.push(arrayOfCorrect[i]);
            //console.log(arrayOfCorrect.length);
            //console.log(arrayOfCorrect[0]);
            }
    }
}

function getTheMin() {
    // firstly, convert the array of string (from user input) to number.
    const numArray = [];
    for(let i = 0; i < arrayOfCorrect.length; i++)
    {
        numArray.push(parseInt(arrayOfCorrect[i]));
        //console.log(numArray);
    }

    // compare the number in that array.
    // Note: made a mistake to compare string... (e.g. ["12","10","8","5"] instead of [12,10,8,5])
    var min = numArray[0];
   // console.log(numArray);
    for(let i = 0; i < numArray.length; i++)
    {
        if(numArray[i] < min)
        {
            min = numArray[i];
        }
        // console.log(i);
        // console.log(min);
    }

    // then return the i, which is index, since we want to show 'where' holds the minimum number
    for(let i = 0; i < numArray.length; i++)
    {
        if(numArray[i] === min)
        {
            //console.log("question #"+(i+1));
            return i+1;
        }
    }
}

// DOM function to append text to HTML page.
function whichQuestionIsHard() {
    const qString = "The hardest question of this quiz is #" + getTheMin();
    const a = document.getElementById("outputMessage");
    a.appendChild(document.createTextNode(qString));
}

function createChart() {

    input();

    barChart = new Chart(myChart, barChart1);

    whichQuestionIsHard();
}
