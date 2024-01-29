const express =require('express');

const app=express();
app.use(express.json());

app.post('/temp', async (req, res) => {
    try {
        const { var1, var2 } = req.body;
        const result = var1 + var2;
        return res.json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error/Invalid Input' });
    }
});

app.get('/dummy', (req, res) => {
    return res.json({ message: 'Dummy Get request working' });
});

app.listen(3000,()=>{
    console.log("Server Connected On Post 3000");
});
