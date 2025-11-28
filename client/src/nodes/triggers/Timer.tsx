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
    return <div className="p-4 border">
        {data.metadata.time ? `Every ${data.metadata.time / 3600} seconds` : "Set timer interval"}
        <Handle type="source" position={Position.Right}>

        </Handle>
    </div>
}