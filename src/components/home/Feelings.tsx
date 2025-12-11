"use client";

import { SmilePlus } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { feelings } from "@/lib/feelings";
import { useState } from "react";

interface FeelingsProps {
  setFeeling: Function;
}

export default function Feelings({ setFeeling }: FeelingsProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    setFeeling(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger className="text-yellow-500 h-12 w-12 rounded-xl transition-colors hover:bg-secondary flex items-center justify-center cursor-pointer">
            <SmilePlus />
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Feelings</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search industries..." />
          <CommandList>
            <CommandGroup>
              {feelings.map(({ title, icon: Icon }) => (
                <CommandItem
                  key={title}
                  value={title}
                  onSelect={(value) => handleSelect(value)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="text-muted-foreground size-4" />
                    {title}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
