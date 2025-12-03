"use client";

import { CalendarStreak } from "@/components/Dashboard/Calendar";
import HeaderSnapShot from "@/components/Dashboard/HeaderSnapShot";
import UserSimulations from "@/components/Dashboard/UserSimulations";
import { LayoutPanelLeft } from "lucide-react";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { Simulation } from "@/types/Simulation";
import {
  Mysimulations as mockSimulations,
  simulationsRecomment,
} from "@/services/mock-data/simulation";
import { user as mockUser } from "@/services/mock-data/user";
import UserSkills from "@/components/Dashboard/UserSkills";
import RecomemSimulation from "@/components/Dashboard/RecomemSimulation";
export default function Home() {
  const [simulations, setSimulations] = useState<Simulation[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lowestSkill, setLowestSkill] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Simulation[] | null>(
    null
  );

  useEffect(() => {
    setLoading(true);
    try {
      const userData: User | null = mockUser?.[0] ?? null;
      const simulationsData: Simulation[] | null =
        (mockSimulations ?? []).map((s) => ({
          id: s.id,
          title: s.title,
          logo: s.logo,
          role: s.role,
          companyName: s.companyName,
          difficulty:
            s.difficulty === "Beginner" ||
            s.difficulty === "Intermediate" ||
            s.difficulty === "Advanced"
              ? s.difficulty
              : "Beginner",
          lastActivity: new Date((s.lastActivity ?? Date.now()) * 1000),
          progress: s.progress ?? 0,
          skills: s.skills ?? [],
          score: s.score ?? 0,
          lesson: s.lesson ?? [],
          status:
            s.status === "In Progress"
              ? "active"
              : s.status === "Completed"
              ? "completed"
              : "not_started",
        })) ?? null;

      setUser(userData);
      setSimulations(simulationsData);

      const completed = (simulationsData ?? []).filter(
        (s) => s.status === "completed"
      );
      const skillScores = new Map<string, number>();
      for (const sim of completed) {
        const perSkillScore = Math.max(0, sim.score ?? 0);
        for (const sk of sim.skills ?? []) {
          skillScores.set(sk, (skillScores.get(sk) ?? 0) + perSkillScore);
        }
      }
      if (skillScores.size > 0) {
        let minSkill = null as string | null;
        let minScore = Number.POSITIVE_INFINITY;
        for (const [sk, sc] of skillScores.entries()) {
          if (sc < minScore) {
            minScore = sc;
            minSkill = sk;
          }
        }
        setLowestSkill(minSkill);
        const recosRaw = (simulationsRecomment ?? []).filter((r) =>
          (r.skills ?? []).includes(minSkill as string)
        );
        const recos: Simulation[] = recosRaw.map((s) => ({
          id: s.id,
          title: s.title,
          logo: s.logo,
          role: s.role,
          companyName: s.companyName,
          difficulty:
            s.difficulty === "Beginner" ||
            s.difficulty === "Intermediate" ||
            s.difficulty === "Advanced"
              ? s.difficulty
              : "Beginner",
          lastActivity: new Date((s.lastActivity ?? Date.now()) * 1000),
          progress: s.progress ?? 0,
          skills: s.skills ?? [],
          score: s.score ?? 0,
          lesson: s.lesson ?? [],
          status:
            s.status === "In Progress"
              ? "active"
              : s.status === "Completed"
              ? "completed"
              : "not_started",
        }));
        setRecommendations(recos.length > 0 ? recos : null);
      } else {
        setLowestSkill(null);
        setRecommendations(null);
      }
    } catch (error) {
      console.error("Lỗi khi load dữ liệu dashboard (mock):", error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <main className="flex flex-col min-h-screen w-full md:w-[80%]  mx-auto pt-10 px-4 sm:px-6 lg:px-10 pb-20 bg-white">
      {/* Header */}
      <h1 className="flex items-center gap-2 text-xl sm:text-2-xl font-semibold text-[#251EAD] pb-5">
        <LayoutPanelLeft strokeWidth={2.5} size={25} />
        Dashboard
      </h1>

      {/* Dashboard Snapshot */}
      <HeaderSnapShot user={user} loading={loading} simulations={simulations} />
      <div className="mt-16 flex gap-10 flex-col md:flex-row">
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-10">
          <div className="w-full">
            <div className="mb-5">
              <h2 className="font-bold text-2xl">Your Simulations</h2>
              <p className="text-gray-700 ">
                Track your progress across different roles
              </p>
            </div>
            <UserSimulations loading={loading} simulations={simulations} />
          </div>
          <div className="w-full">
            <div className="mb-5">
              <h2 className="font-bold text-2xl">Your Skills</h2>
              <p className="text-gray-700 ">
                Click a skill to see contributing simulations
              </p>
            </div>
            <UserSkills loading={loading} simulations={simulations} />
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          <CalendarStreak streak={user?.streak ?? 0} />
          <div className="w-full mt-10">
            <div className="mb-5">
              <h2 className="font-bold text-2xl">What&apos;s next?</h2>
              <p className="text-gray-700 ">
                Personalized recommendations for you
              </p>
            </div>
            {lowestSkill && (
              <RecomemSimulation
                skillName={lowestSkill}
                items={recommendations ?? []}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
