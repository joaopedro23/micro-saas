import { ReturnTypeWithoutPromise } from "@/app/types/return-type-without-promise";
import { getUserTodo } from "./_components/actions";

export type Todo = ReturnTypeWithoutPromise<typeof getUserTodo>[0]