// Vietnamese relative-time formatter. Accepts ISO string or Date.
// Buckets: < 60s "vừa xong", < 60min "X phút trước", < 24h "X giờ trước",
// < 7d "X ngày trước", else absolute dd/MM/yyyy.

export const formatRelative = (input: string | Date): string => {
    const d = typeof input === "string" ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return "";

    const diffMs = Date.now() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return "vừa xong";

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} phút trước`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} giờ trước`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay} ngày trước`;

    return d.toLocaleDateString("vi-VN");
};
