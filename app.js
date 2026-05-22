const http = require('http');
const { Client } = require('pg');

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  try {
    const client = new Client({
      host: 'db',       
      user: 'user',
      password: 'password',
      database: 'myapp',
      port: 5432,
    });

    await client.connect();
    const result = await client.query('SELECT NOW() as current_time');
    await client.end();

    res.end(`Hello from Docker Compose + PostgreSQL!\n\n` +
            `Connection Successful!\n` +
            `Current Database Time: ${result.rows[0].current_time}\n\n` +
            `🎉 You are now running a Full-Stack Docker App!`);
  } catch (err) {
    console.error(err);
    res.end(`Database Connection Failed\n\nError: ${err.message}`);
  }
});

server.listen(3000, '0.0.0.0', () => {
  console.log('✅ Server running on port 3000');
});