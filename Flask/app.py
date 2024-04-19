from flask import Flask, render_template, send_from_directory, jsonify

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('Home.html')



@app.route('/QB')#button to QB page 
def qb_index():
    return render_template('QBPointsFlask.html')


@app.route('/RB')#button to RB page 
def rb_index():
    return render_template('RBPointsFlask.html')

@app.route('/WR')#button to WR page
def wr_index():
    return render_template('WRPointsFlask.html')

@app.route('/predictQB')#button to WR page
def predict():
    return render_template('QBPredictionFlask.html')

@app.route('/predictRB')#button to WR page
def predictRB():
    return render_template('RBPredictionFlask.html')

@app.route('/predictWR')#button to WR page
def predictWR():
    return render_template('WRPredictionFlask.html')


@app.route('/QB5.json')#import QB last 5 games data 
def get_QB5_data():
    return send_from_directory('static', 'QB5.json')

@app.route('/QBPointData.json') #import QB weekly point data 
def get_QBPoints():
    return send_from_directory('static', 'QBPointData.json')

@app.route('/QBYear.json') #import QB yearly data 
def get_QBYear_data():
    return send_from_directory('static', 'QBYear.json')

@app.route('/RB5.json')#import RB last 5 games data 
def get_RB5_data():
    return send_from_directory('static', 'RB5.json')

@app.route('/RBPointData.json')#import RB weekly point data 
def get_RBPointData():
    return send_from_directory('static', 'RBPointData.json')

@app.route('/RBYear.json')#import RB yearly data 
def get_RBYear_data():
    return send_from_directory('static', 'RBYear.json')

@app.route('/WR5.json')#import WR last 5 games data 
def get_WR5_data():
    return send_from_directory('static', 'WR5.json')

@app.route('/WRPointData.json')#import RB weekly point data 
def get_WRPointData():
    return send_from_directory('static', 'WRPointData.json') 

@app.route('/WRYear.json')#import WR yearly data
def get_WRYear_data():
    return send_from_directory('static', 'WRYear.json')


@app.route('/QBYearlyPoints.json') #import QB weekly point data 
def get_QBYearlyPoints():
    return send_from_directory('static', 'QBYearlyPoints.json')

@app.route('/RBYearlyPoints.json') #import QB weekly point data 
def get_RBYearlyPoints():
    return send_from_directory('static', 'RBYearlyPoints.json')

@app.route('/WRYearlyPoints.json') #import QB weekly point data 
def get_WRYearlyPoints():
    return send_from_directory('static', 'WRYearlyPoints.json')



if __name__ == '__main__':
    app.run(debug=True)


