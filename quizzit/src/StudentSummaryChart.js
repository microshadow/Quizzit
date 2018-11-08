let myChart = document.getElementById("myChart").getContext("2d");

let barChart;
barChart = new Chart(myChart, {
    type: "pie",
    data: {
        labels: ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7", "chapter8", "chapter9", "chapter10"],
        datasets: [{
            label: "Grades (out of 10)",
            data: [0.7, 0.8, 1.0, 1.0, 0.5, 0.6, 0.9, 1.0, 0.4,0.8],
            backgroundColor: ["red", "yellow", "blue", "green", "orange", "purple", "aqua", "blueviolet", "coral", "greenyellow"],
            borderWidth: 2,
            borderColor: "gray"
        }]
    },
    options: {
        title: {
            display: true,
            text: "Grades for each Quiz of this course",
            fontSize: 25,
        },
        legend: {
            position: "right",
        }
    },
});

