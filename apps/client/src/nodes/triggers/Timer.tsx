import { Handle, Position } from "@xyflow/react"
import { type TimerNodeMetadata } from "common/types"


export const Timer = ({data}: {
    data: {
        metadata: TimerNodeMetadata
    },
    isConnectable: boolean
}) => {
    return <div className="px-5 py-4 bg-slate-800 border border-slate-600 rounded-lg shadow-lg min-w-[260px]">
        <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-slate-300 text-xs uppercase tracking-wide">Timer Trigger</span>
        </div>
        <div className="text-slate-100 text-sm">
            {data.metadata.time ? `Every ${data.metadata.time} seconds` : "Set timer interval"}
        </div>
        <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-300">

        </Handle>
    </div>
}