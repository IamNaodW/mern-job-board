import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';  // import your db connection
import cors from 'cors';



const PORT = process.env.PORT || 5000;

// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // or '*' to allow all origins (not recommended in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // if you want to send cookies/auth headers
}));
const startServer = async () => {
  await connectDB();  // wait for DB connection

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
