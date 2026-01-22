'use client';

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';

/**
 * Example: @tanstack/react-table
 *
 * React Table is a headless table library with:
 * - Sorting
 * - Filtering
 * - Pagination
 * - Row selection
 * - Fully typed TypeScript APIs
 */

// Example data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

// Example data
const mockUsers: User[] = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'John Smith', email: 'john@example.com', role: 'Editor', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Alex Lee', email: 'alex@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Taylor Kim', email: 'taylor@example.com', role: 'Editor', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Sam Patel', email: 'sam@example.com', role: 'Admin', status: 'active', joinDate: '2023-05-12' },
  { id: 6, name: 'Morgan Chen', email: 'morgan@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-06-18' },
  { id: 7, name: 'Casey Brown', email: 'casey@example.com', role: 'Editor', status: 'active', joinDate: '2023-07-22' },
  { id: 8, name: 'Jamie Wilson', email: 'jamie@example.com', role: 'Viewer', status: 'active', joinDate: '2023-08-30' },
];

export function TableExample() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // 1) Define columns
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => {
          const role = info.getValue() as string;
          const colorMap: Record<string, string> = {
            Admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            Editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            Viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
          };
          return (
            <span className={`px-2 py-1 rounded text-sm ${colorMap[role]}`}>
              {role}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as string;
          return status === 'active' ? (
            <span className="text-green-600 dark:text-green-400">✅ Active</span>
          ) : (
            <span className="text-red-600 dark:text-red-400">❌ Inactive</span>
          );
        },
      },
      {
        accessorKey: 'joinDate',
        header: 'Join date',
        cell: (info) => new Date(info.getValue() as string).toLocaleDateString('en-US'),
      },
    ],
    []
  );

  // 2) Create the table instance
  const table = useReactTable({
    data: mockUsers,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">TanStack Table (React Table)</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Powerful tables with sorting, filtering and pagination
        </p>
      </div>

      {/* Global filter */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="🔍 Search the table..."
          className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setGlobalFilter('')}
          className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-semibold"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-1 hover:text-blue-600'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            {'<'}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            {'>'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="text-sm text-gray-600">|</span>
          <span className="text-sm">
            Showing <strong>{table.getRowModel().rows.length}</strong> of{' '}
            <strong>{mockUsers.length}</strong> records
          </span>
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="px-3 py-1 border rounded"
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* Extra info */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm">
        <h4 className="font-semibold mb-2">💡 React Table highlights:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>Headless: no built-in styles, 100% customizable</li>
          <li>Column sorting (click headers)</li>
          <li>Global and per-column filtering</li>
          <li>Pagination controls</li>
          <li>TypeScript-first APIs</li>
          <li>Optimized performance for large datasets</li>
        </ul>
      </div>
    </div>
  );
}
