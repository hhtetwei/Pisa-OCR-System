import { Table as MantineTable, ScrollArea } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<T extends Record<string, any>> = {
  data: T[];
  headerMapping: Partial<Record<keyof T | (string & object), ReactNode>>;
  renderCells: (v: T, idx: number) => Partial<Record<keyof T | (string & object), ReactNode>>;
  keyExtract: keyof T | ((row: T) => string);
  minWidth?: number;
  striped?: boolean;
  footerMapping?: Partial<Record<keyof T | (string & object), ReactNode>>;
  noDataMessage?: string;
  footer?: ReactNode;
  onRowClick?: (row: T) => void;
  selectedRowId?: string | null;
  rowClassName?: (row: T) => string;
  headerRow?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>({
  data,
  renderCells,
  headerMapping,
  keyExtract,
  minWidth = 1000,
  striped = true,
  noDataMessage = 'No Data Available in the table',
  footer,
  onRowClick,
  selectedRowId,
  rowClassName,
  headerRow,
}: Props<T>) => {
  const { ref, width } = useElementSize();
  const { t } = useTranslation()

  const rows = data.map((value, idx) => {
    const cells = renderCells(value, idx);
    const key = typeof keyExtract === 'function' ? keyExtract(value) : value[keyExtract];

    const isSelected = selectedRowId === value.id;
    const rowClass = rowClassName ? rowClassName(value) : '';


    return (
      <MantineTable.Tr
        key={key}
        onClick={() => onRowClick?.(value)}
        className={clsx('cursor-pointer', isSelected ? 'bg-white text-black' : '', rowClass)}
      >
        {Object.keys(headerMapping).map((field: keyof T) => (
          <MantineTable.Td key={field as string}>{cells[field]}</MantineTable.Td>
        ))}
      </MantineTable.Tr>
    );
  });

  const stripedColor = '#edf1f7';

  return (
    <ScrollArea
      ref={ref}
      type="auto"
      className="rounded-md"
      offsetScrollbars={width >= minWidth ? false : 'x'}
      classNames={{
        scrollbar: clsx('w-full', data.length % 2 === 0 ? `bg-[${stripedColor}]` : 'bg-white'),
      }}
    >
      <MantineTable
        classNames={{
          table: 'bg-white overflow-hidden rounded-md w-full',
          thead: 'bg-gray-400 text-white rounded min-w-[500px]',
          tbody: 'overflow-auto max-h-32 min-w-[500px]',
          tr: 'h-[56px]',
        }}
        striped={striped ? 'even' : false}
        miw={minWidth}
      >
        <MantineTable.Thead>
          <MantineTable.Tr>
            {Object.values(headerMapping).map((key, index) => (
              <MantineTable.Th key={index}>{key}</MantineTable.Th>
            ))}
          </MantineTable.Tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {headerRow && <MantineTable.Tr className="bg-gray-50">{headerRow}</MantineTable.Tr>}
          {rows.length > 0 ? (
            rows
          ) : (
            <MantineTable.Tr>
              <MantineTable.Td colSpan={Object.values(headerMapping).length}>
                {t("No Data Available in the table")}
              </MantineTable.Td>
            </MantineTable.Tr>
          )}
        </MantineTable.Tbody>
        {footer ? <MantineTable.Tfoot>{footer}</MantineTable.Tfoot> : null}
      </MantineTable>
    </ScrollArea>
  );
};
