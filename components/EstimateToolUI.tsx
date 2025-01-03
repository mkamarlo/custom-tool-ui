"use client";

import React from "react";
import { makeAssistantToolUI } from "@assistant-ui/react";

// Define types for the tool arguments and result
type EstimateArgs = {
    vessel_name: string;
};

type EstimateResult = {
    vessel_name: string;
    status: string;
    date: string;
};

// Create the Tool UI component
export const EstimateToolUI = makeAssistantToolUI<EstimateArgs, EstimateResult>({
    toolName: "create_estimate",
    render: ({ args, status, result }) => {
        return (
            <div className="bg-white rounded-lg shadow p-4 my-2">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm text-gray-600">Vessel</div>
                        <div className="font-medium">{args?.vessel_name}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">Status</div>
                        <div className="font-medium">New Estimate</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">Date</div>
                        <div className="font-medium">{new Date().toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        );
    },
});