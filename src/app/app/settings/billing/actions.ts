'use server'

import { auth } from "@/app/services/auth"
import { createCheckoutSession } from "@/app/services/stripe"
import { redirect } from "next/navigation"


export async function createdSubscribeSession() {
    const session = await auth()

    if(!session?.user?.id){
        return{
            error:'not authorizade',
            data:null
        }
    }
    const chekoutSession = await createCheckoutSession(
        session.user.id as string,
        session.user.email as string,
        session.user.stripeSubscriptionId as string
    )
        
        if (!chekoutSession.url) 
        return
        redirect(chekoutSession.url)
}