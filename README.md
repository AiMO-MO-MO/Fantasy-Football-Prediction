# Fantasy-Football-Prediction



## Table of Contents
- [Fantasy Football](#OverviewProject)   
  * [Fantasy Overview](#Fantasy)
  * [Related Projects](#Related)
- [Data Exploration](#DataExp)
- [Feature Analysis](#Analysis)
- [Machine Learning Models](#ML)
  * [Points Prediction](#PointsPrediction)
  * [ARIMA Model](#ARIMA)
- [Player Performance Dashboard](#dash)
- [Ethics](#Ethics)
- [Data Sources](#db)
- [Technologies](#Tech)
- [Libraries](#Libraries)

 
## <a name="OverviewProject"></a> Fantasy Football Prediction



### <a name="Fantasy"></a> Fantasy Overview

Fantasy Football is a popular math-based game that engages 29 million participants each year. The standard league involves assembling a roster of real-life athletes whose on-field performances determine the scoring of your team. Competing head-to-head against league members, the goal is to compile the team with the most points to secure weekly victories. Win enough weeks and you make the playoffs. Win the Playoffs to become Champion!

A Fantasy season begins on draft day, when teams take turns selecting players to fill out their roster. Drafting strategy is crucial as it lays the foundation for your season.

![image](https://github.com/AiMO-MO-MO/Project-_FF/assets/130156500/4e46c4ce-04de-4256-8c28-52c78dd4570c)


![image](https://github.com/AiMO-MO-MO/Project-_FF/assets/130156500/6da89ae8-59e2-47b4-b084-566f3587e3b3)

Once teams are set, the real action begins. Teams face off against each other weekly, setting the lineup that they think will score the most points.

![image](https://github.com/AiMO-MO-MO/Project-_FF/assets/130156500/b2f8edc9-8a4f-4e20-ad5d-cd43a37c4b30)

### <a name="Related"></a>Related Projects
With the actions taken on field reflected in the scores, Fantasy players spend endless time analyzing the available data to try and find an edge. This repository is a combination of analysis begining with an analysis of the Combine and Age trends

https://github.com/AiMO-MO-MO/Project-_FF

An analysis of Week to Week scoring trends

https://github.com/AiMO-MO-MO/FantasyFootball-PPG

Using the data compliled and processed in the Week to Week analaysis, this project uses machine learning models to analyze past player performances to predict future fantasy points scored.

## <a name="DataExp"></a> Data Exploration
- Webscrape data from
  [FootballDB](https://www.footballdb.com/fantasy-football/index.html?pos=RB&yr=2023&wk=%7Bx%7D&key=b6406b7aea3872d5bb677f064673c57f%27)
  
- Transformed data into SQL database
- 
  ![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/9d5bec3d-3b7e-4dd2-8471-3c0fc0d425df)


## <a name="Analysis"></a> Feature Analysis
The complete data set includes the following fields: 
Week
Name
Position
Year
Game
Fantasy Points
Passing Yards
Passing TDs
Ints
Rush Attempts
Rush Yards
Fumbles
Rush TDs
Receptions
Receiving Yards
Receiving TDs

Before the data could be fit for the models, we first needed to analyze the data itself and then the features available to the model.

### Distribution of Fantasy Scoring:
**QB:**

![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/cad82f3f-a235-4be6-a88f-c004f623968e)

**RB:**

![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/c80f259c-9f0c-4ee1-86e0-7da0e992d264)

**WR:**

![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/f8a48a15-6bcb-49c8-b2da-acee8952746b)


Not all the fields are applicable for each specific position, a WR or Running Back would rarely have Passing Yards or Passing TDs, so we analyzed the feature importance per position. These following heatmaps helped narrow down the proper features to use for each positions model.

### Feature Heatmap:
**QB:**

![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/0be5dc11-83d0-4c02-8266-1702805f9377)

**RB:**


![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/6a072efc-e0cb-4efb-b337-d418cf36c1ce)

**WR:**

![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/af82a288-26ed-44af-bd7e-442e019283d2)

The most important features in relation to the Fantasy Points Scored are:

- **QB:** Passing TDs 0.88  
          Passing Yards 0.77
- **RB:** Rushing Yards 0.76  
          Rushing Attempts 0.71
- **WR:** Receiving Yards 0.97  
   


## <a name="ML"></a> Machine Learning Models
### <a name="PointsPrediction"></a> Points Prediction:
With the data manipulated and features analyzed, it is time to fit the data into the model to predict the points. For the Points Prediction model, we will be using a Linear Regression Model. Linear regression is a statistical method used to model the relationship between a dependent variable (target) and one or more independent variables (features). It assumes a linear relationship between the independent variables and the dependent variable. The target for each model is Fantasy Points, while the features will be the position applicable fields. There are three total models: QB, RB, WR. The models are trained on the postition data from 2019 - 2021 and tested with the 2022 data. 

### Optimization
Even with strong correlated features, each model went through an optimization process. Removing and adding numerical and categorical features to improve the accuracy of the R-squared. Below is an example of the RB Model Optimization.

**Attempt 1:** R-squared: 0.8989570503603337
![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/0560c3b7-93d2-4c62-874a-94aba0ae176b)

**Attempt 2:** R-squared: 0.8362649301745869
![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/40813309-a392-4677-b7ea-226311718713)

**Attempt 3:** R-squared: 0.7494400752647912
![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/9fa3ed88-2680-465b-a5a4-6dbd7a1e4fec)

**Attempt 4:** R-squared: 0.9183606405113434
![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/ffa54d87-6269-4053-9590-1766b26736d8)


### Model Scores
- **QB:** Mean Squared Error: 871.45
    R-squared: 0.93
- **RB:** Mean Squared Error: 518.74
    R-squared: 0.918
- **WR:** Mean Squared Error: 253.39
    R-squared: 0.98


### <a name="ARIMA"></a> ARIMA Model:
Now that we have our prediction model we need data to use for predictions. We could predict off of last years data, but we wanted to get more individualized results. To get these results, we used an ARIMA model to predict what each player would score next season. Using the players historical data, the ARIMA model factors in the time component of our data. 

- **QB:** Mean Squared Error: 871.45
    R-squared: 0.93
- **RB:** Mean Squared Error: 518.74
    R-squared: 0.918
- **WR:** Mean Squared Error: 253.39
    R-squared: 0.98

## <a name="dash"></a> Player Performance Dashboard:
Run the app.py in the Flaskfolder to access the dashboard. 

![image](https://github.com/AiMO-MO-MO/FantasyFootball-PPG/assets/130156500/5f394854-4c5a-4f82-b322-4c432e4fe845)

Home Screen:
![image](https://github.com/AiMO-MO-MO/FantasyFootball-PPG/assets/130156500/43276b0f-fbf6-4d03-b207-68e72801c5a6)

Player Display:
![image](https://github.com/AiMO-MO-MO/FantasyFootball-PPG/assets/130156500/33b28202-f813-4202-a99f-dfc5867654ba)

- **Top Chart** Displays the players cumulitive points over the last 5 years of data by week
- **Bottom Left** Displays the breakdown of how they earned fantasy points
- **Bottom Right** Displays the most recent 5 performances

Player Predictor:

![image](https://github.com/AiMO-MO-MO/Fantasy-Football-Prediction/assets/130156500/4f406f5f-a319-415d-9fc4-b0ff71d662bb)

- **Top Chart** Displays historical performance and future prediction for a player
- **Bottom Chart** Displays historical performance and future prediction for second player

### How to use the Player Performance Dashboard via Flask App: 


To access the Player Performance Dashboard, navigate to the Flask app located in the Flask folder and run the app.py file.

**Navigating the Home Page:**

Once you've accessed the Flask app, you'll land on the Home Page. Choose the position you want to analyze.

**Player Page:**

After selecting a position, you'll have the option to use the player search feature. This feature enables you to search for specific players and view their performance trends over time.
At any point, you can return to the Home Page by clicking "Home"

**Prediction Page:**

After selecting a position, you'll have the option to use the player search feature. This feature enables you to search for specific players and view their yearly perforance along with the final colum using the Position specific regression model for predictions. A second player can be compared by using the second search window.
At any point, you can return to the Home Page by clicking "Home"

## <a name="Ethics"></a>Ethics: 
Fantasy football data is derived from NFL game statistics, rooted in real-world player performance. However, it's crucial to acknowledge the presence of selection bias within this dataset. While fantasy points are calculated based on standardized NFL game statistics, the interpretation and application of these numbers can vary across different fantasy football leagues. The dashboard's metrics are tailored to reflect a Points Per Reception (PPR) scoring style, offering insights aligned with this specific scoring system. It's important to recognize that users' league settings may differ, impacting the relevance and applicability of the visualization to their particular scoring rules.

Furthermore, the dataset encompasses player performance data from the past five years, providing an overview of recent trends. It's worth noting that some players may have more extensive data histories than others, potentially influencing the depth of analysis for certain individuals.

Inclusive of all available data points, even instances where players have scored zero points are included. However, the reasons behind these zero scores are not explicitly displayed within the dashboard. 

## <a name="db"></a> Data Source: [FootballDB](https://www.footballdb.com/fantasy-football/index.html?pos=RB&yr=2023&wk=%7Bx%7D&key=b6406b7aea3872d5bb677f064673c57f%27)
## Image: Freepik Realistic american footbal stadium 
https://www.freepik.com/free-vector/realistic-american-football-stadium_11733976.htm#query=american%20football%20field&position=0&from_view=keyword&track=ais&uuid=2e6983e7-c456-443a-8021-03bd72de6675

## <a name="Libraries"></a> Libraries:
- Scikit-Learn
- Matplotlib
- Numpy
- Datetime
- Flask
- SQLAlchemy 
- Pandas 
- Splinter
- BeautifulSoup
- Selenium
- Plotly
- Chart.JS

## <a name="Tech"></a> Technologies
- SQL 
- PostgresSQL
- Python 
- Jupyter Notebook 
- ChatGPT
- JavaScript
- CSS
- HTML
