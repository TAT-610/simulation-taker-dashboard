import React from "react";

function CardSimulation() {
  return (
    <div>
      {" "}
      <div className="p-4 bg-gray-100 rounded-xl shadow-sm mb-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold"></h3>
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full"></span>
            <p className="text-sm text-gray-500"></p>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>Last:</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-2">
          <p className="text-sm text-gray-600">Progress: steps</p>
          <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
            <div className="h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}

export default CardSimulation;
