import { z } from "zod";

export const socialItemSchema = z.object({
    name: z.string(),
    link: z.string()
})

export const personalInfoSchema = z.object({
    about_me: z.string().optional(),
    birthday: z.string().refine((value) => {
        const birthDate = new Date(value);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age >= 13;
    }, "You must be at least 13 years old"),
    birthplace: z.string().optional(),
    lives_in: z.string().optional(),
    occupation: z.string().optional(),
    gender: z.string(),
    status: z.string().optional(), 
    socials: z.array(socialItemSchema).optional(),
})

export type personalInfoFormValues = z.infer<typeof personalInfoSchema>;

//   <div className="space-y-4">
//       <h3 className="text-lg font-semibold">Social Links</h3>

//       {fields.map((field, index) => (
//         <div key={field.id} className="flex gap-2">
//           <FormField
//             control={form.control}
//             name={`socials.item.${index}.name`}
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormControl>
//                   <Input placeholder="Platform" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name={`socials.item.${index}.link`}
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormControl>
//                   <Input placeholder="https://..." {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button
//             type="button"
//             variant="destructive"
//             onClick={() => remove(index)}
//           >
//             Remove
//           </Button>
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant="secondary"
//         onClick={() => append({ name: "", link: "" })}
//       >
//         Add Social
//       </Button>
//     </div>

