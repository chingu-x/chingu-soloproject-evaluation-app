import { createColumnHelper } from "@tanstack/table-core";
import { CheckIn } from "@/types/CheckinTypes";

const columnHelper = createColumnHelper<CheckIn>()

export const columnDef = [
    columnHelper.accessor((row) => row.fields["Discord Name"], {
        id: "Discord Name",
        header: "Discord Name",
    }),
    columnHelper.accessor((row) => row.fields["Sprint No."], {
        id: "Sprint No.",
        header: "Sprint No.",
    }),
    columnHelper.accessor((row) => row.fields["Voyage"], {
        id: "Voyage",
        header: "Voyage",
    }),
    columnHelper.accessor((row) => row.fields["Team Name"], {
        id: "Team Name",
        header: "Team Name",
    }),
    columnHelper.accessor((row) => row.fields["Team No."], {
        id: "Team No.",
        header: "Team No.",
        filterFn: "equalsString"
    }),
    ]
