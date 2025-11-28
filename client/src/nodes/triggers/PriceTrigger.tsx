import { Handle, Position } from "@xyflow/react"

// asset => SOL
// price => 140
export type PriceTriggerMetadata = {
    asset: string,
    price: number,

}

export const PriceTrigger = ({data, isConnectable}: {
    data: {
        metadata: PriceTriggerMetadata
    },
    isConnectable: boolean
}) => {
    return <div className="p-4 border">
        <div>{data.metadata.asset }</div>
        <div>{data.metadata.price}</div>
        <Handle type="source" position={Position.Right}>

        </Handle>
    </div>
}