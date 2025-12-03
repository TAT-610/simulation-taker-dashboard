import { Simulation } from "@/types/Simulation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecomemSimulation({
  skillName,
  items,
  loading = false,
}: {
  skillName: string;
  items: Simulation[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={`rec-skel-${i}`}
            className="flex items-center gap-3 rounded-lg border p-3 bg-card"
          >
            <Skeleton className="h-16 w-16 rounded bg-slate-400" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3 bg-slate-400" />
              <Skeleton className="h-3 w-1/5 bg-slate-400" />
              <div className="mt-1 flex gap-2 bg-slate-400">
                <Skeleton className="h-5 w-16 rounded bg-slate-400" />
                <Skeleton className="h-5 w-20 rounded bg-slate-400" />
              </div>
              <div className="mt-2 flex gap-2">
                <Skeleton className="h-5 w-14 rounded-full bg-slate-400" />
                <Skeleton className="h-5 w-12 rounded-full bg-slate-400" />
                <Skeleton className="h-5 w-10 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No recommendations for &quot;{skillName}&quot; yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((rec) => (
        <div
          key={rec.id}
          className="flex items-center gap-3 rounded-lg border p-3 bg-card"
        >
          <Image
            height={80}
            width={80}
            src={rec.logo}
            alt={rec.title}
            className="h-16 w-16 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {rec.title}
              </p>
            </div>
            {rec.companyName && (
              <span className="text-xs text-muted-foreground">
                {rec.companyName}
              </span>
            )}
            {/* Role & difficulty row */}
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-secondary/20 px-2 py-0.5 text-secondary-foreground">
                {rec.role}
              </span>
              <span className="rounded bg-sky-100 px-2 py-0.5 text-sky-700 -foreground">
                {rec.difficulty}
              </span>
            </div>
            {/* Skills on a new line with label - highlighted badges */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                Skills:
              </span>
              {rec.skills && rec.skills.length > 0 ? (
                rec.skills.slice(0, 5).map((s, idx) => (
                  <span
                    key={`${rec.id}-skill-${idx}`}
                    className="text-xs rounded-full bg-purple-100 text-accent-foreground px-2.5 py-0.5 border border-accent/30"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
