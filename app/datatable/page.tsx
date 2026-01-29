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
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-8 px-8 sm:items-start">

        <header className="flex gap-4 mb-8">
          <div className="max-w-xs text-2xl font-semibold leading-10 tracking-tight">
            <a href="/" className="underline decoration-2">
              Home
            </a>
          </div>
          <h1 className="text-3xl font-semibold leading-10 tracking-tight">
            Data Table
          </h1>
        </header>

        <section className="mb-8">
          <fieldset className="flex gap-4">
            <button
              className="block p-2 rounded-md text-sm border-2 border-cyan-900 bg-cyan-900 hover:bg-cyan-800"
              onClick={() => setNumberOfColumns(numberOfColumns - 1)}
              disabled={numberOfColumns<2}
              children={'Decrement columns'}
              />
            <button
              className="block p-2 rounded-md text-sm border-2 border-cyan-900 bg-cyan-900 hover:bg-cyan-800"
              onClick={() => setNumberOfColumns(numberOfColumns + 1)}
              disabled={numberOfColumns>3}
              children={'Increment columns'}
              />
          </fieldset>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-semibold leading-10 tracking-tight">
            Current /Balance
          </h2>
          <TableExtendedColumns
            columns={numberOfColumns}
            data={dataToRender}
            textLabels={{headName:'NAME',headValue:'BALANCE'}}
            />
          {loadingState.balance && (<Oops isError={false}>Loading data...</Oops>)}
          {loadingError.balance && (<Oops>Error loading data</Oops>)}
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-3xl font-semibold leading-10 tracking-tight">
            Current /Not-Found
          </h2>
          <TableExtendedColumns
            columns={numberOfColumns}
            data={rawDataNotFound || []}
            textLabels={{headName:'NAME',headValue:'BALANCE'}}
            />
          {loadingState.notFound && (<Oops isError={false}>Loading data...</Oops>)}
          {loadingError.notFound && (<Oops>Error loading data</Oops>)}
        </section>

        <Loading isLoading={loading} />

      </main>
    </div>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Helpers

const Oops = ({
  children,
  isError = true,
}: {
  children: ReactNode,
  isError?: boolean,
}) => {
  const bulletClassName = isError
    ? 'inline-block w-2 h-2 mr-2 rounded-full align-middle bg-pink-600'
    : 'inline-block w-2 h-2 mr-2 rounded-full align-middle bg-sky-600'
    ;
  return (
    <p aria-live="polite" className="p-1 border-t-0">
      <span className={bulletClassName} />
      {children}
    </p>
  );
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Export

export default PageDataTable;
