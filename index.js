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
        const bookingCollection = client.db('bookshop').collection('orders');
        const userCollection = client.db('bookshop').collection('user');
        const addCollection = client.db('bookshop').collection('add');
        const reportCollection = client.db('bookshop').collection('reported');

        app.get('/category', async(req, res) =>{
            const query = {};
            const cursor = categoryCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        });

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
        app.get('/allbook/:email', async(req, res) => {
            const email = req.params.email;
            const query = { seller_email: email};
            const cursor = allBooksCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });
        app.post('/allbooks', async(req, res) => {
            const book =req.body;
            console.log(book)
            const result = await allBooksCollection.insertOne(book)
            res.send(result)
        });
        app.get('/orders', async(req, res) =>{
            const query = {};
            const cursor = bookingCollection.find(query);
            const book = await cursor.toArray();
            res.send(book);
        });
        app.get('/orders/:email', async(req, res) => {
            const email = req.params.email;
            const query = { userEmail: email};
            const cursor = bookingCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });
        app.post('/orders', async(req, res) => {
            const book =req.body;
            console.log(book)
            const result = await bookingCollection.insertOne(book)
            res.send(result)
        });
        app.get('/user', async(req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const book = await cursor.toArray();
            res.send(book);
        });
        app.get('/member/:role', async(req, res) => {
            const role = req.params.role;
            const query = { roleIndentify: role};
            const cursor = userCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });
        app.get('/user/:email', async(req, res) => {
            const email = req.params.email;
            const query = { userEmail: email};
            const cursor = userCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });
        app.post('/user', async(req, res) => {
            const book =req.body;
            console.log(book)
            const result = await userCollection.insertOne(book)
            res.send(result)
        });
        app.post('/advertize', async(req, res) => {
            const book =req.body;
            console.log(book)
            const result = await addCollection.insertOne(book)
            res.send(result)
        });
        app.get('/advertize', async(req, res) =>{
            const query = {};
            const cursor = addCollection.find(query);
            const allbooks = await cursor.toArray();
            res.send(allbooks);
        });
        app.post('/reported/:id', async(req, res) => {
            const book =req.body;
            console.log(book)
            const result = await reportCollection.insertOne(book)
            res.send(result)
        });
        app.get('/reported', async(req, res) =>{
            const query = {};
            const cursor = reportCollection.find(query);
            const allbooks = await cursor.toArray();
            res.send(allbooks);
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