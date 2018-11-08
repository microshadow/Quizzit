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

}

chartObject.push(barChart1);

function input() {
    if (chartObject[0].data.datasets[0].data.length == 0) {
       // console.log("array is empty, push numbers...")
    for (let i = 0; i < arrayOfCorrect.length; i++) {
        chartObject[0].data.datasets[0].data.push(arrayOfCorrect[i]);
        //console.log(arrayOfCorrect.length);
        //console.log(arrayOfCorrect[0]);
        }
    }
}

function createChart() {
    arrayOfCorrect = document.getElementById("numberOfCorrect").value.split(",");

    input();

    barChart = new Chart(myChart, barChart1);
}

// the code above can only by hard coded, but our project is expected to get datas dynamically
// so there is another way to get the chart, but this one does not use any bootstrap or JQuery,
// it is kind of ugly, still prefer to fix the above code to make it run dynamically.
// 2nd method to get chart blow
// uncomment if wanna to choose this method


// function draw() {
//     var canvas = document.getElementById("myChart");
//     var ctx = canvas.getContext("2d");
//     var chartValue = document.getElementById("numberOfCorrect").value.split(",");

//     const width = 40; // bar width
//     let x = 50; // the 1st bar position

//     for(let i = 0; i < chartValue.length; i++)
//     {
//         let h = chartValue[i];
//         ctx.fillRect(x, canvas.height - h, width, h);
//         x += width+15;
//     }
// }
