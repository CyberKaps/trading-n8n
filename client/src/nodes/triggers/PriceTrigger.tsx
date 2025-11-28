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
        {data.metadata.asset ? `Every ${data.metadata.asset}` : "Set timer interval"}
        {data.metadata.price ? ` at price ${data.metadata.price}` : "Set target price"}
        <Handle type="source" position={Position.Right}>

        </Handle>
    </div>
}