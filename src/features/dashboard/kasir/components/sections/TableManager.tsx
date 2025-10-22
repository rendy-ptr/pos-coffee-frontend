// LOCAL-IMPORTS
import TableCard from '../TableCardKasir';
import { TableList } from '../../mocks/TableList';

// TYPES
import type { ITableList } from '@/types/kasir/tablelist';

const TableManager = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {TableList.map((table: ITableList) => (
        <TableCard key={table.id} table={table} />
      ))}
    </div>
  );
};
export default TableManager;
