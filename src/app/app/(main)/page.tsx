import {
  DashboardPage, 
  DashboardPageHeader, 
  DashboardPageHeaderNav, 
  DashboardPageHeaderTitle, 
  DashboardPageMain 
} from "@/components/dashboard/page";
import { TodoDataTable } from "./_components/todo-data-table";

import { TodoUppsertSheet } from "./_components/todo-upsert-sheet";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { getUserTodo } from "./_components/actions";

export default async function Page () {
  const todos = await getUserTodo()
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>

          <DashboardPageHeaderNav>
          <DashboardPageHeaderNav>
            <TodoUppsertSheet>
                <Button variant={'outline'} size={'sm'}>
                  <PlusIcon className="w-4 h-4 mr-3"/>
                    Add Todo
                </Button>
            </TodoUppsertSheet>
        </DashboardPageHeaderNav>
          </DashboardPageHeaderNav>

        </DashboardPageHeader>
        <DashboardPageMain>
          <TodoDataTable data={todos} />
          </DashboardPageMain>
      </DashboardPage>
    )
}