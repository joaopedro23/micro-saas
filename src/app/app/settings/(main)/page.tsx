import { auth } from "@/app/services/auth";
import ProfileForm from "./_components/form";

export default async function settingsPage() {
  const session = await auth()
  return (
    <ProfileForm defaultValues={session?.user}/>
  )
}
