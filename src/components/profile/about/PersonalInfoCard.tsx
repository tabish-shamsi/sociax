"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDownIcon, NotebookPen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personal_info_schema } from "@/schema/personal-info-schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useRef } from "react";

interface PerosnalInfo {
  about_me?: string;
  birthday?: Date;
  birthplace?: string;
  occupation?: string;
  lives_in?: string;
  joined: Date;
  gender?: string;
  status?: string;
  website?: string;
}

import { personalInfo, user } from "@/lib/user";
import { useState } from "react";
import { statuses } from "@/lib/statuses";
import { genders } from "@/lib/genders";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function PersonalInfoCard() {
  const [personalInformation, setProfileInfo] =
    useState<PerosnalInfo>(personalInfo);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [socials, setSocials] = useState(user.socials);
  const [open, setOpen] = useState(false)  

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const socialsObj = socials.reduce((acc: Record<string, string>, curr) => {
    acc[curr.name] = curr.link;
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(personal_info_schema),
    defaultValues: {
      ...personalInformation,
      ...socialsObj,
    },
  });

  const onSubmit = (data: z.infer<typeof personal_info_schema>) => {
    const { Facebook, Twitter, Instagram, ...rest } = data;

    setSocials([
      { name: "Facebook", link: Facebook ?? "" },
      { name: "Instagram", link: Instagram ?? "" },
      { name: "Twitter", link: Twitter ?? "" },
    ]);
    setProfileInfo({ ...rest, joined: personalInformation.joined });

    setOpen(false)
  };

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-6 gap-0 -mb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Personal Info</CardTitle>

          <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
              <CardAction>
                <Button variant="secondary" size="icon-sm">
                  <NotebookPen className="text-muted-foreground" />
                </Button>
              </CardAction>
            </SheetTrigger>

            <SheetContent side="left">
              <ScrollArea className="h-full">
                <SheetHeader>
                  <SheetTitle>Edit Personal Info</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 px-6"
                  >
                    <FormField
                      control={form.control}
                      name="about_me"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About Me</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birthplace</FormLabel>
                          <FormControl>
                            <Popover
                              open={openCalendar}
                              onOpenChange={setOpenCalendar}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id="date"
                                  className="w-full justify-between font-normal"
                                >
                                  {field
                                    ? field.value?.toLocaleDateString()
                                    : "Select date"}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    setOpenCalendar(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="birthplace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birthplace</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lives_in"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                {genders.map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                {statuses.map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <h4 className="text-sm font-medium text-card-foreground">
                      Social Networks
                    </h4>

                    <FormField
                      control={form.control}
                      name="Facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <FaFacebookF /> Facebook Profile URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <FaInstagram /> Instagram Profile URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="Twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <FaXTwitter /> Twitter Profile URL
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button type="submit" ref={submitBtnRef} />
                  </form>
                </Form>
                <SheetFooter>
                  <Button
                    onClick={() => submitBtnRef.current?.click()}
                    type="submit"
                  >
                    Save changes
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="p-6 flex flex-col gap-6">
        {Object.entries(personalInformation).map(([key, value]) => (
          <div key={key} className="flex gap-2 ">
            <h3 className="font-medium text-card-foreground w-1/3 capitalize">
              {key.split("_").join(" ")}:
            </h3>
            <p className="text-sm text-muted-foreground w-[66.666%] text-justify">
              {key === "birthday" || key === "joined"
                ? format(new Date(value), "dd MMM yyyy")
                : String(value)}
            </p>
          </div>
        ))}

        <div className="">
          <h3 className="text-sm font-medium text-card-foreground  capitalize">
            Social Networks:
          </h3>
          <div className="flex flex-col mt-4 gap-4">
            {socials.map(({ name, link }) => (
              <a key={"Social" + name} href={link} target="_blank">
                <Button
                  variant="outline"
                  className="w-full border-primary hover:bg-primary bg-transparent text-primary dark:text-primary dark:bg-transparent hover:text-white dark:border-primary dark:hover:bg-primary  dark:hover:text-white "
                >
                  {name === "Facebook" && <FaFacebookF />}
                  {name === "Instagram" && <FaInstagram />}
                  {name === "Twitter" && <FaXTwitter />}
                  {name}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
