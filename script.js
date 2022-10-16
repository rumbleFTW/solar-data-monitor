PREV = 300
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


var objList = [
    {chartTag: 'field--1', gaugeTag: 'field--6',currTag: 'current--1', color: 'rgb(255, 165, 0)', index: 0, unit: '°C', gaugeMax: 40, gaugeMin: 16},
    {chartTag: 'field--2', gaugeTag: 'field--7',currTag: 'current--2', color: 'rgb(128,128,128)', index: 1, unit: '%', gaugeMax: 100, gaugeMin: 1},
    {chartTag: 'field--3', gaugeTag: 'field--8',currTag: 'current--3', color: 'rgb(38, 160, 252)', index: 2, unit: 'V', gaugeMax: 1, gaugeMin: 0},
    {chartTag: 'field--4', gaugeTag: 'field--9',currTag: 'current--4', color: 'rgb(0,255,0)', index: 3, unit: 'mA', gaugeMax: 2, gaugeMin: 0},
    {chartTag: 'field--5', gaugeTag: 'field--0',currTag: 'current--5', color: 'rgb(255, 0, 0)', index: 4, unit: 'mW', gaugeMax: 1, gaugeMin: 0},
]

chartList = []
gaugeList = []

function downl(){
    var date = document.getElementById("dt").value
    document.getElementById("down").href = `https://api.thingspeak.com/channels/1727245/feeds.csv?start=${date}%2000:00:00&end=${date}%2023:59:59`;
}

function gaugeRender(obj)
{
    var last = PREV;
    while(vals.readings[obj.index][last] == null)
    {
        last --;
    }
    var opts = {
        angle: 0.1,
        lineWidth: 0.3,
        radiusScale: 1,
        pointer: {
          length: 0.6,
          strokeWidth: 0.042,
          color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#8FC0DA',
        colorStop: obj.color,
        strokeColor: '#FFFFFF',
        generateGradient: true,
        highDpiSupport: true,
        };
        var target = document.getElementById(obj.gaugeTag);
        var gauge = new Gauge(target).setOptions(opts);
        gauge.maxValue = obj.gaugeMax;
        gauge.setMinValue(obj.gaugeMin);
        gauge.animationSpeed = 28;
        gauge.set(vals.readings[obj.index][last]);
        return gauge;
}

window.onload = function()
{
    // var myDate = document.getElementById('dt');
    // var today = new Date();
    // myDate.value = today.toISOString().substr(0, 10);
    fetch(API, {
	    method: 'GET',
    }).then((response)=>{
            return response.json();
        }).then((data)=>
        {

            for(let i = 0; i<PREV; i++)
            {
                try
                {
                    vals.labels.push(data.feeds[i].created_at);
                    vals.readings[0].push(data.feeds[i].field1);
                    vals.readings[1].push(data.feeds[i].field2);
                    vals.readings[2].push(data.feeds[i].field3);
                    vals.readings[3].push(data.feeds[i].field4);
                    vals.readings[4].push(data.feeds[i].field5);
                }catch{}
            }
            console.log(vals);

            function chartRender(obj)
            {
                var last = PREV;
                while(vals.readings[obj.index][last] == null)
                {
                    last --;
                }

                elems = document.getElementsByClassName(obj.currTag);
                [...elems].forEach(function(elem){elem.textContent = parseFloat(vals.readings[obj.index][last]) + ` ${obj.unit}`;
                elem.style.color = obj.color;})


                return (new Chart(document.getElementById(obj.chartTag), {
                    type: 'line',
                    data: {
                        labels: vals.labels,
                        datasets: [{
                            label: obj.title,
                            data: vals.readings[obj.index],
                            fill: false,
                            borderColor: obj.color,
                            tension: 0.1
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                             }
                        },
                            animation: {
                                duration: 1000,
                            },
                        showTooltips: true,
                        spanGaps: true,
                        maintainAspectRatio: false,
                        responsive: false,
                        highDpiSupport: true,
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
                gaugeList.push(gaugeRender(objList[i]))
            }
            // console.log(chartList);
        }
    )
}


prev = ""

setInterval(function()
    {
        fetch(UPD, {
            method: 'GET',
        }).then((response)=>{
                return response.json();
            }).then((data)=>
            {
                updatedData = [data.feeds[0].field1, data.feeds[0].field2, data.feeds[0].field3, data.feeds[0].field4, data.feeds[0].field5]
                if(prev != data.feeds[0].created_at)
                {
                    // window.location.reload();

                    for(let i = 0; i<5; i++)
                    {
                        if(updatedData[i] != null)
                        {
                            obj = objList[i];
                            elems = document.getElementsByClassName(obj.currTag);
                            gaugeList.push(gaugeRender(objList[i]));
                            [...elems].forEach(function(elem){elem.textContent = `${parseFloat(updatedData[i])}` + ` ${obj.unit}`
                            elem.style.color = obj.color;})
                            console.log(`updated field ${i+1}`);
                            // console.log(gaugeList)
                        }
                    }

                    prev = data.feeds[0].created_at;
                    if(updatedData[2] != null && updatedData[2] < CRITICAL)
                    {
//                        window.alert('Voltage Low');
                    }
                    for(let i = 0; i<5; i++)
                    {
                        var temp = chartList[i].data.datasets[0].data;
                        temp.push(updatedData[i]);
                        temp.shift();
                        chartList[i].data.datasets[0].data= temp;
                        chartList[i].update('show');
                    }
                }
            });
    }
    , INTERVAL);
