var myChart = document.getElementById("myChart").getContext("2d");
var a = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95]; //only for test
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
            fontSize: 25
        },
        legend: {
            position: "right"
        }
    }
});

function input() {
    for (var i = 0; i < barChart.data.datasets[0].data.length; i++) {
        barChart.data.datasets[0].data.push(a[i]);
        //console.log("hi");
    }
}

//85, 92, 81, 76, 9, 54, 98, 80, 24, 32
//input();