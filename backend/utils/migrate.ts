import { migrate } from 'drizzle-orm/mysql2/migrator';
import "dotenv/config";
import { db } from "../database/connections";

console.log("Running migrations...");
migrate(db, { migrationsFolder: "migrations" });
console.log("Database migrated successfully!");
process.exit(0);
