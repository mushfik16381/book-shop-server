const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;




// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hid3uqt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const categoryCollection = client.db('bookshop').collection('category');
        const allBooksCollection = client.db('bookshop').collection('allbooks');

        app.get('/category', async(req, res) =>{
            const query = {};
            const cursor = categoryCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        });

        // app.get('/category/:id', async(req, res) => {
        //     const id = req.params.id;
        //     const query = {_id:ObjectId(id)};
        //     const category_books = await categoryCollection.findOne(query);
        //     res.send(category_books);
        // });

        app.get('/allbooks', async(req, res) =>{
            const query = {};
            const cursor = allBooksCollection.find(query);
            const allbooks = await cursor.toArray();
            res.send(allbooks);
        });

        app.get('/allbooks/:id', async(req, res) => {
            const id = req.params.id;
            const query = {category_id: id};
            const cursor = allBooksCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });
    }
    finally{
    }
}
run().catch(err => console.error(err));




app.get('/', (req, res) =>{
    res.send('book shop server is running')
})

app.listen(port, () =>{
    console.log(`book shop is running: ${port}`)
})