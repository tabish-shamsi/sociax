"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Plus, Check, ChevronsUpDown } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------------------------- Types ---------------------------- */
type Friend = {
  _id: string;
  name: string;
};

type Group = {
  _id: string;
  title: string;
  friends: Friend[];
  avatar: string;
};

type Props = {
  friends: Friend[];
  onCreate: (group: Group) => void;
};

/* ---------------------------- Schema ---------------------------- */
const createGroupSchema = z.object({
  title: z
    .string()
    .min(3, "Group name must be at least 3 characters")
    .max(100, "Group name must be less than 100 characters"),
  friends: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .min(1, "Select at least one friend"),
});

type CreateGroupValues = z.infer<typeof createGroupSchema>;

/* ---------------------------- Component ---------------------------- */
export default function AddGroupDialog({ friends, onCreate }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateGroupValues>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      title: "",
      friends: [],
    },
  });

  function onSubmit(values: CreateGroupValues) {
    onCreate({
      _id: crypto.randomUUID(),
      title: values.title,
      avatar: "https://picsum.photos/seed/newgroup/200",
      friends: values.friends,
    });

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Card */}
      <DialogTrigger asChild>
        <div className="cursor-pointer w-full h-64 rounded-md border-2 border-dashed border-ring flex flex-col items-center justify-center">
          <span className="h-12 w-12 flex items-center justify-center bg-blue-400 text-white rounded-full">
            <Plus />
          </span>
          <h3 className="text-lg font-medium mt-4">Create a Group</h3>
          <p className="text-sm text-muted-foreground">
            It only takes a few minutes
          </p>
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="max-w-lg">
        <DialogHeader>Create Friend Group</DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Group Name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Close Friends"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Friends Combobox */}
            <FormField
              control={form.control}
              name="friends"
              render={({ field }) => {
                const selectedNames =
                  field.value.length > 0
                    ? field.value.map((f) => f.name).join(", ")
                    : "Select friends";

                function toggleFriend(friend: Friend) {
                  const exists = field.value.some(
                    (f) => f._id === friend._id
                  );

                  field.onChange(
                    exists
                      ? field.value.filter(
                          (f) => f._id !== friend._id
                        )
                      : [...field.value, friend]
                  );
                }

                return (
                  <FormItem>
                    <FormLabel>Friends</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              field.value.length === 0 &&
                                "text-muted-foreground"
                            )}
                          >
                            <span className="truncate">
                              {selectedNames}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search friends..." />
                          <CommandEmpty>
                            No friend found.
                          </CommandEmpty>

                          <CommandGroup>
                            {friends.map((friend) => {
                              const isSelected = field.value.some(
                                (f) => f._id === friend._id
                              );

                              return (
                                <CommandItem
                                  key={friend._id}
                                  onSelect={() =>
                                    toggleFriend(friend)
                                  }
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      isSelected
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {friend.name}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Group</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
