import path from 'path';
import express, { Express, Request, Response } from 'express';
import expressRateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
// import xss from 'xss';
// import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './docs';
// Middlewares.
import globalErrorHandler from '@src/middlewares/error.middleware';
import notFoundHandler from '@src/middlewares/notfound.middleware';
// Routes
import authRoutes from '@src/routes/v1/auth.routes';
import customerRoutes from '@src/routes/v1/user.routes';
// import vendorRoutes from '@src/routes/v1/vendor.routes';
// import subCategoryRoutes from '@src/routes/v1/sub-category.routes';
// import categoryRoutes from '@src/routes/v1/category.routes';
// import productRoutes from '@src/routes/v1/product.routes';
// import cartRoutes from '@src/routes/v1/cart.routes';
// import orderRoutes from '@src/routes/v1/order.routes';
// import couponRoutes from '@src/routes/v1/coupon.routes';
// import makerCheckerRoutes from '@src/routes/v1/maker-checker.routes';
// import transactionRoutes from '@src/routes/v1/transaction.routes';
// import auditRoutes from '@src/routes/v1/audit.routes';
// import logRoutes from '@src/routes/v1/log.routes';
// import fileRoutes from '@src/routes/v1/file.routes';

// Initialize Server
const app: Express = express();

// app.enable('trust proxy');

// CORS
app.use(
  cors({ origin: 'http://localhost:3000' })
  // origin: 'https://someurl.com'
); // cors() is a middleware which means that you can implement on specific routes as middleware

// app.options('*', cors());
// app.options('/api/v1/tours/:id', cors()) // You can also use for specific routes

// SERVING STATIC FILES
// app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'public'))); // This says, anytime there is a request from the
// server, look in the public folder e.g for http://localhost:5000/overview.html, overview should be placed
// in the root of the publis folder
app.use(express.static(path.join(__dirname, 'uploads')));

// SECURITY - Anti Cross-site Scripting - Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// LOGGING - DEVELOPMENT
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// SECURITY - Anti Brute Force Attacks - Set rate limiting
app.use(
  '/api',
  expressRateLimit({
    // By specifying api, this would then affect all the routes since they all have /api
    max: 100, // no of requests per IP
    windowMs: 60 * 60 * 1000, // per period(1 hr)
    message: {
      status: 429,
      message: 'Too many requests from this IP, please try again in an hour',
    },
  })
);

// STRIPE CHECKOUT WEBHOOK
// When we needs this body in a raw form
// app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout);

// REQUEST BODY PARSING
app.use(express.json({ limit: '10kb' })); // This would limit the body size to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // This would limit the body size to 10kb
app.use(cookieParser()); // Parses data from cookies

// SECURITY - Data sanitization against NoSQL query injection
// app.use(mongoSanitize()); // It will look at the req.body, req.query and req.params, and basically
// filter out all of the dollar($) signs and dots(.) in the values

// SECURITY - Data sanitization against XSS - cross site scripting
// app.use(xss()); // This would clean any user input from malicious html code

// SECURITY - Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'price'], // specify parameters that can be duplicated in the query
  })
);

// COMPRESSION
app.use(compression()); //

// TESTING MIDDLEWARE
app.use((req: Request, res: Response, next) => {
  console.log('TEST MIDDLEWARE', req.cookies)
  next();
});

// RESOURCES ROUTES
const api = process.env.API_URL;

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/users`, customerRoutes);
// app.use(`${api}/vendors`, vendorRoutes);
// app.use(`${api}/sub-categories`, subCategoryRoutes);
// app.use(`${api}/categories`, categoryRoutes);
// app.use(`${api}/products`, productRoutes);
// app.use(`${api}/carts`, cartRoutes);
// app.use(`${api}/orders`, orderRoutes);
// app.use(`${api}/coupons`, couponRoutes);
// app.use(`${api}/transactions`, transactionRoutes);
// app.use(`${api}/audit`, auditRoutes);
// app.use(`${api}/logs`, logRoutes);
// app.use(`${api}/maker-checker`, makerCheckerRoutes);
// app.use(`${api}/files`, fileRoutes);

// API documentation.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Handle unhandled routes - routes that are not caught by any routers
app.all('/^(?!graphql$)/', notFoundHandler);

// Global error handling.
app.use(globalErrorHandler);

export default app;
