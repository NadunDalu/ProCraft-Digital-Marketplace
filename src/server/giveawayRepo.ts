import { getCollection } from './mongo';
import { Giveaway } from '@/lib/types';
import { ObjectId } from 'mongodb';

export async function giveawaysGetAll() {
    const col = await getCollection<Giveaway>('giveaways');
    return col.find().sort({ _id: -1 }).toArray();
}

export async function giveawaysCreate(data: Giveaway) {
    const col = await getCollection<Giveaway>('giveaways');
    const res = await col.insertOne(data);
    return { ...data, _id: res.insertedId };
}

export async function giveawaysDelete(id: string) {
    const col = await getCollection<Giveaway>('giveaways');
    const r1 = await col.deleteOne({ id } as any);
    if (r1.deletedCount === 0) {
        try { await col.deleteOne({ _id: new ObjectId(id) } as any); } catch { }
    }
}

export async function giveawaysUpdate(id: string, data: Partial<Giveaway>) {
    const col = await getCollection<Giveaway>('giveaways');
    const { _id, ...updateData } = data as any;

    let result = await col.updateOne({ id } as any, { $set: updateData });
    if (result.matchedCount === 0 && ObjectId.isValid(id)) {
        result = await col.updateOne({ _id: new ObjectId(id) } as any, { $set: updateData });
    }
    return result;
}
