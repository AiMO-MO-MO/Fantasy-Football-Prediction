let week = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
let gameyear = [];//make lists of data for functions 
let gameweek = [];
let gamefantasyPoints = [];
let gamerushingyards = [];
let gamerushtds = [];
let gamerecyards = [];
let gamerecTDs = [];
let YearlyFantasyPoints = [];
let YearlyRecievingTDPoints = [];
let YearlyReceptionPoints = [];
let YearlyRushTDPoints = [];

let RBlast5 = '/RB5.json';//define the data sources
let RBbyweek = '/RBPointData.json';
let RBbyYear = '/RBYear.json';


let urls = [RBlast5, RBbyweek, RBbyYear];//combine data sources into one so you can make PromiseAll

function search() {
    let searchInput = document.getElementById('searchInput');//Where is the search happening? 
    let searchText = searchInput.value.toLowerCase(); //define the text we are looking to compare the key to
    let promises = urls.map(url => fetch(url).then(response => response.json())); //what do we want to promise and get data form? 
    

    Promise.all(promises)//import data
    .then(data => {
        console.log(data[2]);//check to make sure that it worked 
        let points = data[1];//get data regarding points per week 
        let keyFound = Object.keys(points).find(key => key.toLowerCase().includes(searchText));//what key do we want to compares with search term
        if (keyFound) {//ploting the key and the data if the search term matches key
            plot(keyFound, points[keyFound]);
                let games = data[0];//pull up the metadata
                let filteredGameData = games[keyFound];// find your key withing the metadata dictionary {key:metadata}
                if (filteredGameData) {;//clear out metadata 
                    gameyear = [];
                    gameweek = [];
                    gamefantasyPoints = [];
                    gamerushingyards = [];
                    gamerushtds = []
                    gamerecyards = [];
                    gamerecTDs = [];
                        // Clearing the arrays
                    filteredGameData.forEach(stats => {//add new metadata
                        gameyear.push(stats[1]);
                        gameweek.push(stats[2]);
                        gamefantasyPoints.push(stats[3]);
                        gamerushingyards.push(stats[4]);
                        gamerushtds.push(stats[5])
                        gamerecyards.push(stats[6]);
                        gamerecTDs.push(stats[7])

                    });
                    metadata(gameyear, gameweek, gamefantasyPoints, gamerushingyards, gamerushtds,gamerecyards,gamerecTDs);//run fucntion to add metadata to panel 
                    let yearstats = data[2];//pull yearly data
                    let filteredYearStats = yearstats[keyFound];//find the key and the corresponding yearly stats 
                    if (filteredYearStats){//clear yeaerly stats
                        YearlyFantasyPoints = [];
                        YearlyRecievingTDPoints = [];
                        YearlyRushTDPoints = [];
                        YearlyReceptionPoints = [];
                  
              
                        filteredYearStats.forEach(points => {//add yearly stats to lists based on key
                            console.log(points)
                            YearlyFantasyPoints.push(points.Fantasy_Points)
                            YearlyRushTDPoints.push(points.Rush_TD_Points)
                            YearlyRecievingTDPoints.push(points.Receiving_TD_Points)
                            YearlyReceptionPoints.push(points.Reception_Points)

                          })
                        stackedbar(YearlyRushTDPoints,YearlyRecievingTDPoints,YearlyReceptionPoints)//use function to plot in stacked bar chart
                }

                          } else {
                console.log('No matching player found');//else key is not found 
            }








        } else {
            // Handle case when no matching key is found
        console.log('No matching key found');
        openPopup();//call open pop up function
    }})}


    search();



    
        
        
       
           
           
                    
             
           
    


function plot(key, values) {//funciton to plot weekly stats 
    let trace1 = {
        x: week,
        y: values,
        type: 'scatter',
        fill: 'tozeroy',
        fillcolor: 'rgba(255, 0, 0, 1)'
    };

   let plotData = [trace1];

   let layout = {
    title: {
        text: `${key} <br><span style ="font-size: 16px;">Points per week (2019-2023)`,
        font:{

            size: 32

        }},
        xaxis: {
            title: 'Week',
            dtick: 1
    },
        yaxis: {
            title: 'Fantasy Points'
        }
    
};

    Plotly.newPlot('plot1', plotData, layout);
}

function metadata(gameyears, gameweek, gameFantasyPoints,gamerushingyards, gamerushtds,gamerecyards,gamerecTDs) {//function to plot metadata
    let metadataPanel = d3.select("#sample-metadata");//Where do we want the metadata withing the html page 
    metadataPanel.html("")//clear the panel
    for (let i = 0; i < gameyears.length; i++) {//add the 5 games 
        metadataPanel.append("p")
            .html(`<b>Year:</b> ${gameyears[i]}  <b>Game Week:</b> ${gameweek[i]}  <b>Points:</b> ${gameFantasyPoints[i]}  <b>Rushing Yards:</b> ${gamerushingyards[i]}  <b>Rushing TDs:</b> ${gamerushtds[i]} <b>Receiving YDS:</b> ${gamerecyards[i]} <b>Receiving TDS:</b> ${gamerecTDs[i]}`);
    }
}
   

 function stackedbar(YearlyRushTDPoints,YearlyRecievingTDPoints,YearlyReceptionPoints) {
    const canvas = document.getElementById('stackedBarChart');
        
            // Check if a chart instance already exists and destroy it
        if (window.stackedBarChart instanceof Chart) {
           window.stackedBarChart.destroy();
        }
        
        
    const context = canvas.getContext('2d');
        
    const data = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
               label: 'RushTDPoints',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
                data: YearlyRushTDPoints
            }, {
                label: 'ReceivingTDPoints',
               backgroundColor: 'rgba(255, 165, 0, 1)',
                data: YearlyRecievingTDPoints
            }, {
               label: 'ReceptionPoints',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
               data: YearlyReceptionPoints
            }]
        };
        
        const options = {
            plugins: {
                title: {
                    display: true,
                    text: 'Fantasy Points Breakdown (2019-2023)',
                    font: {
                        size: 20, // Set the font size for the title
                        weight: 'bold' // Make the title bold
                    }
                }
            },

            scales: {
                 x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Year', // Label for the x-axis
                        font: {
                            weight: 'bold' // Make x-axis title bold
                        }
                    }

                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Fantasy Points', // Label for the x-axis
                        font: {
                            weight: 'bold' // Make x-axis title bold
                        }
                    }
                }
            }
        };
        
            // Create the stacked bar chart
        const stackedBarChart = new Chart(context, {
             type: 'bar',
             data: data,
            options: options
        });
        
            // Store the chart instance in window.stackedBarChart
        window.stackedBarChart = stackedBarChart;
    }
        

function openPopup() {
    document.getElementById('popupContainer').style.display = 'block';//function to open popup if search text is not found in keys
}

function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}





    
