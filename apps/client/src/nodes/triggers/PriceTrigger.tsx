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
    return <div className="px-5 py-4 bg-slate-800 border border-slate-600 rounded-lg shadow-lg min-w-[260px]">
        <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-slate-300 text-xs uppercase tracking-wide">Price Trigger</span>
        </div>
        <div className="text-slate-100 text-sm">
            {data.metadata.asset ? `${data.metadata.asset}` : "Set asset"}
            {data.metadata.price ? ` @ $${data.metadata.price}` : " - Set target price"}
        </div>
        <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-300"></Handle>
    </div>
}