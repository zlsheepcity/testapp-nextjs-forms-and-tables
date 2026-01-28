'use client';

import { useState, useEffect, FC, Fragment } from 'react';
import { SideLoading as Loading } from '@/components/SideLoading';
import { TableExtendedColumns } from '@/components/TableExtendedColumns';
import {
  fetchDataBalance,
  fetchDataCurrenciesMapping,
  fetchDataNotFound,
  IDataResponseCollection,
  IDataResponseDocument,
  IDocument,
} from './data';

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Interfaces

export interface IBalanceRecord {
  id?: string | number;
  amount?: string | number;
  name?: string | number;
  value?: string | number;
  [key: string]: string | number;
};

export interface ICurrenciesMapping {
  [key: string | number]: string | number;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page

export const PageDataTable:FC = () => {

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page: Data loading

  const [rawDataBalance, setRawDataBalance] = useState<IDocument[] | null>(null);
  const [rawDataCurrencies, setRawDataCurrencies] = useState<IDocument | null>(null);
  const [rawDataNotFound, setRawDataNotFound] = useState<IDocument[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState({
    balance: false,
    currencies: false,
    notFound: false,
  });
  const [loadingError, setLoadingError] = useState({
    balance: false,
    currencies: false,
    notFound: false,
  });
  
  // syntax shortcut
  const forAll = (obj, val) => Object.keys(obj).reduce((o,i)=>({...o,[i]:val}),{});

  const fetchAllData = async () => {
    setLoadingState(forAll(loadingState, true));
    setLoadingError(forAll(loadingError, false));

    const responseBalance:IDataResponseCollection = await fetchDataBalance();
    const responseCurrencies:IDataResponseDocument = await fetchDataCurrenciesMapping();
    const responseNotFound:IDataResponseCollection = await fetchDataNotFound();

    setRawDataBalance(responseBalance.data);
    setRawDataCurrencies(responseCurrencies.data);
    setRawDataNotFound(responseNotFound.data);

    setLoadingError({
      balance: !responseBalance.success,
      currencies: !responseCurrencies.success,
      notFound: !responseNotFound.success,
    });
    setLoadingState(forAll(loadingState, false));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const isLoading = Object.keys(loadingState).reduce( (q,i)=>q||loadingState[i], false);
    setLoading(isLoading);
  }, [loadingState]);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page: Data Mapping

  const [dataToRender, setDataToRender] = useState<IBalanceRecord[]>([]);

  const dataMapping = (): void => {
    if (!rawDataBalance?.length || !rawDataCurrencies) return false; // Nothing to map

    const data = rawDataBalance.map(
      (record: IBalanceRecord) => ({
        name: rawDataCurrencies[record.id] || record.id,
        value: record.amount,
      })
    );

    setDataToRender(data);
  };

  useEffect(() => {
    dataMapping();
  }, [rawDataBalance, rawDataCurrencies]);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page: Columns feature

  const [numberOfColumns, setNumberOfColumns] = useState(3);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Page: Render

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">

        <h1>Data Table</h1>

        <section className="mb-8">
          <fieldset className="flex gap-1">
            <button
              className="p-2 text-sm border-2 rounded-sm disabled:opacity-[0.25]"
              onClick={() => setNumberOfColumns(numberOfColumns - 1)}
              disabled={numberOfColumns<2}
              children={'Decrement columns'}
              />
            <button
              className="p-2 text-sm border-2 rounded-sm disabled:opacity-[0.25]"
              onClick={() => setNumberOfColumns(numberOfColumns + 1)}
              disabled={numberOfColumns>3}
              children={'Increment columns'}
              />
          </fieldset>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Current /Balance
          </h2>
          <TableExtendedColumns
            columns={numberOfColumns}
            data={dataToRender}
            textLabels={{headName:'NAME',headValue:'BALANCE'}}
            />
          {loadingState.balance && (<div>Loading data...</div>)}
          {loadingError.balance && (<div>Data load error.</div>)}
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Current /Not-Found
          </h2>
          <TableExtendedColumns
            columns={numberOfColumns}
            data={rawDataNotFound || []}
            textLabels={{headName:'NAME',headValue:'BALANCE'}}
            />
          {loadingState.notFound && (<div>Loading data...</div>)}
          {loadingError.notFound && (<div>Error loading data</div>)}
        </section>

        <Loading isLoading={loading} />

      </main>
    </div>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageDataTable;
