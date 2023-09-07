import mariadb from "mariadb";

export async function connectDB() {
  const conn = await mariadb.createConnection({
    host: "mariadb", // name of the host (dockers)
    port: 3306, // standard post for mariadb
    user: "root", // root user defined in .env
    password: "root",
    database: "RISKLICKDB", // created from sql script in ./mariadb
  });
  return conn;
}
