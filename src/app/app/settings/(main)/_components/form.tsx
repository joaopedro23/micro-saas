'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { updateProfile } from "../actions"
import { updateProfileSchema } from "../schema"
import { z } from "zod"
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl,
    FormDescription, 
    FormMessage 
    } from "@/components/ui/form"
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Session } from "next-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type ProfileFormProps = {
    defaultValues:Session['user']
}

export default function ProfileForm({ defaultValues }:ProfileFormProps) {
    const router =  useRouter()
    const form = useForm <z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues:{
        name:defaultValues?.name ?? '',
        email:defaultValues?.email ?? '' ,
    }
    })

    const onSubmit = form.handleSubmit(async (data) => {
        await updateProfile(data)
        router.refresh()
        toast({
        title:"Success",
        description:"Your profile has been updated successfully."
    })
})
return (
    <Form {...form}>
    <form onSubmit={onSubmit} className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
            <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
            <Input placeholder="Enter your todo title"  {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
    />
            </CardContent>
                <CardFooter>
                        <FormDescription>
                    This is will be the publicly displayed name
                    </FormDescription>
                </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
            <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
            <Input placeholder="Enter your todo title" readOnly {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
        )}
    />
            </CardContent>
                <CardFooter>
                        <FormDescription>
                        Please contact us at contact@micro-saas.com to change the
            email. We do not currently support changing emails through this form.
                    </FormDescription>
                </CardFooter>
        </Card>
        <SheetFooter className="mt-auto">
            <Button disabled={form.formState.isLoading} type="submit">
                {form.formState.isSubmitting && 'Saving'}
                {!form.formState.isSubmitting && 'Save Changes'}
            </Button>
        </SheetFooter>
    </form>
</Form>
)
}
