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
        </head>
        <body class="text-center">
            <main class="form-signin w-100 m-auto">
                <form action="/" method="post">
                    <img class="mb-4" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/bmi-calculator-2751460-2283491.png?f=avif&w=256" alt="" width="auto" height="100">
                    <div class="form-floating mb-3">
                        <input type="number" step="any" autocomplete="off" class="form-control" name="weight" placeholder="Enter Weight" required>
                        <label>Weight (Kg)</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" step="any" autocomplete="off" class="form-control" name="height" placeholder="Enter Height" required>
                        <label>Height (m)</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-warning" type="submit">Calculate BMI!</button>
                </form>
                <a href="/chart">
                    <button class="w-100 btn btn-outline-success mt-3">BMI Chart</button>
                </a>
            </main>
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
        </head>
        <body class="text-center">
            <main class="form-signin w-100 m-auto">
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    Your Calculated BMI is <strong>${BMI}</strong> (${category}).
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <a href="/">
                    <button class="w-100 btn btn-lg btn-warning mt-3">« Back to Calculator</button>
                </a>
            </main>
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
