'use client';

import { useEffect, useState } from 'react';
import { Trophy, Plus, Trash2, Loader2, Gift, Medal, X, Calendar, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ─── Types ─── */
type Giveaway = {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    image: string;
    endDate: string;
};

type Winner = {
    _id?: string;
    id?: string;
    giveawayId?: string;
    name: string;
    prize: string;
    avatar?: string;
};

/* ─── Helpers ─── */
function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function rowId(item: Giveaway | Winner): string {
    return (item as any)._id?.toString?.() ?? (item as any).id ?? '';
}

/* ─── Modal wrapper ─── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card shadow-2xl">
                <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
}

/* ─── Field ─── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            {children}
        </label>
    );
}

const inputCls =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary';

/* ─── Main component ─── */
export default function AdminGiveaways() {
    const { toast } = useToast();
    const [tab, setTab] = useState<'giveaways' | 'winners'>('giveaways');

    /* Giveaways state */
    const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
    const [gLoading, setGLoading] = useState(false);
    const [showAddGiveaway, setShowAddGiveaway] = useState(false);
    const [newGiveaway, setNewGiveaway] = useState<Giveaway>({
        title: '', description: '', image: '', endDate: '',
    });
    const [giveawayImagePreview, setGiveawayImagePreview] = useState('');
    const [gSaving, setGSaving] = useState(false);

    /* Winners state */
    const [winners, setWinners] = useState<Winner[]>([]);
    const [wLoading, setWLoading] = useState(false);
    const [showAddWinner, setShowAddWinner] = useState(false);
    const [newWinner, setNewWinner] = useState<Winner>({ name: '', prize: '', avatar: '', giveawayId: '' });
    const [winnerAvatarPreview, setWinnerAvatarPreview] = useState('');
    const [wSaving, setWSaving] = useState(false);

    /* ─── Load giveaways ─── */
    async function loadGiveaways() {
        setGLoading(true);
        try {
            const res = await fetch('/api/giveaways');
            setGiveaways(await res.json());
        } catch {
            toast({ title: 'Error', description: 'Failed to load giveaways', variant: 'destructive' });
        } finally {
            setGLoading(false);
        }
    }

    /* ─── Load winners ─── */
    async function loadWinners() {
        setWLoading(true);
        try {
            const res = await fetch('/api/winners');
            setWinners(await res.json());
        } catch {
            toast({ title: 'Error', description: 'Failed to load winners', variant: 'destructive' });
        } finally {
            setWLoading(false);
        }
    }

    useEffect(() => {
        loadGiveaways();
        loadWinners();
    }, []);

    /* ─── Save giveaway ─── */
    async function saveGiveaway() {
        if (!newGiveaway.title || !newGiveaway.endDate) {
            toast({ title: 'Error', description: 'Title and End Date are required', variant: 'destructive' });
            return;
        }
        setGSaving(true);
        try {
            const payload = { ...newGiveaway, id: crypto.randomUUID() };
            const res = await fetch('/api/giveaways', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Failed to create giveaway');
            toast({ title: '🎉 Giveaway created!' });
            setShowAddGiveaway(false);
            setNewGiveaway({ title: '', description: '', image: '', endDate: '' });
            setGiveawayImagePreview('');
            await loadGiveaways();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setGSaving(false);
        }
    }

    /* ─── Delete giveaway ─── */
    async function deleteGiveaway(item: Giveaway) {
        if (!confirm('Delete this giveaway?')) return;
        const id = rowId(item);
        try {
            await fetch(`/api/giveaways/${encodeURIComponent(id)}`, { method: 'DELETE' });
            toast({ title: '🗑️ Giveaway deleted' });
            await loadGiveaways();
        } catch {
            toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
        }
    }

    /* ─── Save winner ─── */
    async function saveWinner() {
        if (!newWinner.name || !newWinner.prize) {
            toast({ title: 'Error', description: 'Name and Prize are required', variant: 'destructive' });
            return;
        }
        setWSaving(true);
        try {
            const payload = { ...newWinner, id: crypto.randomUUID() };
            const res = await fetch('/api/winners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Failed to announce winner');
            toast({ title: '🏆 Winner announced!' });
            setShowAddWinner(false);
            setNewWinner({ name: '', prize: '', avatar: '', giveawayId: '' });
            setWinnerAvatarPreview('');
            await loadWinners();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setWSaving(false);
        }
    }

    /* ─── Delete winner ─── */
    async function deleteWinner(item: Winner) {
        if (!confirm('Remove this winner?')) return;
        const id = rowId(item);
        try {
            await fetch(`/api/winners/${encodeURIComponent(id)}`, { method: 'DELETE' });
            toast({ title: '🗑️ Winner removed' });
            await loadWinners();
        } catch {
            toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
        }
    }

    /* ─── Render ─── */
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" /> Giveaways &amp; Winners
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Create giveaways and announce winners</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl border border-border/50 bg-muted/40 p-1 w-fit">
                {(['giveaways', 'winners'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${tab === t
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {t === 'giveaways' ? <Gift className="h-4 w-4" /> : <Medal className="h-4 w-4" />}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* ══════════════ GIVEAWAYS TAB ══════════════ */}
            {tab === 'giveaways' && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddGiveaway(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                        >
                            <Plus className="h-4 w-4" /> New Giveaway
                        </button>
                    </div>

                    {gLoading ? (
                        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" /> Loading…
                        </div>
                    ) : giveaways.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 py-16 text-center">
                            <Gift className="h-10 w-10 text-muted-foreground/30 mb-3" />
                            <p className="text-sm font-medium text-muted-foreground">No giveaways yet</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">Click "New Giveaway" to create one</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {giveaways.map((g, i) => (
                                <div key={i} className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all">
                                    {/* Image */}
                                    {g.image ? (
                                        <div className="aspect-video w-full overflow-hidden bg-muted">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={g.image} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                    ) : (
                                        <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                                            <Gift className="h-10 w-10 text-primary/40" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm truncate">{g.title}</h3>
                                                {g.description && (
                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{g.description}</p>
                                                )}
                                                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    Ends: {g.endDate || 'TBD'}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteGiveaway(g)}
                                                className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ══════════════ WINNERS TAB ══════════════ */}
            {tab === 'winners' && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddWinner(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-amber-500/25 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                        >
                            <Trophy className="h-4 w-4" /> Announce Winner
                        </button>
                    </div>

                    {wLoading ? (
                        <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" /> Loading…
                        </div>
                    ) : winners.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 py-16 text-center">
                            <Trophy className="h-10 w-10 text-amber-400/40 mb-3" />
                            <p className="text-sm font-medium text-muted-foreground">No winners yet</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">Click "Announce Winner" to add one</p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-border/60 overflow-hidden bg-card shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border/50 bg-muted/50">
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Winner</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prize</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Giveaway</th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {winners.map((w, i) => (
                                            <tr key={i} className={`border-b border-border/30 hover:bg-primary/4 transition-colors ${i % 2 === 1 ? 'bg-muted/20' : ''}`}>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {w.avatar ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={w.avatar} alt={w.name} className="h-8 w-8 rounded-full object-cover border border-border" />
                                                        ) : (
                                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold text-primary">
                                                                {w.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <span className="font-medium">{w.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-950/40 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                                                        🏆 {w.prize}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-xs text-muted-foreground">
                                                    {w.giveawayId
                                                        ? giveaways.find(g => g.id === w.giveawayId || (g as any)._id?.toString() === w.giveawayId)?.title ?? w.giveawayId
                                                        : '—'}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => deleteWinner(w)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 transition-all"
                                                    >
                                                        <Trash2 className="h-3 w-3" /> Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ══════════════ ADD GIVEAWAY MODAL ══════════════ */}
            {showAddGiveaway && (
                <Modal title="New Giveaway" onClose={() => setShowAddGiveaway(false)}>
                    <div className="space-y-4">
                        <Field label="Title *">
                            <input
                                className={inputCls}
                                placeholder="e.g. Lifetime CISCO Subscription"
                                value={newGiveaway.title}
                                onChange={e => setNewGiveaway({ ...newGiveaway, title: e.target.value })}
                            />
                        </Field>
                        <Field label="Description">
                            <textarea
                                className={`${inputCls} min-h-[80px] resize-y`}
                                placeholder="Describe this giveaway…"
                                value={newGiveaway.description}
                                onChange={e => setNewGiveaway({ ...newGiveaway, description: e.target.value })}
                            />
                        </Field>
                        <Field label="End Date *">
                            <input
                                className={inputCls}
                                placeholder="e.g. December 31, 2025"
                                value={newGiveaway.endDate}
                                onChange={e => setNewGiveaway({ ...newGiveaway, endDate: e.target.value })}
                            />
                        </Field>
                        <Field label="Giveaway Image">
                            <label className="flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-primary/5 cursor-pointer transition-all p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const f = e.target.files?.[0];
                                        if (!f) return;
                                        if (f.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
                                        const b = await toBase64(f);
                                        setGiveawayImagePreview(b);
                                        setNewGiveaway({ ...newGiveaway, image: b });
                                    }}
                                />
                                {giveawayImagePreview
                                    // eslint-disable-next-line @next/next/no-img-element
                                    ? <img src={giveawayImagePreview} alt="Preview" className="h-24 rounded-lg object-cover" />
                                    : <><ImageIcon className="h-7 w-7 text-muted-foreground/40 mb-1" /><span className="text-xs text-muted-foreground">Click to upload</span></>
                                }
                            </label>
                        </Field>
                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={() => setShowAddGiveaway(false)}
                                className="flex-1 rounded-xl border border-border py-2 text-sm font-medium hover:bg-muted transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveGiveaway}
                                disabled={gSaving}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 py-2 text-sm font-semibold text-primary-foreground shadow-md disabled:opacity-50 transition-all hover:shadow-lg"
                            >
                                {gSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                                Create Giveaway
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* ══════════════ ANNOUNCE WINNER MODAL ══════════════ */}
            {showAddWinner && (
                <Modal title="Announce Winner" onClose={() => setShowAddWinner(false)}>
                    <div className="space-y-4">
                        <Field label="Winner Name *">
                            <input
                                className={inputCls}
                                placeholder="e.g. John Doe"
                                value={newWinner.name}
                                onChange={e => setNewWinner({ ...newWinner, name: e.target.value })}
                            />
                        </Field>
                        <Field label="Prize *">
                            <input
                                className={inputCls}
                                placeholder="e.g. TryHackMe Premium"
                                value={newWinner.prize}
                                onChange={e => setNewWinner({ ...newWinner, prize: e.target.value })}
                            />
                        </Field>
                        <Field label="Linked Giveaway (optional)">
                            <select
                                className={inputCls}
                                value={newWinner.giveawayId ?? ''}
                                onChange={e => setNewWinner({ ...newWinner, giveawayId: e.target.value })}
                            >
                                <option value="">— None —</option>
                                {giveaways.map((g, i) => (
                                    <option key={i} value={g.id ?? (g as any)._id?.toString() ?? ''}>
                                        {g.title}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Winner Photo (optional)">
                            <label className="flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed border-border hover:border-amber-400/50 bg-muted/30 hover:bg-amber-50/5 cursor-pointer transition-all p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const f = e.target.files?.[0];
                                        if (!f) return;
                                        if (f.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
                                        const b = await toBase64(f);
                                        setWinnerAvatarPreview(b);
                                        setNewWinner({ ...newWinner, avatar: b });
                                    }}
                                />
                                {winnerAvatarPreview
                                    // eslint-disable-next-line @next/next/no-img-element
                                    ? <img src={winnerAvatarPreview} alt="Preview" className="h-20 w-20 rounded-full object-cover border-2 border-amber-400" />
                                    : <><ImageIcon className="h-7 w-7 text-muted-foreground/40 mb-1" /><span className="text-xs text-muted-foreground">Click to upload photo</span></>
                                }
                            </label>
                        </Field>
                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={() => setShowAddWinner(false)}
                                className="flex-1 rounded-xl border border-border py-2 text-sm font-medium hover:bg-muted transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveWinner}
                                disabled={wSaving}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-50 transition-all hover:shadow-lg"
                            >
                                {wSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trophy className="h-4 w-4" />}
                                Announce Winner
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
