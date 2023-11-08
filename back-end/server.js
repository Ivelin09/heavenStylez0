const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const products = require('./schemas/products');
const users = require('./schemas/users');
const jwt = require('jsonwebtoken');
const upload = require("./middlewares/multer");
const fs = require("fs");
const image = require('./schemas/images');
const bodyParser = require('body-parser')
const path = require('path');


server.use(express.json());
server.use(cors());
server.use('/products', express.static(path.join(__dirname, 'products')));


mongoose.connect('mongodb://localhost:27017/heavenStylez',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const createFolder = (req, res, next) => {
  console.log(req.body, "HERE");
  fs.mkdirSync(`./products/${req.body.path}`);

  next();
}

server.post('/products', upload.fields([{ name: 'secondaryImage' }, { name: 'image' }, { name: 'primaryImage' }]), async (req, res) => {
  console.log(req.files);

  const images = new image({
    primaryImagePath: req.files.primaryImage[0].path,
    secondaryImagePath: req.files.secondaryImage[0].path,
    images: req.files.image.map((image) => image.path)
  });

  await images.save();

  const product = new products({
    title: req.body.title,
    description: req.body.description,
    id: images._id,
    price: req.body.price
  });
  await product.save();

  res.json({ message: 'success' })
})

server.get('/products/:page', async (req, res) => {
  console.log(req.params);
  const { page } = req.params;
  const doc = await products.find({}, {}, { skip: page * 20, limit: 20 }).then(async (products) => {
    let data = await Promise.all(products.map((async (product) => {
      const imagesObj = await image.findOne(product.image);
      const { _id, primaryImagePath, secondaryImagePath, images } = imagesObj;
      console.log(imagesObj)
      const object = {
        title: product.title,
        description: product.description,
        id: _id,
        primaryImagePath,
        secondaryImagePath,
        images
      }
      return object;
    })));

    return data;
  });

  res.json({ message: doc });
});

server.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await products.findById(id);
  console.log('pro', product)

  res.json({
    message: product
  });
});

server.get('/total_products', async (req, res) => {
  const totalProducts = await products.countDocuments({});
  res.json({
    message: totalProducts / 20
  })
});

server.post('/users', async (req, res) => {
  const user = new users({
    username: req.body.user,
    password: req.body.pass,
    role: req.body.role
  });
  let key = { username: req.body.user, role: req.body.role }
  const token = await jwt.sign({ key }, 'fdsafewt34aqrt43rtq23dsad', { algorithm: 'HS256' }, { expiresIn: '24h' });
  await user.save();
  console.log(token);
  res.json({ token })
})

server.post('/role', async (req, res) => {
  let decoded = await jwt.verify(req.body.key, 'fdsafewt34aqrt43rtq23dsad');
  console.log(decoded.key.role)
  let tokenData = { role: decoded.key.role, username: decoded.key.username }
  res.json(tokenData)
});

server.get("/", (req, res) => {
  console.log('k');
  res.send("ok");
});

server.post('/', (req, res) => {
  console.log("WHAAAAAAAAAT");
  res.send("ok");
});

server.post('/login', async (req, res) => {

  const user = await users.findOne({ username: req.body.username });
  if (user) {
    const result = req.body.password === user.password;
    if (result) {
      let key = { username: req.body.user, role: req.body.role }
      const token = await jwt.sign({ key }, 'fdsafewt34aqrt43rtq23dsad', { algorithm: 'HS256' }, { expiresIn: '24h' });
      res.sendStatus(200).json({
        status: 'success',
        token: {
          token
        }
      });
    }
  } else res.sendStatus(404).send('Status: Not Found')
  console.log(res.status)
})



server.listen(8000, () => {
  console.log("Server is  on");
})