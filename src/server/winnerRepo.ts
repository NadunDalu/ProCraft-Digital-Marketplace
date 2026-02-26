import { getCollection } from './mongo';
import { Winner } from '@/lib/types';
import { ObjectId } from 'mongodb';

export async function winnersGetAll() {
    const col = await getCollection<Winner>('winners');
    return col.find().sort({ _id: -1 }).toArray();
}

export async function winnersGetByGiveaway(giveawayId: string) {
    const col = await getCollection<Winner>('winners');
    return col.find({ giveawayId } as any).toArray();
}

export async function winnersCreate(data: Winner) {
    const col = await getCollection<Winner>('winners');
    const res = await col.insertOne(data);
    return { ...data, _id: res.insertedId };
}

export async function winnersDelete(id: string) {
    const col = await getCollection<Winner>('winners');
    const r1 = await col.deleteOne({ id } as any);
    if (r1.deletedCount === 0) {
        try { await col.deleteOne({ _id: new ObjectId(id) } as any); } catch { }
    }
}
