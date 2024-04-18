import { cn } from "@/lib/utils";

export type PageGenericProps<T = any> = {
    children : React.ReactNode;
    className? : string;
} & T
export function DashboardPage({
    className , children
}:PageGenericProps) {
  return (
    <section className={cn(['h-screen', className])}>
            {children}
    </section>
  )
}
export  function DashboardPageHeader({
    className , children
}:PageGenericProps) {
  return (
    <header className={cn(['px-6 py-3 border-b border-border flex items-center justify-between', className])}>
            {children}
    </header>
  )
}
export  function DashboardPageHeaderTitle({
    className , children
}:PageGenericProps) {
  return (
    <h1 className={cn(['text-muted-foreground uppercase', className])}>
            {children}
    </h1>
  )
}
export  function DashboardPageHeaderNav({
    className , children
}:PageGenericProps) {
  return (
    <nav className={cn(['', className])}>
            {children}
    </nav>
  )
}
export  function DashboardPageMain({
    className , children
}:PageGenericProps) {
  return (
    <main className={cn(['p-6', className])}>
    {children}
    </main>
  )
}


