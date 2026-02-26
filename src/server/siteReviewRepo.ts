import { getCollection } from './mongo';
import { SiteReview } from '@/lib/types';
import { ObjectId } from 'mongodb';

export async function siteReviewsGetAll() {
    const col = await getCollection<SiteReview>('site_reviews');
    return col.find().sort({ _id: -1 }).toArray();
}

export async function siteReviewsCreate(data: SiteReview) {
    const col = await getCollection<SiteReview>('site_reviews');
    const res = await col.insertOne(data);
    return { ...data, _id: res.insertedId };
}

export async function siteReviewsDelete(id: string) {
    const col = await getCollection<SiteReview>('site_reviews');
    const r1 = await col.deleteOne({ id } as any);
    if (r1.deletedCount === 0) {
        try { await col.deleteOne({ _id: new ObjectId(id) } as any); } catch { }
    }
}
