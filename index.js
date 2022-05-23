const express = require('express');
var cors = require('cors');
var ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wmvzq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        await client.connect();
        console.log('database connected');

        const productsColluction = client.db('warehouseManagementDB').collection('products');

        //get all products
        app.get('/products', async (req, res) => {

            const query = {}
            const cursor = productsColluction.find(query)
            const products = await cursor.toArray()
            res.send(products)

        })

        //post a products in all products collection
        app.post('/products', async (req, res) => {

            const newProduct = req.body;
            const result = await productsColluction.insertOne(newProduct)
            console.log('adding new product', newProduct);
            res.send(result)

        })

        //get product by email 

        app.get('/myitems/:id', async (req, res) => {
            // console.log(req.params.id)
            // res.send(req.params.id)
            const search = req.params.id


            const query = { email: `${req.params.id}` }
            // console.log(query);
            const cursor = productsColluction.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })
        // //get product by quantity 

        // app.get('/restock/:id', async (req, res) => {
        //     // console.log(req.params.id)
        //     // res.send(req.params.id)
        //     const search = req.params.id


        //     const query = { quantity: `${req.params.id}` }
        //     // console.log(query);
        //     const cursor = productsColluction.find(query)
        //     const products = await cursor.toArray()
        //     res.send(products)
        // })

        //get product by id

        app.get('/products/:id', async (req, res) => {
            // console.log(req.params.id)
            // res.send(req.params.id)
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            console.log(query);
            const result = await productsColluction.findOne(query)

            res.send(result)
        })

        //delete a product

        app.delete('/products/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) }

            const result = await productsColluction.deleteOne(query);
            res.send(result)
        })

        //update product restock

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id
            const updateQuentity = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    quentity: updateQuentity.quentity
                }
            }

            const result = await productsColluction.updateOne(filter, updatedDoc, options)

            res.send(result)
        })

        //update product delivered

        app.put('/delivered/:id', async (req, res) => {
            const id = req.params.id
            const updateDelivered = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    quentity: updateDelivered.quentity
                }
            }

            const result = await productsColluction.updateOne(filter, updatedDoc, options)

            res.send(result)
        })







    }

    finally {

    }

}

run().catch(console.dir);



// fzcuPMZ6crWLv9PR
// warehouseManagementDB

const users = [
    {
        "id": 0,
        "price": "$2,644.65",
        "picture": "http://placehold.it/32x32",
        "supplier": "blue",
        "name": "Glenn Villarreal",
        "discription": "Elit ullamco occaecat ut laborum est. Ut dolor minim qui qui eu consequat. Duis Lorem enim ipsum eu sunt adipisicing id tempor commodo. Cupidatat magna fugiat occaecat magna mollit dolor minim deserunt ullamco et labore voluptate excepteur. Reprehenderit irure consequat labore officia sit veniam minim mollit adipisicing veniam.\r\n"
    },
    {
        "id": 1,
        "price": "$1,503.47",
        "picture": "http://placehold.it/32x32",
        "supplier": "blue",
        "name": "Mendez Cash",
        "discription": "Ea labore eiusmod tempor et ex dolor. Officia quis amet fugiat minim id eiusmod consequat elit sit aliquip amet amet proident. Amet aliqua elit voluptate laboris ad occaecat incididunt nisi minim. Elit ullamco proident occaecat fugiat quis adipisicing proident officia ut ut ea occaecat esse aliquip. Aute ut quis minim est et Lorem commodo irure sunt deserunt velit consectetur velit.\r\n"
    },
    {
        "id": 2,
        "price": "$1,134.90",
        "picture": "http://placehold.it/32x32",
        "supplier": "blue",
        "name": "Miller Sweeney",
        "discription": "Ea proident consectetur culpa veniam excepteur eiusmod eu. Dolor sint officia exercitation sunt irure mollit officia cupidatat labore. Nulla tempor incididunt fugiat elit non culpa consequat id.\r\n"
    },
    {
        "id": 3,
        "price": "$1,141.82",
        "picture": "http://placehold.it/32x32",
        "supplier": "brown",
        "name": "Janine Herrera",
        "discription": "Laboris reprehenderit proident consequat exercitation culpa deserunt sunt irure est quis. Excepteur dolor nulla cupidatat deserunt. Aliquip amet ad qui velit ut laborum nisi tempor exercitation sit eiusmod. Sit elit Lorem tempor non ipsum ea excepteur tempor deserunt proident eiusmod fugiat duis. Ex duis commodo velit amet velit tempor aliquip commodo sit ea laboris eu consectetur proident. Culpa dolor labore enim id duis pariatur qui laborum.\r\n"
    },
    {
        "id": 4,
        "price": "$1,792.40",
        "picture": "http://placehold.it/32x32",
        "supplier": "brown",
        "name": "Browning Carey",
        "discription": "Culpa in fugiat dolore nulla ipsum. Sit deserunt minim et exercitation id et amet tempor voluptate sunt do Lorem ex exercitation. Exercitation incididunt mollit non esse. Sunt irure sint commodo sint. Consequat sint irure deserunt amet aute occaecat reprehenderit labore irure enim culpa pariatur. Ad aliqua excepteur sit exercitation dolor et pariatur. Mollit mollit ad eu minim exercitation ea anim duis culpa excepteur id aliquip amet voluptate.\r\n"
    },
    {
        "id": 5,
        "price": "$1,763.62",
        "picture": "http://placehold.it/32x32",
        "supplier": "green",
        "name": "Casey Carlson",
        "discription": "Sint officia quis incididunt excepteur consequat nulla ipsum dolore quis laborum. Enim officia anim do voluptate enim culpa esse sunt ipsum incididunt sint sunt deserunt. Cillum proident sint consectetur pariatur voluptate. Aute cillum proident mollit dolor qui qui aute aute tempor magna. Cillum qui do aliquip dolore. Eu sint pariatur enim quis est aute minim. Cillum dolor ad anim consectetur ad.\r\n"
    },
    {
        "id": 6,
        "price": "$3,338.76",
        "picture": "http://placehold.it/32x32",
        "supplier": "brown",
        "name": "Benjamin Salinas",
        "discription": "Ullamco aliquip est pariatur amet reprehenderit nulla qui quis adipisicing anim excepteur nulla. Consequat est excepteur adipisicing proident dolor do ad incididunt. Do sunt enim reprehenderit aute elit laboris aliqua commodo dolor aliquip proident. Id non officia non non aute nisi irure aliqua. Eiusmod culpa anim sunt ipsum in.\r\n"
    }
]

app.get('/', (req, res) => {
    res.send('hey there!hlwwww')
})



app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {

    console.log(req.params);
    const id = req.params.id
    const user = users[id]
    res.send(user)
})

app.post('/user', (req, res) => {

    console.log("request", req.body);
    const user = req.body
    user.id = users.length + 1;
    users.push(user)
    res.send(user)

})

app.listen(port, () => {
    console.log('listning to port', port);
})