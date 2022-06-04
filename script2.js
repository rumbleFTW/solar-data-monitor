PREV = 1000

const API = `https://api.thingspeak.com/channels/1727245/feeds.json?results=${PREV}`

vals = {
    labels: [],
    readings:{
        field1 : [],
        field2: [],
        field3: [],
        field4: [],
        field5: []
        }
    };


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
                vals.readings.field1.push(data.feeds[i].field1);
                vals.readings.field2.push(data.feeds[i].field2);
                vals.readings.field3.push(data.feeds[i].field3);
                vals.readings.field4.push(data.feeds[i].field4);
                vals.readings.field5.push(data.feeds[i].field5);
            }
            console.log(vals);
        }  
    )


    new Chart(document.getElementById('field--1'), {
        type: 'line',
        data: {
            labels: vals.labels,
            datasets: [{
                label: 'Temperature',
                data: vals.readings.field1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
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
    });
    
}




// chart1 = new Chart(document.getElementById("field--1"), {
//     type: 'line',
//     data: {
//       labels: vals.labels,
//         data: vals.readings.field1,
//         label: "Africa",
//         borderColor: "#3e95cd",
//         fill: false
//     },
//     options: {
//         showTooltips: true,
//         spanGaps: true,
//         maintainAspectRatio: false,
//         responsive: false,
//         scales: {
//             x: {
//                 ticks: {
//                     display: false
//                 },
//                 grid: {
//                     display: false
//                 }
//             }
//         }
//     }
//   });