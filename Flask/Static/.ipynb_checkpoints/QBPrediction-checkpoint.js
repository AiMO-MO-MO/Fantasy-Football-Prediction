let year = ['2019', '2020', '2021', '2022', '2023', '2024'];
let url = '/QBYearlyPoints.json'; 

function search() {
    let searchInput = document.getElementById('searchInput');
    let searchText = searchInput.value.toLowerCase();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            
            console.log(data);
            searchAndPlot(data, searchText);
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            openPopup();
        });
}

function searchAndPlot(data, searchText) {
    let keyFound = Object.keys(data).find(key => key.toLowerCase().includes(searchText.toLowerCase()));

    if (keyFound) {
        let values = data[keyFound];

        let trace1 = {
            x: year,
            y: values,
            type: 'bar',
            marker: {
                color: ['blue', 'blue', 'blue', 'blue', 'blue', 'red'],
                
                line: {
                        color: 'black', // Bar border color
                        width: 1.5 // Bar border width
                    },
                    // Show the values on the bars
                    text: values.map(String),
                    textposition: 'auto'// Colors for each bar
            }
        };

        let plotData = [trace1];

        let layout = {
            title: {
                text: `${keyFound} Fantasy Points By Year`,
                font: {
                    size: 16
                }
            },
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Fantasy Points'
            }
        };

        Plotly.newPlot('plot3', plotData, layout);
    } else {
        console.log('No matching key found');
        openPopup();
    }
}

function searchSecondGraph() {
    let searchInput = document.getElementById('searchInput2');
    let searchText = searchInput.value.toLowerCase();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           
            console.log(data);
            searchAndPlotSecondGraph(data, searchText);
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            openPopup();
        });
}

function searchAndPlotSecondGraph(data, searchText) {
    let keyFound = Object.keys(data).find(key => key.toLowerCase().includes(searchText.toLowerCase()));

    if (keyFound) {
        let values = data[keyFound];

        let trace = {
            x: year,
            y: values,
            type: 'bar',
            marker: {
                color: ['blue', 'blue', 'blue', 'blue', 'blue', 'red'],
                line: {
                    color: 'black',
                    width: 1.5
                },
                text: values.map(String),
                textposition: 'auto'
            }
        };

        let plotData = [trace];

        let layout = {
            title: {
                text: `${keyFound} Fantasy Points By Year`,
                font: {
                    size: 16
                }
            },
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Fantasy Points'
            }
        };

        Plotly.newPlot('plot4', plotData, layout); 
    } else {
        console.log('No matching key found for the second graph');
        openPopup();
    }
}


function openPopup() {
    document.getElementById('popupContainer').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}
