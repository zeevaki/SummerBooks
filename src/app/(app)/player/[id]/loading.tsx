import { Skeleton } from "@/components/ui/Skeleton";

export default function PlayerLoading() {
  return (
    <div style={{ padding: "40px 48px 120px", maxWidth: 800, display: "flex", flexDirection: "column", gap: 24 }}>
      <Skeleton height={36} width="60%" />
      <Skeleton height={18} width="30%" />
      <Skeleton height={1} width="100%" />
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} height={14} width={`${85 + Math.random() * 15}%`} />
      ))}
    </div>
  );
}
