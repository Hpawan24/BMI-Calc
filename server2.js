const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// --------------STATIC FILES---------------
app.use(express.static("public")); // Serve static files from the "public" directory

// ------------------GET ROUTES-------------------
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/chart", function (req, res) {
    res.sendFile(__dirname + "/chart.html");
});

// ------------------API ROUTES-------------------
// BMI calculation API (RESTful endpoint)
app.post("/api/v1/bmi", function (req, res) {
    const weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);

    // Convert height to meters if necessary
    if (height > 3 && height < 10) {
        height = height / 3.281; // Convert from feet to meters
    } else if (height >= 10) {
        height = height / 100; // Convert from cm to meters
    }

    // Calculate BMI
    const BMI = (weight / (height * height)).toFixed(2);

    // Determine BMI category
    let category = "";
    if (BMI < 18.5) {
        category = "Underweight";
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        category = "Normal weight";
    } else if (BMI >= 25 && BMI <= 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    // Return BMI and category as JSON
    res.status(200).json({
        bmi: BMI,
        category: category,
    });
});

// -----------------LISTEN------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
