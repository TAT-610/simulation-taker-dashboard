"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// Removed tabs per request; show completed list only

export type SkillDialogItem = {
  title: string;
  companyName?: string;
  status: "active" | "completed" | "not_started";
  score: number;
};

type SkillDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillName: string;
  items: SkillDialogItem[];
};

export default function SkillDialog({
  open,
  onOpenChange,
  skillName,
  items,
}: SkillDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">{skillName}</DialogTitle>
          <DialogDescription>
            Completed simulations contributing to this skill
          </DialogDescription>
        </DialogHeader>
        <div className="mt-3 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-600">
              No simulations contributed to this skill.
            </p>
          ) : (
            items
              .filter((d) => d.status === "completed")
              .map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3 bg-card"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {d.title}
                    </p>
                    {d.companyName && (
                      <p className="text-xs text-gray-500">{d.companyName}</p>
                    )}
                    <span className="mt-1 inline-block text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      completed
                    </span>
                  </div>
                  <div className="text-emerald-600 text-lg font-bold">
                    {Math.round(d.score)}%
                  </div>
                </div>
              ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
