PREV = 100
CRITICAL = 0.1636
INTERVAL = 1000

const API = `https://api.thingspeak.com/channels/1727245/feeds.json?results=${PREV}`
const UPD = `https://api.thingspeak.com/channels/1727245/feeds.json?results=1`

vals = {
    labels: [],
    readings:[
        field1 = [],
        field2 = [],
        field3 = [],
        field4 = [],
        field5 = []
    ]
    };

chartList = []

function downl(){
    var date = document.getElementById("dt").value
    document.getElementById("down").href = `https://api.thingspeak.com/channels/1727245/feeds.csv?start=${date}%2000:00:00&end=${date}%2023:59:59`;
}


window.onload = function()
{
    fetch(API, {            
	    method: 'GET',
    }).then((response)=>{
            return response.json();
        }).then((data)=>
        {
            for(let i = 0; i<PREV; i++)
            {
                vals.labels.push(data.feeds[i].created_at);
                vals.readings[0].push(data.feeds[i].field1);
                vals.readings[1].push(data.feeds[i].field2);
                vals.readings[2].push(data.feeds[i].field3);
                vals.readings[3].push(data.feeds[i].field4);
                vals.readings[4].push(data.feeds[i].field5);
            }
            console.log(vals);
            var objList = [
                        {chartTag: 'field--1', currTag: 'current--1', title: 'Temperature', index: 0, unit: '°C'},
                        {chartTag: 'field--2', currTag: 'current--2', title: 'Humidity', index: 1, unit: '%'},
                        {chartTag: 'field--3', currTag: 'current--3', title: 'Voltage', index: 2, unit: 'Volts'},
                        {chartTag: 'field--4', currTag: 'current--4', title: 'Current', index: 3, unit: 'Milliamperes'},
                        {chartTag: 'field--5', currTag: 'current--5', title: 'Power', index: 4, unit: 'Milliwatts'},
                    ]
            
            function chartRender(obj)
            {
                var last = PREV;
                while(vals.readings[obj.index][last] == null)
                {
                    last --;
                }
                document.getElementById(obj.currTag).textContent = vals.readings[obj.index][last] + ` ${obj.unit}`;
                return (new Chart(document.getElementById(obj.chartTag), {
                    type: 'line',
                    data: {
                        labels: vals.labels,
                        datasets: [{
                            label: obj.title,
                            data: vals.readings[obj.index],
                            fill: false,
                            borderColor: 'rgb(38, 160, 252)',
                            tension: 0.1
                        }]
                    },
                    options: {
                            animation: {
                                duration: 500,
                            },
                        showTooltips: true,
                        spanGaps: true,
                        maintainAspectRatio: false,
                        responsive: false,
                        scales: {
                            x: {
                                ticks: {
                                    display: false
                                },
                                grid: {
                                display: false
                                }
                            }
                        }
                    }
                }));
            }

            for(let i = 0; i<objList.length; i++)
            {
                chartList.push(chartRender(objList[i]));
            }
            console.log(chartList);
        }  
    )
}


setInterval(function()
    {
        fetch(UPD, {            
            method: 'GET',
        }).then((response)=>{
                return response.json();
            }).then((data)=>
            {
                updatedData = [data.feeds.field1, data.feeds.field2, data.feeds.field3, data.feeds.field4, data.feeds.field5]
                if(updatedData[2] != null && updatedData[2] < CRITICAL)
                {
                    window.alert('Voltage Low');
                }
                console.log('Values updated');
                for(let i = 0; i<5; i++)
                {
                    chartList[i].data.datasets.forEach((dataset) => {
                        chartList[i].data.labels.push(data.feeds.created_at);
                        dataset.data.push(updatedData[i]);
                    });
                    chartList[i].update();
                }



            });
    }
    , INTERVAL);