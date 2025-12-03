"use client";
import { Card } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { BriefcaseBusiness } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { User } from "@/types/User";
import { Simulation } from "@/types/Simulation";
type HeaderSnapShotProps = {
  user: User | null;
  loading?: boolean;
  simulations: Simulation[] | null;
};

function HeaderSnapShot({
  user,
  loading = false,
  simulations,
}: HeaderSnapShotProps) {
  const completedCount =
    simulations?.filter((sim) => sim.status === "completed").length || 0;

  const activeAndCompletedCount =
    simulations?.filter(
      (sim) => sim.status === "active" || sim.status === "completed"
    ).length || 0;

  return (
    <div className="w-full">
      {/* Header Card */}
      <Card
        className="bg-gradient-to-r from-primary to-secondary
                   rounded-3xl py-5 px-4 sm:px-8 w-full
                   shadow-md backdrop-blur-md flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10
                   items-center"
      >
        {/* Avatar */}
        {loading ? (
          <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-white/60" />
        ) : (
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-white/80 border-4 rounded-xl overflow-hidden shadow-lg">
            <AvatarImage
              src={user?.avatar}
              alt={user?.name}
              className="object-cover w-full h-full"
            />
          </Avatar>
        )}

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-2 sm:mb-4">
            {loading || !user ? "Welcome!" : `Welcome ${user.name}!`}
          </h1>

          {/* Streak */}
          {loading ? (
            <Skeleton className="h-5 sm:h-6 w-48 mb-2 bg-white/60" />
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-1 sm:gap-2 mb-2">
              <p className="text-white text-sm sm:text-base">You are on a</p>
              <span className="text-base sm:text-lg font-bold text-yellow-300">
                🔥 {user?.streak ?? 0} day streak
              </span>
            </div>
          )}

          <p className="text-white/90 text-sm sm:text-base  leading-relaxed">
            Keep up the momentum and unlock your potential! 🚀
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 mt-5">
        {/* Started Simulations Card */}
        <Card className="p-3 sm:p-4 bg-indigo-50 border-indigo-200 shadow-sm rounded-2xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex w-12 h-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>
            <div className="flex flex-col w-full sm:w-auto items-center sm:items-start">
              <div className="text-xs sm:text-sm text-indigo-600">
                Started Simulations
              </div>
              <div className="text-lg sm:text-xl font-bold text-indigo-600 text-center md:text-left w-full">
                {loading || !user ? (
                  <Skeleton className="h-6 w-full bg-white/80" />
                ) : (
                  activeAndCompletedCount
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Completed Simulations Card */}
        <Card className="p-3 sm:p-4 bg-emerald-50 border-emerald-200 shadow-sm rounded-2xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex w-12 h-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>

            <div className="flex flex-col w-full sm:w-auto items-center sm:items-start">
              <p className="text-xs sm:text-sm text-emerald-600">
                Completed Simulations
              </p>
              <div className="text-lg sm:text-xl font-bold text-emerald-600 text-center md:text-left w-full">
                {loading || !user ? (
                  <Skeleton className="h-6 w-full bg-white/80" />
                ) : (
                  completedCount
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Avg Score Card */}
        <Card className="p-3 sm:p-4 bg-sky-50 border-sky-200 shadow-sm rounded-2xl">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden w-12 h-12 sm:flex items-center justify-center rounded-xl bg-sky-500 text-white">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>

            <div className="flex flex-col w-full sm:w-auto items-center sm:items-start">
              <p className="text-xs sm:text-sm text-sky-600">Average Score</p>
              <div className="text-lg sm:text-xl font-bold text-sky-600 text-center md:text-left w-full">
                {loading || !user ? (
                  <Skeleton className="h-6 w-full bg-white/80" />
                ) : (
                  user.averageScore
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Career Rate Card */}
        <Card className="p-3 sm:p-4 bg-orange-50 border-orange-200 shadow-sm rounded-2xl">
          <div className="flex items-center w-full sm:gap-4">
            <div className="hidden sm:flex w-12 h-12  items-center justify-center rounded-xl bg-orange-500 text-white">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>

            <div className="flex flex-col w-full sm:w-auto items-center sm:items-start">
              <p className="text-xs sm:text-sm text-orange-600">Career Rate</p>
              <div className="text-lg sm:text-xl font-bold text-orange-600 text-center md:text-left w-full">
                {loading || !user ? (
                  <Skeleton className="h-6 w-full bg-white/80" />
                ) : (
                  user.actionRate + "%"
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HeaderSnapShot;
