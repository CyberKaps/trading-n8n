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



const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Run this trigger every X minutes/seconds",
}, {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Run this trigger when a specific price is hit",
}]

export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
}) => {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <Sheet open={true}>
      <SheetContent className="bg-slate-900 border-l border-slate-700">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-white">✨ Select Trigger</SheetTitle>
          <SheetDescription className="text-slate-300 space-y-4">
            <p className="text-sm">Select the type of trigger you would like to add to your workflow.</p>
            <Select value={selectedTrigger} onValueChange={(Value) => setSelectedTrigger(Value)}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-colors">
                    <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectGroup>
                    {SUPPORTED_TRIGGERS.map(({id, title, description}) => <>
                        <SelectItem key={id} value={id} className="text-white hover:bg-slate-700 focus:bg-slate-700">{title}</SelectItem>
                        {/* <SelectLabel>{description}</SelectLabel> */}
                    </>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {selectedTrigger === "timer" && <div>
                Number of seconds after which to run the timer
                <Input value={metadata.time} onChange={(e) => setMetadata({
                    time: Number(e.target.value)
                })} />
                
            </div>}

            {selectedTrigger === "price-trigger" && <div className="space-y-4 mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-200 block">💰 Target Price</label>
                    <Input type="text" placeholder="e.g., 140" className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-1 focus:ring-green-500" onChange={(e) => setMetadata(metadata => ({
                        ...metadata,
                        price: Number(e.target.value)
                    }))} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-200 block">🪙 Asset</label>
                    <Select value={metadata.asset} onValueChange={(Value) => setMetadata(metadata => ({
                        ...metadata, 
                        asset: Value
                        }))}>
                        <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-white hover:bg-slate-700 transition-colors">
                            <SelectValue placeholder="Select an asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectGroup>
                            {SUPPORTED_ASSETS.map((id) => <>
                                <SelectItem key={id} value={id} className="text-white hover:bg-slate-700 focus:bg-slate-700">{id}</SelectItem>
                            </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>}


          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="mt-8">
          <Button onClick={() => {
            onSelect(
                selectedTrigger as NodeKind,
                metadata
            )
          }} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 text-base shadow-lg shadow-blue-900/50 transition-all">🚀 Create Trigger</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}