import express from "express"
import cors from "cors"

const app=express();
const PORT=3000;

app.use(express.json());
app.use(cors());

// dummy details
const FULL_NAME="John Doe";
const EMAIL_ID="JohnDoe@example.com";
const ROLL_NUMBER="JohnDoe1239876";
const DOB="11052003"


app.post("/bfhl", (req,res)=>{
    try{
        const requestBody=req.body;

        if(requestBody===undefined || requestBody===null){
            throw new Error("input data is missing");
        }
        if(!requestBody.data){
            throw new Error("input data property is missing");
        }
        if(!Array.isArray(requestBody.data)){
            throw new Error("input data should be an array.");
        }
        if(requestBody.data.length===0){
            throw new Error("input data is empty, please add body");
        }

        const data = requestBody.data;

        const lower_name=FULL_NAME.toLowerCase().replace(' ', '_');
        const user_id= lower_name+'_'+DOB;

        const odd_numbers=[];
        const even_numbers=[];
        const alphabets=[];
        const special_characters=[];
        let sum=0;

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))){
                const num = Number(item);
                sum += num;
                if(num%2 === 0){
                    even_numbers.push(String(num));
                } else{
                    odd_numbers.push(String(num));
                }
            } else if(/^[a-zA-Z]+$/.test(item)){
                alphabets.push(item.toUpperCase());
            }else{
                special_characters.push(item);
            }
        });

        const all_chars=alphabets.join('');
        const reversed_chars=all_chars.split('').reverse().join('');
        let concatString='';
        for (let i=0; i<reversed_chars.length;i++) {
            concatString+=(i%2===0)?reversed_chars[i].toUpperCase():reversed_chars[i].toLowerCase();
        }
        
        const response = {
            is_success: true,
            user_id: user_id,
            email: EMAIL_ID,
            roll_number: ROLL_NUMBER,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concatString
        };

        res.status(200).json(response);
    } catch(error){
        res.status(500).json({
            is_success:false,
            error: error.message
        })
    }
})

app.get("/", (req,res)=>{
    res.send("welcome to the api test, POST on /bfhl to get response");
})



app.listen(PORT, ()=>{
    console.log(`app is up and running on port: ${PORT}`);
})