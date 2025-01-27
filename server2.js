const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>BMI Calculator</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f8f9fa;
                }
                .form-container {
                    max-width: 360px;
                    padding: 15px;
                    border-radius: 10px;
                    background: white;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .form-container img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <div class="form-container">
                <form action="/" method="post">
                    <img class="mb-4" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/bmi-calculator-2751460-2283491.png?f=avif&w=256" alt="BMI Calculator" width="128" height="128">
                    <h1 class="h3 mb-3 fw-normal text-center">BMI Calculator</h1>
                    <div class="form-floating mb-3">
                        <input type="number" step="any" autocomplete="off" class="form-control" name="weight" placeholder="Enter Weight" required>
                        <label>Weight (Kg)</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" step="any" autocomplete="off" class="form-control" name="height" placeholder="Enter Height" required>
                        <label>Height (m)</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Calculate BMI</button>
                </form>
                <a href="/chart">
                    <button class="w-100 btn btn-outline-secondary mt-3">View BMI Chart</button>
                </a>
            </div>
        </body>
        </html>
    `);
});

app.post('/', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (!weight || !height || height <= 0) {
        res.status(400).send("Invalid input. Please ensure both weight and height are positive numbers.");
        return;
    }

    const BMI = (weight / (height * height)).toFixed(2);
    let category = "";

    if (BMI < 18.5) {
        category = "Underweight";
    } else if (BMI >= 18.5 && BMI < 24.9) {
        category = "Normal weight";
    } else if (BMI >= 25 && BMI < 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>BMI Result</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f8f9fa;
                }
                .result-container {
                    max-width: 360px;
                    padding: 15px;
                    border-radius: 10px;
                    background: white;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="result-container">
                <h1 class="h3 mb-3 fw-normal">Your BMI Result</h1>
                <p class="mb-3">Your Calculated BMI is <strong>${BMI}</strong> (${category}).</p>
                <a href="/">
                    <button class="w-100 btn btn-lg btn-primary">Back to Calculator</button>
                </a>
            </div>
        </body>
        </html>
    `);
});

app.get('/chart', (req, res) => {
    res.sendFile(__dirname + '/chart.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
