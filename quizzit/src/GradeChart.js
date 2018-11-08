let myChart = document.getElementById("myChart").getContext("2d");
var a = [10,20,30,40,50,60,70,80,90,95];//only for test
var barChart;
barChart = new Chart(myChart, {
    type: "bar",
    data: {
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
        datasets: [{
            label: "class result",
            data: [85, 92, 81, 76, 9, 54, 98, 80, 24, 32],
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
});

function input() {
    for(let i = 0; i<barChart.data.datasets[0].data.length; i++){
        barChart.data.datasets[0].data.push(a[i]);
        //console.log("hi");
    }
}

//85, 92, 81, 76, 9, 54, 98, 80, 24, 32
//input();

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
