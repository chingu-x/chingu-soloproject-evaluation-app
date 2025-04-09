'use client'

import { CheckIn } from "@/types/CheckinTypes";
import {
    ColumnFiltersState,
    getCoreRowModel, getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel
} from "@tanstack/table-core";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Filter from "@/components/react-table/Filter";
import { columnDef } from "@/components/checkins/columnDef";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CheckInDialogContent from "@/components/checkins/CheckInDialogContent";
import { progressColor } from "@/styles/checkin/progress";

const CheckinTable = ({ records }: { records: CheckIn[] }) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable<CheckIn>({
        data: records,
        columns: columnDef,
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel<CheckIn>(),
        getPaginationRowModel: getPaginationRowModel<CheckIn>(),
        getFilteredRowModel: getFilteredRowModel<CheckIn>(),
        getFacetedUniqueValues: getFacetedUniqueValues<CheckIn>(),
    })


    return (
        <div className="mt-6 rounded-lg overflow-hidden w-[90%] mx-auto">
            <Table className="border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    <div>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </div>
                                    {header.column.getCanFilter() ? (
                                        <div className="grid place-content-center">
                                            <Filter column={header.column} key={`${header.id}-filter`}/>
                                        </div>
                                    ) : null}
                                </TableHead>
                            ))}
                        </TableRow>
                    )}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <Dialog key={`${row.id}-dialog`}>
                            <TableRow key={row.id}
                                      className={`${progressColor[row.original.fields["Progress Rating"]]?.border}`}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell
                                        key={cell.id}>
                                        <DialogTrigger key={`${cell.id}-dialog-trigger`} asChild>
                                            <button className="w-full text-left">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </button>
                                        </DialogTrigger>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <CheckInDialogContent record={row}/>
                        </Dialog>

                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <div className="flex basis-1/3 items-center">
                    <p className="whitespace-nowrap font-bold">
                        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                        &nbsp;&nbsp;
                        {`[${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? "total records" : "record"}]`}
                    </p>
                </div>
                <div className="space-x-1">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
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

export default CheckinTable