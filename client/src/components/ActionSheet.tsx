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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Select the type of Action you would like to add to your workflow.
            <Select value={selectedAction} onValueChange={(Value) => setSelectedAction(Value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {SUPPORTED_ACTIONS.map(({id, title}) => <>
                        <SelectItem key={id} value={id}>{title}</SelectItem>
                    </>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {(selectedAction === "backpack" || selectedAction === "lighter" || selectedAction === "hyperliquid") && <div>
               <div className="pt-4">
                   Type 
               </div>
                <Select value={metadata?.type} onValueChange={(Value) => setMetadata(metadata => ({
                        ...metadata, 
                        type: Value
                        }))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an asset" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={"long"}>LONG</SelectItem>
                                <SelectItem value={"short"}>SHORT</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                </Select>
                
                <div className="pt-4">
                   Symbol 
               </div>
               <Select value={metadata?.symbol} onValueChange={(Value) => setMetadata(metadata => ({
                        ...metadata, 
                        symbol: Value
                        }))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a symbol" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset}>
                                    {asset}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                </Select>

                <div className="pt-4">
                   Qty 
               </div>
                <Input value={metadata.qty} onChange={(e) => setMetadata({
                    ...metadata,
                    qty: Number(e.target.value)
                })} />
                
            </div>}

          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button onClick={() => {
            onSelect(
                selectedAction as NodeKind,
                metadata as NodeMetadata
            )
          }} type="submit">Create Action</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}