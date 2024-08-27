import { db } from '../../database/connections';
import { roles } from '../../database/schema';
import { v4 as uuidv4 } from 'uuid';

export default async function RoleSeed() {
    const adminRoleId = uuidv4();
    const userRoleId = uuidv4();

    await db.insert(roles).values([
        { id: adminRoleId, name: 'admin' },
        { id: userRoleId, name: 'user' },
    ]);

}
