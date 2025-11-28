import { Handle, Position } from "@xyflow/react"

export type TimerNodeMetadata = {
    time: number;
}

export const Timer = ({data}: {
    data: {
        metadata: TimerNodeMetadata
    },
    isConnectable: boolean
}) => {
    return <div className="px-6 py-4 bg-gradient-to-br from-blue-900 to-blue-950 border-2 border-blue-600 rounded-xl shadow-xl shadow-blue-900/50 min-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⏱️</span>
            <span className="font-bold text-blue-400 text-sm uppercase tracking-wide">Timer Trigger</span>
        </div>
        <div className="text-white font-semibold text-base">
            {data.metadata.time ? `Every ${data.metadata.time} seconds` : "Set timer interval"}
        </div>
        <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-blue-500 !border-2 !border-blue-300">

        </Handle>
    </div>
}