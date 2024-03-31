import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import urlRoutes from './routes/urls';
import userRoutes from './routes/users';
import Url from './models/url'; 
import rateLimit from 'express-rate-limit';

const app: Express = express();
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });
// Use cors middleware
app.use(cors());
app.use(apiLimiter);

// Use express.json() middleware for parsing application/json
app.use(express.json());

// Use routes
app.use('/api/urls',apiLimiter, urlRoutes);
app.use('/api/users',apiLimiter, userRoutes);
app.get('/:urlCode', async (req, res) => {
    try {
      const url = await Url.findOne({ urlCode: req.params.urlCode });
      if (url) {
        // Increment the visit count
        url.visits += 1;
        if(req?.ip && req?.headers?.['user-agent']){
        // Record the visit details (optional)
        url.visitDetails.push({
          ip: req?.ip,
          userAgent: req?.headers['user-agent'], 
          timestamp: new Date()
        });
    }
        await url.save();
  
        return res.redirect(url.longUrl);
      } else {
        return res.status(404).send('URL not found');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
  });
  
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/url_shortener')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;
