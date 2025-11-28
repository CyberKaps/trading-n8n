import type { NodeKind, NodeMetadata } from "./CreateWorkflow";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";
import { Value } from "@radix-ui/react-select";
import { validators } from "tailwind-merge";



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