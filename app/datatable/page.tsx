'use client';

import { useState, useEffect, FC, Fragment } from 'react';
import { TableExtendedColumns } from '@/components/TableExtendedColumns';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Interfaces

export interface IObject {
  [key:string]: any;
}

export interface IBalanceRecord {
  id: string | number;
  amount: string | number;
  name?: string | number;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page

export const PageDataTable:FC = () => {
  const [numberOfColumns, setNumberOfColumns] = useState(3);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">

        <h1>Data Table</h1>

        <TableExtendedColumns
          columns={numberOfColumns}
          data={RAW_DATA.map(o=>({name:o.id,value:o.amount}))}
          textLabels={{headName:'NAME',headValue:'BALANCE'}}
          />

      </main>
    </div>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageDataTable;

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Dev

const RAW_DATA = [{"id":"1","amount":"452.67"},{"id":"2","amount":"895.34"},{"id":"4","amount":"678.90"},{"id":"5","amount":"234.56"},{"id":"6","amount":"789.12"},{"id":"7","amount":"345.67"},{"id":"8","amount":"456.78"},{"id":"9","amount":"987.65"},{"id":"10","amount":"321.45"},{"id":"11","amount":"543.21"},{"id":"12","amount":"876.54"},{"id":"13","amount":"234.89"},{"id":"14","amount":"675.43"},{"id":"15","amount":"432.10"},{"id":"16","amount":"567.89"},{"id":"17","amount":"345.12"},{"id":"18","amount":"123.98"},{"id":"19","amount":"765.43"},{"id":"20","amount":"654.32"},{"id":"21","amount":"876.21"},{"id":"22","amount":"456.12"},{"id":"23","amount":"987.32"},{"id":"24","amount":"123.76"}];
