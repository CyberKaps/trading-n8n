import {SUPPORTED_ASSETS} from "@/components/TriggerSheet"
import { Handle, Position } from "@xyflow/react"
export type TradingMetadata = {
    type: "LONG" | "SHORT",
    qty: number,
    symbol: typeof SUPPORTED_ASSETS,
}

export const Lighter = ({data}: {
    data: {
        metadata: TradingMetadata
    }
}) => {
    const isLong = data.metadata.type === "LONG";
    return <div className="px-5 py-4 bg-slate-800 border border-slate-600 rounded-lg shadow-lg min-w-[260px]">
        <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-slate-300 text-xs uppercase tracking-wide">Lighter</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${isLong ? 'bg-slate-700 text-emerald-400' : 'bg-slate-700 text-rose-400'}`}>
                {data.metadata.type}
            </span>
        </div>
        <div className="space-y-1 text-sm">
            <div className="text-slate-400">
                Qty: <span className="text-slate-200">{data.metadata.qty}</span>
            </div>
            <div className="text-slate-400">
                Symbol: <span className="text-slate-200">{data.metadata.symbol}</span>
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-300"></Handle>
        <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-300"></Handle>
    </div>
}