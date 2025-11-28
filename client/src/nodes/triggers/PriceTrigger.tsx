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
    return <div className="px-6 py-4 bg-gradient-to-br from-green-900 to-green-950 border-2 border-green-600 rounded-xl shadow-xl shadow-green-900/50 min-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <span className="font-bold text-green-400 text-sm uppercase tracking-wide">Price Trigger</span>
        </div>
        <div className="text-white font-semibold text-base">
            {data.metadata.asset ? `${data.metadata.asset}` : "Set asset"}
            {data.metadata.price ? ` @ $${data.metadata.price}` : " - Set target price"}
        </div>
        <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-green-500 !border-2 !border-green-300"></Handle>
    </div>
}