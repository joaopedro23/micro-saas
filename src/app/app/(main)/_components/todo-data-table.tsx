"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Todo } from "../types"
import { useRouter } from "next/navigation"
import { deleteTodo, upSertTodo } from "./actions"
import { toast } from "@/components/ui/use-toast"


export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const { doneAt } = row.original
        const status: 'done' | 'waiting' = doneAt ? "done" : "waiting"
        const Variante: 'outline' | 'default' = doneAt ? "outline" : "default"
        return(    
        <Badge variant={Variante}>{status}</Badge>
        )
    }
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">createdAt</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">
        {row.original.createdAt.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(todo.id)}
            >
              Copy Todo ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Make as done</DropdownMenuItem>
            <DropdownMenuItem>DELETE</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
type TodoDataTable = {
  data:Todo[]
}
export function TodoDataTable({data}: TodoDataTable) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const handleDeleteTodo = async (todo:Todo) => {
      await deleteTodo({id:todo.id})
      router.refresh()

      toast({
        title: 'Success!',
        description: 'Your todo has been successfully deleted.',
      })
  } 

  const handleToggleDoneTodo = async (todo: Todo) => {
    const doneAt = todo.doneAt ? null : new Date().toISOString()

    await upSertTodo({ id: todo.id, doneAt })
    router.refresh()

    toast({ 
      title: 'Update Successful', 
      description: 'The todo item has been successfully updated.' })
  }

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
          const { doneAt } = row.original
          const status: 'done' | 'waiting' = doneAt ? "done" : "waiting"
          const Variante: 'outline' | 'default' = doneAt ? "outline" : "default"
          return(    
          <Badge variant={Variante}>{status}</Badge>
          )
      }
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">createdAt</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">
          {row.original.createdAt.toLocaleDateString()}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const todo = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(todo.id)}
              >
                Copy Todo ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() =>handleToggleDoneTodo(todo)}
              >Make as done
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() =>handleDeleteTodo(todo)}
              >DELETE
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className="w-full">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
