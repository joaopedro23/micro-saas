'use server'

import { z } from "zod"
import { updateProfileSchema } from "./schema"
import { auth } from "@/app/services/auth"
import { prisma } from "@/app/services/database"

export async function updateProfile(input: z.infer<typeof updateProfileSchema>) {
    const session = await auth()

    if(!session?.user?.id){
        return{
            error:'not authorizade',
            data:null
        }
    }
    await prisma.user.update({
        where: {
            id: session?.user?.id
        },
        data: {
            name: input.name,
            
        }
    })
}