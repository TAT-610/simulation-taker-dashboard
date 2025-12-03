import { Simulation } from "@/types/Simulation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import CardSimulation from "./CardSimulation";
import { CardSimulationSkeleton } from "./CardSimulationSkeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { BookAlert } from "lucide-react";

type UserSimulationsProps = {
  loading?: boolean;
  simulations: Simulation[] | null;
};

export default function UserSimulations({
  loading = false,
  simulations = [],
}: UserSimulationsProps) {
  const active = simulations?.filter((s) => s.status === "active") ?? [];
  const completed = simulations?.filter((s) => s.status === "completed") ?? [];
  const not_started =
    simulations?.filter((s) => s.status === "not_started") ?? [];

  return (
    <div>
      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="w-full bg-transparent p-0 gap-6 flex justify-start border-b">
          <TabsTrigger
            value="in-progress"
            className={cn(
              "bg-transparent shadow-none rounded-none px-2 py-2 text-base w-fit md:px-10 text-gray-500",
              "data-[state=active]:text-primary data-[state=active]:font-bold",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary"
            )}
          >
            In Progress ({loading ? "" : active.length})
          </TabsTrigger>

          <TabsTrigger
            value="completed"
            className={cn(
              "bg-transparent shadow-none rounded-none px-2 py-2 text-base w-fit md:px-10 text-gray-500",
              "data-[state=active]:text-primary data-[state=active]:font-bold",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary"
            )}
          >
            Completed ({loading ? "" : completed.length})
          </TabsTrigger>
          <TabsTrigger
            value="not_started"
            className={cn(
              "bg-transparent shadow-none rounded-none px-2 py-2 text-base w-fit md:px-10 text-gray-500",
              "data-[state=active]:text-primary data-[state=active]:font-bold",
              "data-[state=active]:border-b-2 data-[state=active]:border-primary"
            )}
          >
            Not Started ({loading ? "" : not_started.length})
          </TabsTrigger>
        </TabsList>

        {/* In Progress Tab */}
        <TabsContent value="in-progress" className="mt-4">
          {loading && (
            <>
              <CardSimulationSkeleton />
            </>
          )}

          {!loading && active.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookAlert className="text-xl" />
                </EmptyMedia>
                <EmptyTitle>No Simulation</EmptyTitle>
                <EmptyDescription>
                  You have no active simulations.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {!loading &&
            active.map((sim) => <CardSimulation key={sim.id} sim={sim} />)}
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="mt-4">
          {loading && (
            <>
              <CardSimulationSkeleton />
            </>
          )}

          {!loading && completed.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookAlert className="text-xl" />
                </EmptyMedia>
                <EmptyTitle>No Simulation</EmptyTitle>
                <EmptyDescription>
                  You have no completed simulations.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {!loading &&
            completed.map((sim) => <CardSimulation key={sim.id} sim={sim} />)}
        </TabsContent>
        <TabsContent value="not_started" className="mt-4">
          {loading && (
            <>
              <CardSimulationSkeleton />
            </>
          )}

          {!loading && not_started.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookAlert className="text-xl" />
                </EmptyMedia>
                <EmptyTitle>No Simulation</EmptyTitle>
                <EmptyDescription>
                  You have no completed simulations.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {!loading &&
            not_started.map((sim) => <CardSimulation key={sim.id} sim={sim} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
