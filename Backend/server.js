import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';  // import your db connection

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();  // wait for DB connection

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
