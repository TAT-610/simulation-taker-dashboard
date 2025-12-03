"use client";

import * as React from "react";
import { mySkills } from "@/services/mock-data/skill";
import type { Simulation } from "@/types/Simulation";
import SkillDialog from "@/components/Dashboard/SkillDialog";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";

type UserSkillsProps = {
  loading?: boolean;
  simulations: Simulation[] | null;
};

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

function UserSkills({ simulations }: UserSkillsProps) {
  const [openSkillId, setOpenSkillId] = React.useState<string | null>(null);

  // Build a lookup map of simulations we care about
  const simMap = React.useMemo(() => {
    const list = (simulations ?? []) as Array<
      Pick<
        Simulation,
        "id" | "title" | "companyName" | "status" | "score" | "difficulty"
      >
    >;

    const m = new Map<
      string,
      Pick<
        Simulation,
        "title" | "companyName" | "status" | "score" | "difficulty"
      >
    >();

    list.forEach((s) => {
      m.set(String(s.id), {
        title: s.title,
        companyName: s.companyName,
        status: s.status,
        score: s.score,
        difficulty: s.difficulty,
      });
    });

    return m;
  }, [simulations]);

  const chartData = React.useMemo(() => {
    return (mySkills ?? []).map(
      (skill: {
        id: string;
        skillName: string;
        totalScore: number;
        derivedFrom?: (string | number)[];
      }) => {
        const percent = Math.max(0, Math.min(100, skill.totalScore));

        const derived = (skill.derivedFrom ?? [])
          .map((id: string | number) => simMap.get(String(id)))
          .filter(
            (
              x: unknown
            ): x is Pick<
              Simulation,
              "title" | "companyName" | "status" | "score" | "difficulty"
            > => Boolean(x)
          );

        return {
          id: skill.id,
          name: skill.skillName,
          score: percent,
          totalSim: derived.length,
          derived,
        };
      }
    );
  }, [simMap]);

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[250px]">
          {/* Horizontal bar chart */}
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 0 }}
            barCategoryGap={1}
            barGap={2}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="name" type="category" hide />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => {
                    return [
                      `${value}%`,
                      `${item.payload.totalSim} simulations`,
                    ];
                  }}
                />
              }
            />

            <Bar
              dataKey="score"
              radius={8}
              barSize={35}
              fill="var(--color-score)"
              className="cursor-pointer"
              onClick={(entry: unknown) => {
                const e = entry as { payload?: { id?: string } };
                const id = e?.payload?.id;
                if (id) setOpenSkillId(id);
              }}
            >
              {/* category label inside bar, left-aligned */}
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-black font-semibold text-base"
              />

              {/* score label at the end of the bar */}
              <LabelList
                dataKey="score"
                position="right"
                className="fill-foreground font-medium"
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>

        {/* Dialog per skill */}
        {chartData.map(
          (skill: {
            id: string;
            name: string;
            derived: Array<
              Pick<
                Simulation,
                "title" | "companyName" | "status" | "score" | "difficulty"
              >
            >;
          }) => (
            <SkillDialog
              key={skill.id}
              open={openSkillId === skill.id}
              onOpenChange={(open) => setOpenSkillId(open ? skill.id : null)}
              skillName={skill.name}
              items={skill.derived
                .filter((d) => d.status !== "not_registed")
                .map(
                  (
                    d: Pick<
                      Simulation,
                      | "title"
                      | "companyName"
                      | "status"
                      | "score"
                      | "difficulty"
                    >
                  ) => ({
                    title: d.title,
                    companyName: d.companyName,
                    status: d.status as "active" | "completed" | "not_started",
                    score: Math.round(d.score ?? 0),
                  })
                )}
            />
          )
        )}
      </CardContent>
    </Card>
  );
}

export default UserSkills;
