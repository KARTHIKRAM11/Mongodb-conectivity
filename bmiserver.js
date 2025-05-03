const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bmimodel = require('./bmimodel');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/')
        .then(() => console.log("Connected!!!"));


function calculateCategory(bmi)
{
    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 25) return 'Normal';
    else return 'Overweight';
}

app.post('/api/bmi' , async(req , res) => {
    const {weight , height} = req.body;

    if(!weight || !height || height<=0 || weight <=0)
    {
        return res.status(400).json({error : 'Invalid input'});
    }

    const hM = height/100;
    const bmi = weight/(hM*hM);
    const category = calculateCategory(bmi);

    const newRecord = new bmimodel({height , weight , bmi , category});
    await newRecord.save();

    res.json({
        height: `${height} cm`,
        weight: `${weight} kg`,
        bmi:bmi.toFixed(2),
        category :category
    });
});

    app.get('/api/bmi', async (req, res) => {
        try {
            const records = await bmimodel.find().sort({ _id: -1 });
            res.json(records);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch records' });
    }
  });


app.listen(5000 , () =>{
    console.log("running at port 5000 !!!");
})
