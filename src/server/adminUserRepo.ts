import { getCollection } from './mongo';
import bcrypt from 'bcryptjs';

export type AdminUser = {
    username: string;
    passwordHash: string;
    createdAt?: string;
};

export async function findAdminUserByUsername(username: string) {
    const col = await getCollection<AdminUser>('admin_users');
    return col.findOne({ username });
}

export async function createAdminUser(username: string, password: string) {
    const col = await getCollection<AdminUser>('admin_users');
    const passwordHash = await bcrypt.hash(password, 12);
    await col.updateOne(
        { username },
        { $set: { username, passwordHash, createdAt: new Date().toISOString() } },
        { upsert: true }
    );
}

export async function verifyAdminPassword(username: string, password: string): Promise<boolean> {
    const user = await findAdminUserByUsername(username);
    if (!user) return false;
    return bcrypt.compare(password, user.passwordHash);
}
