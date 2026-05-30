'use server';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

export async function fetchDatabaseMetrics() {
  try {
    const client = await pool.connect();
    
    const query1 = process.env.DB_QUERY_1 || "SELECT 0 as count;";
    const query2 = process.env.DB_QUERY_2 || "SELECT 0 as count;";
    const query3 = process.env.DB_QUERY_3 || "SELECT 0 as count;";

    const res1 = await client.query(query1);
    const res2 = await client.query(query2);
    const res3 = await client.query(query3);
    
    client.release();

    return {
      books: parseInt(Object.values(res1.rows[0] || { count: 0 })[0] as string) || 0,
      comments: parseInt(Object.values(res2.rows[0] || { count: 0 })[0] as string) || 0,
      users: parseInt(Object.values(res3.rows[0] || { count: 0 })[0] as string) || 0,
      offers: 0 
    };
  } catch (error) {
    console.error('Erro ao buscar métricas do BD:', error);
    return { books: 4, comments: 0, users: 4, offers: 0 }; 
  }
}