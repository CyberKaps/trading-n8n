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
    const [metadata, setMetadata] = useState({});
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you would like to add to your workflow.
            <Select value={selectedTrigger} onValueChange={(Value) => setSelectedTrigger(Value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {SUPPORTED_TRIGGERS.map(({id, title, description}) => <>
                        <SelectItem key={id} value={id}>{title}</SelectItem>
                        {/* <SelectLabel>{description}</SelectLabel> */}
                    </>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button onClick={() => {
            onSelect(
                selectedTrigger as NodeKind,
                metadata
            )
          }} type="submit">Create Trigger</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}