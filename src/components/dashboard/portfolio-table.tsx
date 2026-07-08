"use client";

import { useMemo, useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { holdingMarketValueCOP, holdingCostValueCOP } from "@/lib/portfolio-math";
import { deleteHoldingAction } from "@/lib/actions/portfolio-actions";
import type { Holding } from "@/lib/types";

interface Row {
  holding: Holding;
  marketValue: number;
  costValue: number;
  gain: number;
  gainPct: number;
  weight: number;
}

function buildRows(holdings: Holding[]): Row[] {
  const totalMarketValue = holdings.reduce((sum, h) => sum + holdingMarketValueCOP(h), 0);
  return holdings.map((holding) => {
    const marketValue = holdingMarketValueCOP(holding);
    const costValue = holdingCostValueCOP(holding);
    const gain = marketValue - costValue;
    return {
      holding,
      marketValue,
      costValue,
      gain,
      gainPct: costValue > 0 ? (gain / costValue) * 100 : 0,
      weight: totalMarketValue > 0 ? (marketValue / totalMarketValue) * 100 : 0,
    };
  });
}

const columns: ColumnDef<Row>[] = [
  {
    id: "asset",
    header: "Activo",
    accessorFn: (r) => r.holding.asset,
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-foreground">{row.original.holding.asset}</p>
        <p className="text-xs text-muted-foreground">{row.original.holding.ticker}</p>
      </div>
    ),
  },
  {
    id: "type",
    header: "Tipo",
    accessorFn: (r) => r.holding.type,
    cell: ({ row }) => <Badge variant="outline">{row.original.holding.type}</Badge>,
  },
  {
    id: "broker",
    header: "Broker",
    accessorFn: (r) => r.holding.broker,
  },
  {
    id: "quantity",
    header: "Cantidad",
    accessorFn: (r) => r.holding.quantity,
    cell: ({ row }) =>
      row.original.holding.quantity.toLocaleString("es-CO", { maximumFractionDigits: 4 }),
  },
  {
    id: "avgCost",
    header: "Costo promedio",
    accessorFn: (r) => r.holding.avgCost,
    cell: ({ row }) => formatCurrency(row.original.holding.avgCost, row.original.holding.currency),
  },
  {
    id: "currentPrice",
    header: "Precio actual",
    accessorFn: (r) => r.holding.currentPrice,
    cell: ({ row }) => formatCurrency(row.original.holding.currentPrice, row.original.holding.currency),
  },
  {
    id: "gain",
    header: "Ganancia",
    accessorFn: (r) => r.gain,
    cell: ({ row }) => (
      <span className={row.original.gain >= 0 ? "text-success" : "text-danger"}>
        {formatCurrency(row.original.gain, "COP")}
      </span>
    ),
  },
  {
    id: "gainPct",
    header: "%",
    accessorFn: (r) => r.gainPct,
    cell: ({ row }) => (
      <span className={row.original.gainPct >= 0 ? "text-success" : "text-danger"}>
        {formatPercent(row.original.gainPct)}
      </span>
    ),
  },
  {
    id: "weight",
    header: "Peso",
    accessorFn: (r) => r.weight,
    cell: ({ row }) => `${row.original.weight.toFixed(1)}%`,
  },
  {
    id: "dividendYield",
    header: "Dividend Yield",
    accessorFn: (r) => r.holding.dividendYield,
    cell: ({ row }) =>
      row.original.holding.dividendYield > 0 ? `${row.original.holding.dividendYield.toFixed(1)}%` : "—",
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    cell: ({ row }) => (
      <form action={deleteHoldingAction}>
        <input type="hidden" name="id" value={row.original.holding.id} />
        <button type="submit" className="text-xs text-muted-foreground hover:text-danger">
          Eliminar
        </button>
      </form>
    ),
  },
];

export function PortfolioTable({ holdings }: { holdings: Holding[] }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "weight", desc: true }]);
  const [globalFilter, setGlobalFilter] = useState("");
  const rows = useMemo(() => buildRows(holdings), [holdings]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const h = row.original.holding;
      const q = String(filterValue).toLowerCase();
      return (
        h.asset.toLowerCase().includes(q) ||
        h.ticker.toLowerCase().includes(q) ||
        h.broker.toLowerCase().includes(q) ||
        h.type.toLowerCase().includes(q)
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar activo, ticker o broker..."
            className="h-9 w-full rounded-full border border-border bg-transparent pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/40"
          />
        </div>
        <p className="whitespace-nowrap text-xs text-muted-foreground">{filteredCount} posiciones</p>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortDir = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={cn(header.column.getCanSort() && "cursor-pointer select-none")}
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sortDir === "asc" && <ArrowUp className="h-3 w-3" />}
                      {sortDir === "desc" && <ArrowDown className="h-3 w-3" />}
                      {!sortDir && header.column.getCanSort() && (
                        <ArrowUpDown className="h-3 w-3 opacity-30" />
                      )}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
