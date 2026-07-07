import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { Goal } from "@/lib/types";

export function GoalProgressItem({ goal }: { goal: Goal }) {
  const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const year = new Date(goal.targetDate).getFullYear();

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium text-foreground">{goal.name}</span>
        <span className="text-xs text-muted-foreground">{year}</span>
      </div>
      <Progress value={pct} />
      <div className="mt-1.5 flex items-baseline justify-between text-xs text-muted-foreground">
        <span>{formatCurrency(goal.currentAmount, "COP")}</span>
        <span>{Math.round(pct)}% de {formatCurrency(goal.targetAmount, "COP")}</span>
      </div>
    </div>
  );
}
