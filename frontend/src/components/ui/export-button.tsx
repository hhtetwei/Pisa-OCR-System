import { ComponentProps, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { Icon } from './icon';

type Props<T extends any[]> = Pick<
  ComponentProps<typeof Button>,
  'size' | 'onClick' | 'ref' | 'className' | 'loading' | 'disabled'
> & {
  getData: () => Promise<T | void | undefined>;
  format: (value: T[number]) => Record<string, string | number>;
  filename?: string;
  onError?: (error: unknown) => void;
};

export const ExportButton = <T extends any[]>({
  className,
  format,
  getData,
  filename = 'export',
  onError,
  ...props
}: Props<T>) => {
  const [rows, setRows] = useState<ReturnType<typeof format>[]>([]);
  const [ready, setReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const linkRef = useRef<any>(null);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const data = await getData();
      if (data && data.length > 0) {
        const formatted = data.map(format);
        setRows(formatted);
        setReady(true); // trigger effect
      }
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ready && linkRef.current) {
      linkRef.current.link.click();
      setReady(false);
    }
  }, [ready]);

  const { t } = useTranslation();

  return (
    <>
      <Button
        {...props}
        leftIcon={<Icon name="csvExportActive" />} 
        className={clsx(
          'bg-gray-400 text-black border-2 border-solid border-gray-200',
          className
        )}
        onClick={onClick}
        loading={isLoading}
        size="md"
      >
        {t('Export')}
      </Button>
      <CSVLink
        ref={linkRef}
        data={rows}
        className="hidden"
        filename={filename}
        key={rows.length} 
      />
    </>
  );
};
