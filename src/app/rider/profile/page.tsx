"use client";
import { useToast } from "@/components/ui/Toast";

export default function RiderProfilePage() {
  const showToast = useToast();

  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="font-heading text-xl font-bold text-neutral-900">My Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Profile card */}
        <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-neutral-100">
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white font-heading font-bold text-2xl">EO</div>
            <div>
              <h3 className="font-heading font-bold text-neutral-900 text-lg">Emeka Okafor</h3>
              <p className="text-sm text-neutral-500">Motorcycle Rider · Lagos Express Co.</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center px-2.5 py-[3px] rounded-full text-[0.7rem] font-semibold bg-green-100 text-green-800">● Active</span>
                <span className="text-xs text-amber-600 font-semibold">⭐ 4.9 rating</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Full Name",     type: "text", val: "Emeka Okafor"           },
              { label: "Phone Number",  type: "tel",  val: "+234 812 345 6789"       },
              { label: "Vehicle",       type: "text", val: "Honda CB125 Motorcycle"  },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium text-neutral-600 mb-1">{f.label}</label>
                <input type={f.type} defaultValue={f.val}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500 transition-colors" />
              </div>
            ))}
            <button onClick={() => showToast("success", "Profile Saved", "Your profile has been updated.")}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Bank account */}
          <div className="bg-white rounded-xl2 border border-neutral-100 shadow-card p-5">
            <h3 className="font-heading font-bold text-sm text-neutral-900 mb-3">Bank Account</h3>
            <div className="space-y-3">
              {[
                { label: "Bank Name",       val: "GTBank"   },
                { label: "Account Number",  val: "****4521" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">{f.label}</label>
                  <input type="text" defaultValue={f.val}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-lg text-sm bg-neutral-50 outline-none focus:border-primary-500 transition-colors" />
                </div>
              ))}
              <button onClick={() => showToast("success", "Bank Updated", "Payout account updated.")}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
                Update Payout Account
              </button>
            </div>
          </div>

          {/* Performance summary */}
          <div className="bg-primary-50 border border-primary-100 rounded-xl2 p-4">
            <h3 className="font-heading font-bold text-sm text-primary-900 mb-3 flex items-center gap-2">
              ⭐ Performance Summary
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Total Deliveries", val: "412"       },
                { label: "Completion Rate",  val: "98%"       },
                { label: "Average Rating",   val: "⭐ 4.9"   },
                { label: "Member Since",     val: "Jan 2024"  },
              ].map(row => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-primary-700">{row.label}</span>
                  <span className="font-bold text-primary-900">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
