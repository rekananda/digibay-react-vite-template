import { DeepKeys } from "@/common/domain/types";
import { AutocompleteProps, GroupProps, MantineStyleProp, MultiSelectProps, RangeSliderProps, SelectProps, TableProps, TextInputProps } from "@mantine/core";
import { DateInputProps } from "@mantine/dates";
import { UseFormInput, UseFormReturnType } from "@mantine/form";
import { HTMLPropsRef, MRT_Cell, MRT_Column, MRT_Header, MRT_Row, MRT_RowData, MRT_TableInstance, MRT_TableOptions } from "mantine-react-table";
import { ReactNode, RefObject } from "react";
import { PropsEmptyMessageT } from "../EmptyState/EmptyMessage";

type PinPosition = "left"|"right";
export type SortOrder = "ASC" | "DESC";
export type FilterType = "range" | "in" | "search";

export type MRT_Settings<T extends MRT_RowData> = Omit<MRT_TableOptions<T>, 'columns' | 'data'>


export type DatatableCreateFormT<T> = UseFormReturnType<T>;
export type DatatableEditFormT<T> = UseFormReturnType<DataTableEditFormT<T>>;

export type PropsDataTableT<T extends MRT_RowData> = {
  data: T[];
  fields: FieldDataTableT<T>[];
  pagination: PaginationDataTableT;
  meta?: MetaDataTableT<T>;
  className?: string,
  loader?: {
    isLoading?: boolean,
    isFetching?: boolean,
  };
  title?: string;
  extra?: MRT_Settings<T>;
  listenFormCreate?: (form: DatatableCreateFormT<T>) => void;
  listenFormEdit?: (form: DatatableEditFormT<T>) => void
}

export type FieldDataTableT<T extends MRT_RowData> = FieldWithFilter<T> | FieldWithoutFilter<T>;

export interface BaseFieldDataTableT<T extends MRT_RowData> {
  key: DeepKeys<T>|(string & {}),
  keyFn?: (originalRow: T) => any
  label?: string,
  noLabel?: boolean,
  footer?: string,
  width?: number,
  align?: "right"|"left"|"center",
  verticalAlign?: "top"|"bottom"|"middle",
  maxWidth?: number,
  minWidth?: number,
  pin?: PinPosition,
  noAction?: boolean,
  withSorting?: boolean,
  customRenderHeader?: ((props: {
    column: MRT_Column<T>;
    header: MRT_Header<T>;
    table: MRT_TableInstance<T>;
  }) => ReactNode) | ReactNode,
  customRenderFooter?: ((props: {
    column: MRT_Column<T>;
    footer: MRT_Header<T>;
    table: MRT_TableInstance<T>;
  }) => ReactNode) | ReactNode,
  customRenderCell?: (props: {
    cell: MRT_Cell<T>;
    column: MRT_Column<T>;
    renderedCellValue: ReactNode | number | string;
    renderedColumnIndex?: number;
    renderedRowIndex?: number;
    row: MRT_Row<T>;
    rowRef?: RefObject<HTMLTableRowElement>;
    table: MRT_TableInstance<T>;
    formCreate: DatatableCreateFormT<T>,
    formEdit: DatatableEditFormT<T>
  }) => ReactNode | ReactNode;
  customGroupedRenderCell?: (props: {
    cell: MRT_Cell<T>;
    column: MRT_Column<T>;
    row: MRT_Row<T>;
    table: MRT_TableInstance<T>;
  }) => ReactNode | ReactNode;
  enableClickToCopy?: boolean,
  excludeGlobalFilter?: boolean,
}

export interface FieldWithFilter<T extends MRT_RowData> extends BaseFieldDataTableT<T> {
  withFilter: true;
  filterFormat: FilterType;
  filterProps: {
    filterVariant: 'autocomplete' | 'checkbox' | 'date' | 'date-range' | 'multi-select' | 'range' | 'range-slider' | 'select' | 'text';
    mantineFilterAutocompleteProps?: ((props: {
      column: MRT_Column<T>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<AutocompleteProps>);
    mantineFilterCheckboxProps?: ((props: {
      column: MRT_Column<T>;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
    mantineFilterDateInputProps?: ((props: {
      column: MRT_Column<T>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<DateInputProps>);
    mantineFilterMultiSelectProps?: ((props: {
      column: MRT_Column<T>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<MultiSelectProps>);
    mantineFilterRangeSliderProps?: ((props: {
      column: MRT_Column<T>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<RangeSliderProps>);
    mantineFilterSelectProps?: ((props: {
      column: MRT_Column<T>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<SelectProps>);
    mantineFilterTextInputProps?: ((props: {
      column: MRT_Column<T>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<T>;
    }) => HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>) | (HTMLPropsRef<HTMLInputElement> & Partial<TextInputProps>);
  }
}

export interface FieldWithoutFilter<T extends MRT_RowData> extends BaseFieldDataTableT<T> {
  withFilter?: false;
  filterFormat?: never;
}

export type MetaDataTableT<T extends MRT_RowData> = MetaServerside<T>|MetaClientside<T>;

export interface BaseMetaDataTableT<T extends MRT_RowData> {
  style: MantineStyleProp & {theadHeight?: string},
  tableProps?: {
    striped?: boolean, 
    highlightOnHover?: boolean, 
    withTableBorder?: boolean, 
    withColumnBorders?: boolean, 
    withRowBorders?: boolean,
    style?: MantineStyleProp,
    className?: string,
  } & TableProps,
  topToolbarProps?: GroupProps,
  bottomToolbarProps?: GroupProps,
  useInfiniteScroll?: boolean,
  emptyMessage?: string,
  emptyMessageProps?: PropsEmptyMessageT;
  noColumnAction?:boolean, //set true if want diasable all column action [default is false]
  filtering?: MetaFilterWithModal<T>|MetaFilterWithoutModal,
  showLimit?:boolean,
  showTotal?:boolean,
  totalLabel?: string,
  customRenderToolbar?: CustomRenderToolbar<T>[],
  jsonParam?: DataTableRequestAPI<T>;
  inlineEditing?: BaseMetaInlineEditing<T>;
}

export interface MetaServerside<T extends MRT_RowData> extends BaseMetaDataTableT<T> {
  serverSide: true
  serverSideFn?: (data: DataTableRequestAPI<T>) => void,
}

export interface MetaClientside<T extends MRT_RowData> extends BaseMetaDataTableT<T> {
  serverSide?: false
  serverSideFn?: never
}

export interface BaseMetaFilter {
  withColumnFilter?: boolean, //set false if want diasable column filtering [default is true]
  withSearch?: boolean, //set false if want diasable global search [default is true]
  defaultOpen?: boolean, //set false if want hide first filtering [default is true]
  searchBarPosition?: PinPosition,
  withFilterView?: boolean;
}

export interface MetaFilterWithModal<T> extends BaseMetaFilter {
  filterInModal: true,
  toggleModalFn: () => void,
  filteredData: ColumnFilteredDataT<T>[],
}

export interface MetaFilterWithoutModal extends BaseMetaFilter {
  filterInModal?: false,
  toggleModalFn?: never,
  filteredData?: never,
}
export type DataTableEditFormT<T> = {
  datas: T[]
}
export interface BaseMetaInlineEditing<T extends MRT_RowData> {
  createDisplayMode?: 'custom' | 'modal' | 'row',
  editDisplayMode?: 'cell' | 'custom' | 'modal' | 'row' | 'table',
  positionActionsColumn?: 'first' | 'last',
  enableRowActions: true,
  onCreate: (data: T) => void;
  onEdit: (datas: T[]) => void;
  mantineFormCreate: UseFormInput<T>;
  mantineFormEdit: UseFormInput<DataTableEditFormT<T>>;
  withoutSaveButton?: boolean;
}

export type PaginationDataTableT = {
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
}

export type ColumnFilteredDataT<T = any> = {
  id: DeepKeys<T>|(string & {}),
  value: any
}

export type CustomRenderToolbar<T extends MRT_RowData> = {
  render:(table: MRT_TableInstance<T>, index: number) => ReactNode | ReactNode,
  position:'top-right'|'top-left'|'bottom-left'|'bottom-right'|'bottom-full'
}

export interface DataTableRequestAPI<T extends MRT_RowData> {
  page: number;
  limit: number;
  search?: string;
  sort?: SortAPI<T>[];
  filter?: FilterAPI<T>[];
  view?: string
}
export interface WithViewToggle {view: boolean|null}

export interface DataTableReturnAPI<T extends MRT_RowData> extends DataTableRequestAPI<T>{
  data: T[];
  total: number;
}

export interface DataTableReturnAPI<T extends MRT_RowData> extends DataTableRequestAPI<T>{
  data: T[];
  total: number;
}

export type FilterAPI<T extends MRT_RowData> = {
  [K in keyof T]?: any
}

export type SortAPI<T extends MRT_RowData> = {
  [K in keyof T]?: any
};

export type ATMStateDataT = {
  state?: 'create' | 'edit' | 'delete',
  param?: {
    total: number
  }
};