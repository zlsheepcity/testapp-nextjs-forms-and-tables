'use client';

import { Fragment } from 'react';

/**
 * TableExtendedColumns
 * {name, value} array rendered in columns
 * */

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Interfaces

export interface ITableItem {
  name?: string | number;
  value?: string | number;
  index?: number;
  [key: string]: any;
};

export interface ITableTextLabels {
  headName?: string;
  headValue?: string;
};

export interface ITableClassNames {
  table?: string;
  rowEven?: string;
  rowOdd?: string;
  headName?: string;
  headValue?: string;
  itemName?: string;
  itemValue?: string;
};

export interface ITableExtendedColumnsProps {
  data: ITableItem[];
  columns: number;
  textLabels?: ITableTextLabels;
  classNames?: ITableClassNames;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Tools

const defaultClassNames: ITableClassNames = {
  table: '',
  rowEven: 'bg-cyan-950',
  rowOdd: '',
  headName:  'ps-5 pe-2 py-1 text-left  text-xs border-b-2 border-cyan-900',
  headValue: 'ps-2 pe-5 py-1 text-right text-xs border-b-2 border-cyan-900',
  itemName:  'ps-5 pe-2 py-1 text-left  font-bold',
  itemValue: 'ps-2 pe-5 py-1 text-right font-mono',
};

/**
 * formatDataToRender
 * Converts plain array into two-dimensional array
 * representing table rows and columns
 * */
const formatDataToRender = (
  originalData: ITableItem[] = [],
  columns: number = 1,
): ITableItem[][] => {
  const rows = [];
  const data = [...originalData].map(
    (item, index) => ({...{index}, ...item})
  );

  do { rows.push(data.splice(0, columns||1)); }
  while (data.length);

  return rows;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Component

export const TableExtendedColumns = ({
  data,
  columns,
  textLabels = {},
  classNames = {},
}: ITableExtendedColumnsProps) => {
  const rowOddOrEvenClassName = (key: number) => key % 2 === 0
    ? classNames?.rowEven || defaultClassNames.rowEven
    : classNames?.rowOdd  || defaultClassNames.rowOdd
    ;
  return (
    <table className={classNames?.table||defaultClassNames.table}>
      <thead>
        <tr>
          {
            [...Array(columns||1)].map((o,key)=>(
              <Fragment key={key}>
                <th>
                  <div className={classNames?.headName||defaultClassNames.headName}>
                    {textLabels.headName}
                  </div>
                </th>
                <th>
                  <div className={classNames?.headValue||defaultClassNames.headValue}>
                    {textLabels.headValue}
                  </div>
                </th>
              </Fragment>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          formatDataToRender(data, columns).map((dataToRenderRow, key)=>(
            <tr key={key} className={rowOddOrEvenClassName(key)}>
              {
                dataToRenderRow.map((item, key)=>(
                <Fragment key={key}>
                  <td
                    className={classNames?.itemName||defaultClassNames.itemName}
                    children={<div>{item.name}</div>}
                    />
                  <td
                    className={classNames?.itemValue||defaultClassNames.itemValue}
                    children={<div>{item.value}</div>}
                    />
                </Fragment>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default TableExtendedColumns;
