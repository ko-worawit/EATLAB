import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

const app = express();
const port = process.env.PORT || 3000

const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/products'

mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting MongoDB:', error));

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
  });
  
  const Product = mongoose.model('Product', productSchema);
  
  app.use(bodyParser.json());
  
  app.get('/products', async (req: Request, res: Response) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/products/:id', async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Product server listening at http://localhost:${port}`);
  });
