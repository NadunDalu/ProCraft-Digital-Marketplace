'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, ImageIcon, MessageSquareQuote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ─── Types ─── */
type SiteReview = {
    _id?: string;
    id?: string;
    name: string;
    text?: string;
    image?: string;
};

/* ─── Helpers ─── */
function rowId(r: SiteReview) {
    return r._id?.toString() || r.id || '';
}

const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

/* ─── UI Components ─── */
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b flex items-center justify-between bg-muted/40">
                    <h3 className="text-lg font-bold">{title}</h3>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-tight">{label}</label>
            {children}
        </div>
    );
}

const inputCls =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary';

/* ─── Main component ─── */
export default function AdminReviews() {
    const { toast } = useToast();

    /* State */
    const [reviews, setReviews] = useState<SiteReview[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [newReview, setNewReview] = useState<SiteReview>({ name: '', text: '', image: '' });
    const [imagePreview, setImagePreview] = useState('');
    const [saving, setSaving] = useState(false);

    /* ─── Load reviews ─── */
    async function loadReviews() {
        setLoading(true);
        try {
            const res = await fetch('/api/site-reviews');
            setReviews(await res.json());
        } catch {
            toast({ title: 'Error', description: 'Failed to load reviews', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadReviews();
    }, []);

    /* ─── Save review ─── */
    async function saveReview() {
        if (!newReview.name) {
            toast({ title: 'Error', description: 'Customer Name is required', variant: 'destructive' });
            return;
        }
        if (!newReview.text && !newReview.image) {
            toast({ title: 'Error', description: 'At least a text review or a screenshot image is required', variant: 'destructive' });
            return;
        }

        setSaving(true);
        try {
            const payload = { ...newReview, id: crypto.randomUUID() };
            const res = await fetch('/api/site-reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Failed to add review');
            setShowAdd(false);
            setNewReview({ name: '', text: '', image: '' });
            setImagePreview('');
            await loadReviews();

            setTimeout(() => {
                toast({ title: '🌟 Review added!' });
            }, 100);
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    }

    /* ─── Delete review ─── */
    async function deleteReview(r: SiteReview) {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            const res = await fetch(`/api/site-reviews/${encodeURIComponent(rowId(r))}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            toast({ title: 'Review removed' });
            await loadReviews();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Customer Reviews</h1>
                    <p className="text-muted-foreground text-sm">Manage reviews shown heavily on the site.</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                    <Plus className="h-4 w-4" /> Add Review
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" /> Loading…
                </div>
            ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 py-16 text-center">
                    <MessageSquareQuote className="h-10 w-10 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">No site reviews yet</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Click "Add Review" to show off customer love</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {reviews.map((r, i) => (
                        <div key={i} className="group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
                            {r.image ? (
                                <div className="aspect-[4/3] w-full bg-muted overflow-hidden relative border-b border-border/40">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="aspect-[4/3] w-full bg-primary/5 flex items-center justify-center border-b border-border/40 p-4">
                                    <p className="text-sm italic text-foreground/80 text-center line-clamp-6">"{r.text}"</p>
                                </div>
                            )}
                            <div className="p-4 flex items-center justify-between gap-2 mt-auto">
                                <span className="font-semibold text-sm truncate">{r.name}</span>
                                <button
                                    onClick={() => deleteReview(r)}
                                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showAdd && (
                <Modal title="Add Customer Review" onClose={() => setShowAdd(false)}>
                    <div className="space-y-4">
                        <Field label="Customer Name *">
                            <input
                                className={inputCls}
                                placeholder="e.g. John Doe or Twitter Username"
                                value={newReview.name}
                                onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                            />
                        </Field>

                        <div className="text-xs bg-muted/40 p-3 rounded-xl text-muted-foreground leading-relaxed my-2">
                            A review must have either a <strong className="text-foreground">Text Review</strong> OR an <strong className="text-foreground">Image Screenshot</strong> (like a tweet). You can also provide both.
                        </div>

                        <Field label="Text Review (Optional)">
                            <textarea
                                className={`${inputCls} min-h-[80px] resize-y`}
                                placeholder="Type what the customer said…"
                                value={newReview.text || ''}
                                onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                            />
                        </Field>

                        <Field label="Review Screenshot (Optional)">
                            <label className="flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-primary/5 cursor-pointer transition-all p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const f = e.target.files?.[0];
                                        if (!f) return;
                                        if (f.size > 2 * 1024 * 1024) { alert('Max 2MB'); return; }
                                        const b = await toBase64(f);
                                        setImagePreview(b);
                                        setNewReview({ ...newReview, image: b });
                                    }}
                                />
                                {imagePreview
                                    // eslint-disable-next-line @next/next/no-img-element
                                    ? <img src={imagePreview} alt="Preview" className="h-24 rounded-lg object-contain shadow-sm" />
                                    : <><ImageIcon className="h-7 w-7 text-muted-foreground/40 mb-1" /><span className="text-xs text-muted-foreground font-medium">Click to upload image</span></>
                                }
                            </label>
                        </Field>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => setShowAdd(false)}
                                className="flex-1 rounded-xl border border-border py-2 text-sm font-medium hover:bg-muted transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveReview}
                                disabled={saving}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 py-2 text-sm font-semibold text-primary-foreground shadow-md disabled:opacity-50 transition-all hover:shadow-lg"
                            >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                                Add Review
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
