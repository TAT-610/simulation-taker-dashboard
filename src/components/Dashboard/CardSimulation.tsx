import { Simulation } from "@/types/Simulation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import * as React from "react";
interface CardSimulationProps {
  sim: Simulation;
}

function CardSimulation({ sim }: CardSimulationProps) {
  const [expanded, setExpanded] = React.useState(false);
  const difficultyColor: Record<Simulation["difficulty"], string> = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-sm border mb-4">
      {/* Header row: logo left, title/meta center, actions right */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-shrink-0">
          {sim.logo && (
            <Image
              src={sim.logo}
              alt="logo"
              width={120}
              height={40}
              className="rounded-md object-cover"
            />
          )}
        </div>

        {/* Middle: Title and meta */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {sim.companyName}: {sim.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                difficultyColor[sim.difficulty]
              }`}
            >
              {sim.difficulty}
            </span>

            <p className="text-sm text-gray-600">{sim.role}</p>
          </div>
          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {(sim.skills ?? []).map((skill) => (
              <span
                key={skill}
                className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-start gap-2">
          <span className="text-[11px] text-gray-500 self-center hidden sm:inline-block">
            Last active:{" "}
            {new Date(sim.lastActivity).toLocaleDateString("vi-VN")}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="h-8 w-8"
          >
            <ChevronDown
              className={`size-4 transition-transform ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </div>
        {sim.status === "not_started" && (
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              console.log("Start simulation:", sim.id);
            }}
          >
            Start
          </Button>
        )}
      </div>

      {/* Progress */}
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          Progress: {sim.progress}% – Score: {sim.score}
        </p>
        <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${sim.progress}%` }}
          ></div>
        </div>

        {/* Expandable lessons section */}
        <div
          className={`mt-3 overflow-hidden transition-all duration-300 ${
            expanded ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          }`}
        >
          <div className="rounded-lg border bg-white p-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Lessons</h4>
              <span className="text-[11px] text-gray-500 sm:hidden">
                {new Date(sim.lastActivity).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <ul className="space-y-1 mt-2">
              {(sim.lesson && sim.lesson.length > 0
                ? sim.lesson
                : ["No lessons"]
              ).map((lesson, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 flex items-center gap-2"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-300" />
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSimulation;
