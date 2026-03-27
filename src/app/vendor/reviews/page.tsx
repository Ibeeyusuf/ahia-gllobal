"use client";
import { useState } from "react";
import { Flag, CornerDownRight, Edit2 } from "lucide-react";
import { useVendor } from "@/context/VendorContext";
import { useToast } from "@/components/ui/Toast";

function Stars({ n }: { n: number }) {
  return <span className="text-amber-400 tracking-wide">{"★".repeat(n)}{"☆".repeat(5-n)}</span>;
}

export default function VendorReviewsPage() {
  const { reviews, setReviews } = useVendor();
  const showToast = useToast();
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  function submitReply(id: number) {
    setReviews(p => p.map(r => r.id === id ? { ...r, reply: replyText } : r));
    showToast("success", "Reply Saved", "Your reply has been posted.");
    setReplyingId(null);
    setReplyText("");
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div><p className="text-[0.75rem] text-neutral-400 mb-1">Home / Reviews</p>
        <h2 className="font-heading font-bold text-xl text-neutral-900">Reviews</h2>
        <p className="text-[0.8rem] text-neutral-400 mt-0.5">Manage customer feedback</p>
      </div>

      <div className="grid gap-3.5">
        {reviews.map(r => {
          const ini = r.customer.split(" ").map(n=>n[0]).join("");
          const isReplying = replyingId === r.id;
          return (
            <div key={r.id} className="bg-white rounded-xl2 border-[1.5px] border-neutral-100 shadow-card p-5">
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-[0.72rem] font-bold flex-shrink-0">{ini}</div>
                  <div>
                    <p className="text-[0.85rem] font-semibold text-neutral-900">{r.customer}</p>
                    <p className="text-[0.72rem] text-neutral-400">{r.product} · {r.date}</p>
                  </div>
                </div>
                <Stars n={r.rating} />
              </div>

              <p className="text-[0.82rem] text-neutral-600 leading-relaxed mb-3">{r.text}</p>

              {/* Existing reply */}
              {r.reply && !isReplying && (
                <div className="border-l-[3px] border-primary-500 bg-neutral-50 rounded-r-[8px] px-3 py-2.5 mb-3">
                  <p className="text-[0.7rem] font-bold text-primary-600 mb-1">YOUR REPLY</p>
                  <p className="text-[0.8rem] text-neutral-600">{r.reply}</p>
                </div>
              )}

              {/* Reply input */}
              {isReplying && (
                <div className="mb-3 grid gap-2">
                  <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} rows={3}
                    placeholder="Write your reply…"
                    className="w-full px-3 py-2.5 border-[1.5px] border-neutral-200 rounded-[10px] text-[0.82rem] outline-none focus:border-primary-500 resize-none" />
                  <div className="flex gap-2">
                    <button onClick={()=>submitReply(r.id)} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[0.78rem] font-semibold transition-colors">Post Reply</button>
                    <button onClick={()=>setReplyingId(null)} className="px-4 py-2 border border-neutral-200 text-neutral-600 rounded-full text-[0.78rem] font-semibold hover:bg-neutral-50 transition-colors">Cancel</button>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={()=>{ setReplyingId(r.id); setReplyText(r.reply ?? ""); }}
                  className="flex items-center gap-1 px-3 py-1.5 border-[1.5px] border-neutral-200 rounded-full text-[0.75rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors">
                  {r.reply ? <><Edit2 className="w-3 h-3" />Edit Reply</> : <><CornerDownRight className="w-3 h-3" />Reply</>}
                </button>
                <button onClick={()=>showToast("info","Reported","This review has been flagged for moderation.")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-full text-[0.75rem] font-semibold hover:bg-red-100 transition-colors">
                  <Flag className="w-3 h-3" />Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
