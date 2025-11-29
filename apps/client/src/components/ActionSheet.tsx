import type { NodeKind, NodeMetadata } from "./CreateWorkflow";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react";
import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import { Input } from "./ui/input";
import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { SUPPORTED_ASSETS } from "./TriggerSheet";



const SUPPORTED_ACTIONS = [{
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on Hyperliquid",
}, {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on Lighter",
}, {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on Backpack",
}]


export const ActionSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
}) => {
    const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
    const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
    return <Sheet open={true}>
      <SheetContent className="bg-slate-900 border-l border-slate-700">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-slate-100">Select Action</SheetTitle>
          <SheetDescription className="text-slate-400 space-y-4">
            <p className="text-sm">Select the type of action you would like to add to your workflow.</p>
            <Select value={selectedAction} onValueChange={(Value) => setSelectedAction(Value)}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-750 transition-colors">
                    <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectGroup>
                    {SUPPORTED_ACTIONS.map(({id, title}) => <>
                        <SelectItem key={id} value={id} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">{title}</SelectItem>
                    </>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {(selectedAction === "backpack" || selectedAction === "lighter" || selectedAction === "hyperliquid") && <div className="space-y-3 mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
               <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300 block">Trade Type</label>
                    <Select value={metadata?.type} onValueChange={(Value) => setMetadata(metadata => ({
                            ...metadata, 
                            type: Value
                            }))}>
                            <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-750 transition-colors">
                                <SelectValue placeholder="Select trade type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectGroup>
                                    <SelectItem value={"LONG"} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">LONG</SelectItem>
                                    <SelectItem value={"SHORT"} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">SHORT</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                </div>
                
                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300 block">Symbol</label>
                    <Select value={metadata?.symbol} onValueChange={(Value) => setMetadata(metadata => ({
                            ...metadata, 
                            symbol: Value
                            }))}>
                            <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-750 transition-colors">
                                <SelectValue placeholder="Select a symbol" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectGroup>
                                    {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">
                                        {asset}
                                        </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-300 block">Quantity</label>
                    <Input value={metadata.qty} placeholder="e.g., 100" className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-1 focus:ring-slate-500" onChange={(e) => setMetadata({
                        ...metadata,
                        qty: Number(e.target.value)
                    })} />
                </div>
            </div>}

          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="mt-6">
          <Button onClick={() => {
            onSelect(
                selectedAction as NodeKind,
                metadata as NodeMetadata
            )
          }} type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-5 transition-colors">Create Action</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}