const link1 = "https://api.thingspeak.com/channels/1727245/fields/1.json?results=8000"
const link2 = "https://api.thingspeak.com/channels/1727245/fields/2.json?results=8000"
const link3 = "https://api.thingspeak.com/channels/1727245/fields/3.json?results=8000"
const link4 = "https://api.thingspeak.com/channels/1727245/fields/4.json?results=8000"
const link5 = "https://api.thingspeak.com/channels/1727245/fields/5.json?results=8000"
const link6 = "https://api.thingspeak.com/channels/1727245/fields/6.json?results=8000"
const link7 = "https://api.thingspeak.com/channels/1727245/fields/7.json?results=8000"
const link8 = "https://api.thingspeak.com/channels/1727245/fields/8.json?results=8000"
const link9 = "https://api.thingspeak.com/channels/1727245/fields/9.json?results=8000"
const link10 = "https://api.thingspeak.com/channels/1727245/fields/10.json?results=8000"

const download = "https://api.thingspeak.com/channels/1727245/feeds.csv"


function psh(arr, en, ca) {
    en.push(arr.field1);
    ca.push(arr.created_at);
}

fetch(link1, {            
	method: 'GET',
}).then((response)=>{
	return response.json();
}).then((data)=>{
    const ctx1 = document.getElementById('field--1').getContext('2d');
    entry = []
    createdAt = []
    data.feeds.forEach(value=>
        {
            entry.push(value.field1);
            createdAt.push(value.created_at);
        });
		var last = entry.length;
		while(entry[last] == null)
		{
			last --;
		}
		document.getElementById('current--1').textContent = entry[last] + ' Degrees';
    const field1 = new Chart(ctx1, {
		type: 'line',
		data: {
			labels: createdAt.slice(-1000),
			datasets: [{
				label: 'Temperature',
				data: entry.slice(-1000),
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
})


fetch(link2, {            
	method: 'GET',
}).then((response)=>{
	return response.json();
}).then((data)=>{
    entry = []
    createdAt = []
    data.feeds.forEach(value=>
        {
            entry.push(value.field2);
            createdAt.push(value.created_at);
        });
		var last = entry.length;
		while(entry[last] == null)
		{
			last --;
		}
		document.getElementById('current--2').textContent = entry[last] + ' %';
    const ctx2 = document.getElementById('field--2').getContext('2d');
    const field2 = new Chart(ctx2, {
		type: 'line',
		data: {
			labels: createdAt.slice(-1000),
			datasets: [{
				label: 'Humidity',
				data: entry.slice(-1000),
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
})

fetch(link3, {            
	method: 'GET',
}).then((response)=>{
	return response.json();
}).then((data)=>{
    entry = []
    createdAt = []
    data.feeds.forEach(value=>
        {
            entry.push(value.field3);
            createdAt.push(value.created_at);
        });
		while(entry.pop() == null)
		{
			entry.pop()
		}
		var last = entry.length;
		while(entry[last] == null)
		{
			last --;
		}
		document.getElementById('current--3').textContent = entry[last] + ' mV';
    const ctx3 = document.getElementById('field--3').getContext('2d');
    const field3 = new Chart(ctx3, {
		type: 'line',
		data: {
			labels: createdAt.slice(-1000),
			datasets: [{
				label: 'Voltage',
				data: entry.slice(-1000),
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
})
fetch(link4, {            
	method: 'GET',
}).then((response)=>{
	return response.json();
}).then((data)=>{
    entry = []
    createdAt = []
    data.feeds.forEach(value=>
        {
            entry.push(value.field4);
            createdAt.push(value.created_at);
        });
		var last = entry.length;
		while(entry[last] == null)
		{
			last --;
		}
		document.getElementById('current--4').textContent = entry[last] + ' mA';
    const ctx4 = document.getElementById('field--4').getContext('2d');
    const field4 = new Chart(ctx4, {
		type: 'line',
		data: {
			labels: createdAt.slice(-1000),
			datasets: [{
				label: 'Current',
				data: entry.slice(-1000),
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
})

fetch(link5, {            
	method: 'GET',
}).then((response)=>{
	return response.json();
}).then((data)=>{
    entry = []
    createdAt = []
    data.feeds.forEach(value=>
        {
            entry.push(value.field5);
            createdAt.push(value.created_at);
        });
	var last = entry.length;
	while(entry[last] == null)
	{
		last --;
	}
		document.getElementById('current--5').textContent = entry[last] + ' mW';
    const ctx5 = document.getElementById('field--5').getContext('2d');
    const field5 = new Chart(ctx5, {
		type: 'line',
		data: {
			labels: createdAt.slice(-1000),
			datasets: [{
				label: 'Active-Power',
				data: entry.slice(-1000),
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
})