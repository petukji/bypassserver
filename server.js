const express =require('express');

const crypto = require('crypto');
const secret_key = "9fbb9f251f1e8c038f0e1ee495154b4d";
const access_key = "75162261d7eb28c48c5c9f4860c339c0";

const app=express();
app.use(express.json());

app.post('/temp', async (req, res) => {
    try {
        // const { var1, var2 } = req.body;
        // const result = var1 + var2;
      
      
        const URL = "https://api.frenzopay.com/api/v1/payout/";

        const REQUEST_METHOD = "POST";
        const REQUEST_PATH = "/api/v1/payout/";
        const REQUEST_QUERYSTRING = "";
        const REQUEST_BODY = JSON.stringify(req.body);
        const xtimestamp = Date.now();

        const digest = crypto.createHmac('sha512', secret_key)
        digest.update(REQUEST_METHOD);
        digest.update('\n');
        digest.update(REQUEST_PATH);
        digest.update('\n');
        digest.update(REQUEST_QUERYSTRING);
        digest.update('\n');
        digest.update(REQUEST_BODY);
        digest.update('\n');
        digest.update(xtimestamp.toString());
        digest.update('\n');
        const signature = digest.digest('hex');

        const headers = { 'Content-Type': 'application/json', "access_key": access_key, 'signature': signature.toString(), 'X-Timestamp': xtimestamp.toString() }

        const response = await fetch(URL, {
            method: 'POST',
            headers,
            body: REQUEST_BODY,
        });

        const responseJson = await response.json();

        if (response.status == 200) {
            return res.status(200).json(responseJson);
        } else {
            return res.status(400).json(responseJson)
        }
      
      
      
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error/Invalid Input' });
    }
});

app.get('/dummy', (req, res) => {
    return res.json({ message: 'Fuck Off' });
});

app.listen(3000,()=>{
    console.log("Server Connected On Post 3000");
});
