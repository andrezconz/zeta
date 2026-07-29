import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { deleteCashTransactionAction } from "@/lib/actions/finances-actions";
import type { CashTransaction } from "@/lib/types";

export function TransactionsTable({ transactions }: { transactions: CashTransaction[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => (
          <TableRow key={t.id}>
            <TableCell>{new Date(t.transactionDate + "T00:00:00").toLocaleDateString("es-CO")}</TableCell>
            <TableCell>
              <Badge variant={t.kind === "ingreso" ? "success" : "danger"}>
                {t.kind === "ingreso" ? "Ingreso" : "Gasto"}
              </Badge>
            </TableCell>
            <TableCell>{t.category}</TableCell>
            <TableCell className="text-muted-foreground">{t.description || "—"}</TableCell>
            <TableCell className={t.kind === "ingreso" ? "text-success" : "text-danger"}>
              {t.kind === "ingreso" ? "+" : "-"}
              {formatCurrency(t.amount, "COP")}
            </TableCell>
            <TableCell>
              <form action={deleteCashTransactionAction}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="text-xs text-muted-foreground hover:text-danger">
                  Eliminar
                </button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
