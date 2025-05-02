import {useState} from 'react';
import axios from 'axios';

export function Bmireact()
{
    const [height , setHeight] = useState(0);
    const [weight , setWeight] = useState(0);
    const [category , setCategory] = useState(null);
    const [result , setResult] = useState('')

    const calculateBmi = async() => {
        try{
            const res = await axios.post('http://localhost:5000/api/bmi',{
                weight : weight,
                height : height
            });
            setResult(res.data);        
        }catch(err){
            console.log(err);
        }
    };
    return(
        <>
            <div>
                <h1>BMI CALCULATOR</h1>
                <input type="number" placeholder="Enter your weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)}></input>
                <input type="number" placeholder="Enter your height (cm)" value={height} onChange={(e) => setHeight(e.target.value)}></input>
                <button onClick={calculateBmi}>Calculate</button>
            </div>

            <div>
                <h4>{result.height}</h4>
                <h4>{result.weight}</h4>
                <h4>{result.bmi}</h4>
                <h4>{result.category}</h4>
            </div>
        </>
    );
}

