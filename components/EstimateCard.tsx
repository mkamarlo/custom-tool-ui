// EstimateCard.tsx
"use client";

import React from 'react';

type EstimateCardProps = {
    vessel_name: string;
    status: string;
    date: string;
};

export const EstimateCard = ({ vessel_name, status, date }: EstimateCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 my-2">
            <h3 className="text-lg font-semibold">Vessel Details</h3>
            <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                    <div className="text-sm text-gray-600">Vessel Name</div>
                    <div className="font-medium">{vessel_name}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="font-medium">{status}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium">{date}</div>
                </div>
            </div>
        </div>
    );
};