import { DatesRangeValue } from '@mantine/dates';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export const useBaseFilter = (prefix = '') => {
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFalsyValues = (params: Record<string, any>) => {
    const final: URLSearchParamsInit = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'undefined' || value === null || value === '') {
        return;
      }

      final[key] = value;
    });

    return final;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAllSearchParams = (): Record<string, any> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      // Only include keys that match our prefix (or no prefix if none specified)
      if (prefix === '' || key.startsWith(prefix)) {
        // Remove the prefix when returning the key
        const cleanKey = prefix ? key.replace(prefix, '') : key;
        params[cleanKey] = value;
      }
    });
    return params;
  };

  const onSearch = useCallback(
    (value?: string) => {
      setSearchParams((prev) => {
        const currentParams = Object.fromEntries(prev.entries());
        // Remove existing prefixed search param if it exists
        if (prefix) {
          delete currentParams[`${prefix}search`];
        }
        return removeFalsyValues({
          ...currentParams,
          [`${prefix}page`]: 1,
          [`${prefix}search`]: value,
        });
      });
    },
    [prefix, setSearchParams]
  );

  const clearParams = useCallback(() => {
    setSearchParams((prev) => {
      const currentParams = Object.fromEntries(prev.entries());
      // Only remove params with our prefix
      if (prefix) {
        Object.keys(currentParams).forEach((key) => {
          if (key.startsWith(prefix)) {
            delete currentParams[key];
          }
        });
        return currentParams;
      }
      // If no prefix, clear all
      return {};
    });
  }, [prefix, setSearchParams]);

  const onDateRangeChange = (value: Date[] | DatesRangeValue | null) => {
    if (value) {
      const [start, end] = value;

      if (start && end) {
        setSearchParams((prev) =>
          removeFalsyValues({
            ...Object.fromEntries(prev.entries()),
            [`${prefix}page`]: 1,
            [`${prefix}start`]: dayjs(start).toISOString(),
            [`${prefix}end`]: dayjs(end).add(1, 'days').toISOString(),
          })
        );
      } else {
        setSearchParams((prev) =>
          removeFalsyValues({
            ...Object.fromEntries(prev.entries()),
            [`${prefix}page`]: 1,
            [`${prefix}start`]: null,
            [`${prefix}end`]: null,
          })
        );
      }
    }
  };

  const onPaginate = (page?: number) => {
    if (page) {
      setSearchParams((prev) =>
        removeFalsyValues({
          ...Object.fromEntries(prev.entries()),
          [`${prefix}page`]: page,
        })
      );
    }
  };

  return {
    onSearch,
    onPaginate,
    removeFalsyValues,
    onDateRangeChange,
    getAllSearchParams,
    clearParams,
  };
};
