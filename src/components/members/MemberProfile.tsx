'use client';

import { appColDef } from '@/components/members/appColDef';
import MemberDetails from '@/components/members/MemberDetails';
import { paymentColDef } from '@/components/members/paymentColDef';
import { spColDef } from '@/components/members/spColDef';
import { ColumnToggle } from '@/components/members/TableColumnToggle';
import { vsColDef } from '@/components/members/vsColDef';
import StandardReactTable from '@/components/react-table/StandardReactTable';
import PaginationButtons from '@/components/ui/buttons/PaginationButtons';
import H1 from '@/components/ui/typography/h1';
import { Context } from '@/types';
import { Application } from '@/types/ApplicationTypes';
import { FinanceRevenue } from '@/types/FinanceRevenueType';
import type { MemberDetailsType } from '@/types/MemberTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import {
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
import { useState } from 'react';

const MemberProfile = ({
  memberDetails,
  atBaseUrls,
}: {
  memberDetails: MemberDetailsType;
  atBaseUrls: Partial<Record<Context, string>>;
}) => {
  const [appColVis, setAppColVis] = useState({});
  const [vsColVis, setVsColVis] = useState<{}>({
    Email: false,
    'Discord Name': false,
    'GitHub ID': false,
  });
  const [spColVis, setSpColVis] = useState<{}>({
    Email: false,
    'Discord Name': false,
    'GitHub ID': false,
  });
  const [vsSorting, setVsSorting] = useState<SortingState>([
    { id: 'Timestamp', desc: true },
  ]);
  const [spSorting, setSpSorting] = useState<SortingState>([
    { id: 'Timestamp', desc: true },
  ]);
  const [paymentSorting, setPaymentSorting] =
    useState<SortingState>([{ id: 'date', desc: true }]);
  const [paymentPagination, setPaymentPagination] =
    useState({
      pageIndex: 0,
      pageSize: 5,
    });

  const appTable = useReactTable<Application>({
    data: memberDetails.applications,
    columns: appColDef(atBaseUrls['application'] ?? '#'),
    getCoreRowModel: getCoreRowModel<Application>(),
    state: {
      columnVisibility: appColVis,
    },
    onColumnVisibilityChange: setAppColVis,
    onSortingChange: setVsSorting,
  });
  const vsTable = useReactTable<VoyageSignup>({
    data: memberDetails.voyageSignups,
    columns: vsColDef(atBaseUrls['voyage-signup'] ?? '#'),
    getCoreRowModel: getCoreRowModel<VoyageSignup>(),
    getSortedRowModel: getSortedRowModel<VoyageSignup>(),
    state: {
      columnVisibility: vsColVis,
      sorting: vsSorting,
    },
    onColumnVisibilityChange: setVsColVis,
  });
  const spTable = useReactTable<SoloProjectSubmission>({
    data: memberDetails.soloProjects,
    columns: spColDef(atBaseUrls['solo-project'] ?? '#'),
    getCoreRowModel:
      getCoreRowModel<SoloProjectSubmission>(),
    getSortedRowModel:
      getSortedRowModel<SoloProjectSubmission>(),
    state: {
      columnVisibility: spColVis,
      sorting: spSorting,
    },
    onColumnVisibilityChange: setSpColVis,
  });

  const revenueTable = useReactTable<FinanceRevenue>({
    data: memberDetails.payments,
    columns: paymentColDef,
    getCoreRowModel: getCoreRowModel<FinanceRevenue>(),
    getSortedRowModel: getSortedRowModel<FinanceRevenue>(),
    getPaginationRowModel:
      getPaginationRowModel<FinanceRevenue>(),
    onPaginationChange: setPaymentPagination,
    state: {
      sorting: paymentSorting,
      pagination: paymentPagination,
    },
  });

  return (
    <div>
      <MemberDetails memberDetails={memberDetails} />
      <H1>Voyage Signups</H1>
      <ColumnToggle
        columns={[
          vsTable.getColumn('Email')!,
          vsTable.getColumn('Discord Name')!,
          vsTable.getColumn('GitHub ID')!,
        ]}
      />
      <StandardReactTable table={vsTable} />
      <H1>Solo Projects</H1>
      <ColumnToggle
        columns={[
          spTable.getColumn('Email')!,
          spTable.getColumn('Discord Name')!,
          spTable.getColumn('GitHub ID')!,
        ]}
      />
      <StandardReactTable table={spTable} />
      <H1>Applications</H1>
      <StandardReactTable table={appTable} />
      <H1>Products, Subscriptions and Donations</H1>
      <StandardReactTable table={revenueTable} />
      <PaginationButtons table={revenueTable} />
    </div>
  );
};

export default MemberProfile;
