import mariadb from "mariadb";

export async function connectDB() {
  const conn = await mariadb.createConnection({
    host: "mariadb",
    port: 3306,
    user: "root",
    password: "root",
    database: "RISKLICKDB",
  });
  return conn;
}

// 172.24.0.1
// /run/mysqld/mysqld.sock
