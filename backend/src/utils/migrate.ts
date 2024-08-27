import { migrate } from 'drizzle-orm/mysql2/migrator';
import "dotenv/config";
import { db } from "../database/connections";

async function runMigrations() {
    try {
        await migrate(db, { migrationsFolder: "migrations" });
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

runMigrations();
