import { Column } from "@tanstack/table-core";
import { DebouncedInput } from "@/components/react-table/DebouncedInput";

export default function Filter<T>({column}: {column: Column<T, unknown>}) {
    const columnFilterValue = column.getFilterValue()
    console.log(columnFilterValue)

    return (
        <DebouncedInput
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search...(${[...column.getFacetedUniqueValues()].filter(arr=>
                arr[0]).length})`}
            className="w-full border shadow rounded bg-card"
            />
    )
}