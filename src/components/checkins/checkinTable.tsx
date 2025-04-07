'use client'

import { CheckIn, CheckInFields } from "@/types/CheckinTypes";
import {
    ColumnFiltersState,
    createColumnHelper,
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

const CheckinTable = ({ records }: { records: CheckIn[] }) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    /*
    const columnHeaders: Array<keyof CheckInFields> = ["Discord Name", "Sprint No.", "Voyage", "Team Name", "Team No."]
    const columnHelper = createColumnHelper<CheckIn>()

    const columns = columnHeaders.map((columnName) => {
        return columnHelper.accessor((row) => row.fields[columnName], {
            id: columnName,
            header: columnName,
        })
    })

     */

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
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
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
                                            <Filter column={header.column}/>
                                        </div>
                                    ): null }
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell
                                    key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
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