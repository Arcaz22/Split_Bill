import { readdirSync } from 'fs';
import { join } from 'path';

const seedsDirectory = __dirname;

async function runSeeders() {
    const seedFiles = readdirSync(seedsDirectory)
        .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of seedFiles) {
        try {
            const seedModule = await import(join(seedsDirectory, file));

            if (typeof seedModule.default === 'function') {
                await seedModule.default();
                console.log(`${file} seeded successfully!`);
            } else {
                console.warn(`${file} does not export a default function and was skipped.`);
            }
        } catch (err) {
            console.error(`Failed to seed ${file}:`, err);
        }
    }

    console.log('All seeders have been run.');
}

runSeeders().catch(err => {
    console.error('Failed to run seeders:', err);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});
