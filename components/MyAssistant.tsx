"use client";

import React from "react";
import {
    Thread,
    AssistantRuntimeProvider,
    ChatModelAdapter,
    ChatModelRunOptions,
    ChatModelRunResult,
} from "@assistant-ui/react";
import { useLocalRuntime } from "@assistant-ui/react";

export const MyAssistant = () => {
    const modelAdapter: ChatModelAdapter = {
        async run(options: ChatModelRunOptions): Promise<ChatModelRunResult> {
            try {
                const messages = options.messages;
                const lastMessage = messages[messages.length - 1];
                const lastContent = lastMessage?.content[0];
                const messageText = lastContent && 'text' in lastContent ? lastContent.text : '';

                const response = await fetch(
                    "https://marlotech.app.n8n.cloud/webhook/5306dddc-f9d5-4e15-9b54-00dbc7da2a2d",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            message: messageText,
                            context: {
                                company_id: "dd4e7d97-f987-429c-9739-1b2e9f9c5dbb",
                                contact_id: "77da7e5f-f707-4a4a-989d-f472b49639e7"
                            }
                        }),
                    }
                );

                const data = await response.json();
                console.log("API Response:", data);

                return {
                    content: [
                        {
                            type: "text" as const,
                            text: `Created estimate for vessel: ${data[0].output.vessel_name}`
                        },
                        {
                            type: "text" as const,
                            text: `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
📋 Vessel Details

Vessel: ${data[0].output.vessel_name}
Estimate: [${new Date().toLocaleDateString()}](https://appdemo.marlo.co/estimates/estimate-details/${data[0].output.estimate_id})

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`
                        }
                    ]
                };
            } catch (error) {
                console.error("Error:", error);
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: "An error occurred.",
                        }
                    ]
                };
            }
        }
    };

    const runtime = useLocalRuntime(modelAdapter);

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <div className="flex h-screen w-full">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-auto">
                        <Thread />
                    </div>
                </div>
            </div>
        </AssistantRuntimeProvider>
    );
};