
import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "./Lighter"

export const Hyperliquid = ({data}: {
    data: {
        metadata: TradingMetadata
    }
}) => {
    const isLong = data.metadata.type === "LONG";
    return <div className="px-6 py-4 bg-gradient-to-br from-cyan-900 to-cyan-950 border-2 border-cyan-600 rounded-xl shadow-xl shadow-cyan-900/50 min-w-[280px]">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💧</span>
            <span className="font-bold text-cyan-400 text-sm uppercase tracking-wide">Hyperliquid Exchange</span>
        </div>
        <div className="space-y-1.5">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${isLong ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {data.metadata.type}
            </div>
            <div className="text-white font-semibold">
                Qty: <span className="text-cyan-300">{data.metadata.qty}</span>
            </div>
            <div className="text-white font-semibold">
                Symbol: <span className="text-cyan-300">{data.metadata.symbol}</span>
            </div>
        </div>
        <Handle type="source" position={Position.Right} className="!w-4 !h-4 !bg-cyan-500 !border-2 !border-cyan-300"></Handle>
        <Handle type="target" position={Position.Left} className="!w-4 !h-4 !bg-cyan-500 !border-2 !border-cyan-300"></Handle>
    </div>
}