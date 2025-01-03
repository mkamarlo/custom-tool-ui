// EstimateTool.tsx
"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { EstimateCard } from "./EstimateCard";

type EstimateToolArgs = {
    vessel_name: string;
};

type EstimateToolResult = {
    vessel_name: string;
    status: string;
    date: string;
};

export const EstimateTool = makeAssistantToolUI<EstimateToolArgs, string>({
    toolName: "create_estimate",
    render: function EstimateUI({ part: { args, result } }) {
        let resultObj: EstimateToolResult;
        try {
            resultObj = result ? JSON.parse(result) : {
                vessel_name: args.vessel_name,
                status: "New Estimate",
                date: new Date().toLocaleDateString()
            };
        } catch (e) {
            return <div className="text-red-500">Error parsing estimate data</div>;
        }

        return <EstimateCard {...resultObj} />;
    },
});