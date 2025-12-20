import { Form as ShadcnForm } from "@/components/ui/form";

export default function Form({children, form, handleSubmit}: {children: React.ReactNode, form: any, handleSubmit: (data: any) => void}) {
  return (
    <ShadcnForm {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            {children}
        </form>
    </ShadcnForm>
  )
}