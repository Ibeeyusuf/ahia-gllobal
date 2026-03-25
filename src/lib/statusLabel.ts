export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    transit:    "In Transit",
    processing: "Processing",
    assigned:   "Assigned",
    delivered:  "Delivered",
    pending:    "Pending",
    rejected:   "Rejected",
    confirmed:  "Confirmed",
    online:     "Online",
    offline:    "Offline",
    active:     "Active",
    suspended:  "Suspended",
    picked:     "Picked Up",
  };
  return map[status] ?? status.charAt(0).toUpperCase() + status.slice(1);
}
