const express =require('express');

const crypto = require('crypto');

const app=express();
app.use(express.json());

app.post('/temp', async (req, res) => {
    try {
         const { tmp1, tmp2,tmp3,tmp4, tmp5 } = req.body;
        // const result = var1 + var2;
      
      
        const URL = tmp4;

        const REQUEST_METHOD = "POST";
        const REQUEST_PATH = tmp5;
        const REQUEST_QUERYSTRING = "";
        const REQUEST_BODY = JSON.stringify(tmp3);
        const xtimestamp = Date.now();

        const digest = crypto.createHmac('sha512', tmp1)
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

        const headers = { 'Content-Type': 'application/json', "access_key": tmp2, 'signature': signature.toString(), 'X-Timestamp': xtimestamp.toString() }

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
