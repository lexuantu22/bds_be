const { Client } = require('pg');
const client = new Client({
  host: '103.166.184.133',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'real_estate'
});

client.connect()
  .then(() => client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
  .then(res => {
    console.log('Tables in VPS DB:', res.rows.map(r => r.table_name).join(', '));
    return client.query("SELECT COUNT(*) FROM real_estate_posts").catch(e => ({rows: [{count: 'Table missing'}]}));
  })
  .then(res => {
    console.log('Rows in real_estate_posts:', res.rows[0].count);
    client.end();
  })
  .catch(err => {
    console.error('Error:', err.message);
    client.end();
  });
