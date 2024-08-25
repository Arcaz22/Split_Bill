import { migrate } from 'drizzle-orm/mysql2/migrator';
import "dotenv/config";
import { db } from "../database/connections";

async function runMigrations() {
    console.log("Running migrations...");
    try {
        await migrate(db, { migrationsFolder: "migrations" });
        console.log("Migrations completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

runMigrations();
