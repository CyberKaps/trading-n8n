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
import { SUPPORTED_ASSETS, type PriceTriggerMetadata, type TimerNodeMetadata } from "common/types";
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
          <SheetTitle className="text-xl font-semibold text-slate-100">Select Trigger</SheetTitle>
          <SheetDescription className="text-slate-400 space-y-4">
            <p className="text-sm">Select the type of trigger you would like to add to your workflow.</p>
            <Select value={selectedTrigger} onValueChange={(Value) => setSelectedTrigger(Value)}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-750 transition-colors">
                    <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectGroup>
                    {SUPPORTED_TRIGGERS.map(({id, title, description}) => <>
                        <SelectItem key={id} value={id} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">{title}</SelectItem>
                        {/* <SelectLabel>{description}</SelectLabel> */}
                    </>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {selectedTrigger === "timer" && <div className="space-y-2 mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
                <label className="text-sm font-medium text-slate-300 block">Time Interval (seconds)</label>
                <Input value={metadata.time} placeholder="e.g., 3600" className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-1 focus:ring-slate-500" onChange={(e) => setMetadata({
                    time: Number(e.target.value)
                })} />
                
            </div>}

            {selectedTrigger === "price-trigger" && <div className="space-y-3 mt-4 p-3 bg-slate-800/50 rounded border border-slate-700">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 block">Target Price</label>
                    <Input type="text" placeholder="e.g., 140" className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:ring-1 focus:ring-slate-500" onChange={(e) => setMetadata(metadata => ({
                        ...metadata,
                        price: Number(e.target.value)
                    }))} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 block">Asset</label>
                    <Select value={metadata.asset} onValueChange={(Value) => setMetadata(metadata => ({
                        ...metadata, 
                        asset: Value
                        }))}>
                        <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-slate-100 hover:bg-slate-750 transition-colors">
                            <SelectValue placeholder="Select an asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectGroup>
                            {SUPPORTED_ASSETS.map((id) => <>
                                <SelectItem key={id} value={id} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">{id}</SelectItem>
                            </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>}


          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="mt-6">
          <Button onClick={() => {
            onSelect(
                selectedTrigger as NodeKind,
                metadata
            )
          }} type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-5 transition-colors">Create Trigger</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}