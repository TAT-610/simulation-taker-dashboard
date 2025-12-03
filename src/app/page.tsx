"use client";

import { CalendarStreak } from "@/components/Dashboard/Calendar";
import HeaderSnapShot from "@/components/Dashboard/HeaderSnapShot";
import UserSimulations from "@/components/Dashboard/UserSimulations";
import { LayoutPanelLeft } from "lucide-react";
import { User } from "@/types/User";
import { getUserById } from "@/services/api/user";
import { getSimulation } from "@/services/api/simulation";
import { useEffect, useState } from "react";
import { Simulation } from "@/types/Simulation";
export default function Home() {
  const [simulations, setSimulations] = useState<Simulation[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [userData, simulationsData] = await Promise.all([
          getUserById(),
          getSimulation(),
        ]);

        setUser(userData);
        setSimulations(simulationsData);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="flex flex-col min-h-screen w-full md:w-[80%]  mx-auto pt-10 px-4 sm:px-6 lg:px-10 bg-white">
      {/* Header */}
      <h1 className="flex items-center gap-2 text-xl sm:text-2-xl font-semibold text-[#251EAD] pb-5">
        <LayoutPanelLeft strokeWidth={2.5} size={25} />
        Dashboard
      </h1>

      {/* Dashboard Snapshot */}
      <HeaderSnapShot user={user} loading={loading} simulations={simulations} />
      <div className="mt-16 flex gap-10 flex-col md:flex-row">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="mb-5">
            <h2 className="font-bold text-2xl">Your Simulations</h2>
            <p className="text-gray-700 ">
              Track your progress across different roles
            </p>
          </div>
          <UserSimulations />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4">
          <CalendarStreak streak={user?.streak ?? 0} />
        </div>
      </div>
    </main>
  );
}
