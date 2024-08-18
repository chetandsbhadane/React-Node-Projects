const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/',(req,res) => {
    res.render('index',{ weather: null, error: null, city: null })
});

app.post('/', async (req,res) => {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    console.log(city);

    try{
        const response = await axios.get(url);

        const weather = response.data;
        res.render('index', { weather: weather, error: null, city: city });
    }
    catch(error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.render('index', { weather: null, error: 'Error, please try again or check entered city', city: city });
    }
   
});

app.listen(3000,()=>{
    console.log("server is running on 3000 port")
})

