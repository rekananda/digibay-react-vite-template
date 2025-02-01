import InputSelect from "@Atom/FormInput/InputSelect";
import Paginate from "@Atom/Paginate";
import toastAlert from "@Hooks/toastAlert";
import { Button, Group, Stack, Text } from "@mantine/core";
import { UseFormReturnType, useForm as useMantineForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import SearchBox from "@Molecule/Content/SearchBox";
import EmptyMessage from "@Molecule/EmptyState/EmptyMessage";
import { findArrayDifferences } from "@Utils/dataValidation";
import { capitalize } from "@Utils/formatting";
import { MantineReactTable, MRT_ColumnDef, MRT_ColumnFiltersState, MRT_ColumnPinningState, MRT_PaginationState, MRT_RowData, MRT_RowVirtualizer, MRT_SortingState, MRT_TableOptions, useMantineReactTable } from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableEditFormT, DataTableRequestAPI, FieldDataTableT, FilterAPI, FilterType, MetaDataTableT, PropsDataTableT, SortAPI } from "./type";
import './style.scss'

type FilterList = {[key: string]: FilterType|null}

function convertSortingCriteria<T extends MRT_RowData>(criteria: MRT_SortingState):SortAPI<T> {
  const result: { [key: string]: any } = {};

  criteria.forEach(item => {
    const { id, desc } = item;
    result[id] = desc ? "DESC" : "ASC";
  });

  return result as SortAPI<T>;
}
function convertFilterCriteria<T extends MRT_RowData>(criteria: MRT_ColumnFiltersState, types: FilterList):FilterAPI<T> {
  const result: { [key: string]: any } = {};

  criteria.forEach(item => {
    const { id, value } = item;
    const keys = id.split('.');
    const type = types[id];
    let current: { [key: string]: any } = result;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = (type == "search") ? value: { type, value } 
      } else {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    });
  });

  return result as FilterAPI<T>;
}

const DataTable = (props: PropsDataTableT<any>) => {
  const { className="", title, data, fields, loader, pagination: propPagination, meta: propMeta, extra, listenFormCreate, listenFormEdit } = props;
  
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const meta:MetaDataTableT<any> = {
    useInfiniteScroll: false,
    showLimit: true,
    showTotal: true,
    totalLabel: "Data",
    ...propMeta,
    filtering: {
      defaultOpen: false,
      withColumnFilter: true,
      withSearch: true,
      searchBarPosition: "right",
      withFilterView: false,
      ...propMeta?.filtering
    },
    style: {
      minHeight: "40vh",
      ...propMeta?.style
    },
    tableProps: {
      withRowBorders: true,
      ...propMeta?.tableProps
    },
  }

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(meta.filtering?.filteredData || []);
  const [datapost, setDatapost] = useState<DataTableRequestAPI<any>>({
    page: propPagination.page,
    limit: propPagination.limit,
    search: meta.jsonParam?.search || '',
    view: meta.jsonParam?.view
  })
  // console.log(meta.jsonParam)
  const [globalFilter, setGlobalFilter] = useState(meta.jsonParam?.search || '');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({pageIndex: propPagination.page-1, pageSize: propPagination.limit});
  const [columnPinning, setColmnPinning] = useState<MRT_ColumnPinningState>({});
  const [showColumnFilters, {open, close, toggle: toggleColumnFilters}] = useDisclosure(false);

  const formCreate = useMantineForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {},
    ...meta.inlineEditing?.mantineFormCreate
  });
  const formEdit = useMantineForm<DataTableEditFormT<any>>({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {datas: data},
    ...meta.inlineEditing?.mantineFormEdit
  });

  const [columnFilterTypes, setColumnFilterTypes] = useState<FilterList>({});
  const handleUpdateData = () => {
    const datas = formEdit.getValues().datas;
    meta.inlineEditing && meta.inlineEditing.onEdit(findArrayDifferences(datas, data).map(d => d.value1));
  }

  const resetData= () => {
    formCreate.reset();
    if (listenFormCreate) {
      if (formCreate.isDirty()) {
        formCreate.validate();
      }
    } else {
      formCreate.resetDirty();
    }
  }

  const resetDataEdit= () => {
    formEdit.setInitialValues({datas: data});
    formEdit.setValues({datas: data});
    if (listenFormEdit) {
      if (formEdit.isDirty()) {
        formEdit.validate();
      }
    } else {
      formEdit.resetDirty()
    }
  }
  const handleAddNewData: MRT_TableOptions<any>['onCreatingRowSave'] = async({
    exitCreatingMode,
  }) => {
    if (!formCreate.isValid()) {
      formCreate.validate();
      // console.log(formCreate.errors, formCreate.getValues())
      toastAlert("Data not valid", 'warning');
      return;
    }

    await (meta.inlineEditing && meta.inlineEditing.onCreate(formCreate.getValues()));
    // resetData();
    
    exitCreatingMode();
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => mrtColumnFormatter(fields, meta, formCreate, formEdit),
    [globalFilter, fields, data, meta.inlineEditing, formEdit.getValues(), formCreate.getValues(), formCreate.errors],
  );

  const tableOptions:MRT_TableOptions<any> = {
    columns,
    data,
    createDisplayMode: meta.inlineEditing?.createDisplayMode,
    // enableColumnActions: false,
    // enableColumnPinning: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilterModes: true,
    enableFacetedValues: !(meta.serverSide),
    enableFilters: true,
    enableHiding: false,
    enablePagination: !(meta.serverSide),
    enableRowActions: meta.inlineEditing?.enableRowActions || false,
    enableRowVirtualization: meta?.useInfiniteScroll,
    enableSorting: true,
    enableStickyHeader: true,
    getRowId: (row) => row.id,
    globalFilterFn: 'contains',
    globalFilterModeOptions: ['contains'],
    enableFilterMatchHighlighting: true,
    manualFiltering: meta.serverSide||false,
    manualPagination: meta.serverSide||false,
    manualSorting: meta.serverSide||false,
    mantineHighlightProps: {
      className: "font-body"
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['3','5','10','15','20','50','100'],
      showRowsPerPage: meta.showLimit,
      withEdges: false, 
      hideWithOnePage: true,
      disabled: loader?.isLoading || loader?.isFetching || false,
    },
    mantineTableProps: {
      ...meta.tableProps,
      style: {
        "--header-height": meta.style.theadHeight || "42px",
        ...meta.tableProps?.style||{}
      }
    },
    mantineTableHeadProps: {
      height: meta.style.theadHeight || "42px",
    },
    mantineTableBodyRowProps({row}) {
      const index = row.index;
      return ({
        className: index<0 ?`create-row`:''
      })
    },
    mantineTableBodyCellProps: {
      className: "font-body",
      style: {
        whiteSpace: "normal",
        // position: "relative"
      }
    },
    mantineTableContainerProps: {
      style: meta.style,
      ref: tableContainerRef, //get access to the table container element
      // onScroll: (e) => handleReachBottom(e.target as HTMLDivElement),
    },
    onColumnFiltersChange: setColumnFilters,
    onCreatingRowCancel: resetData,
    onCreatingRowSave: handleAddNewData,
    // onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: !meta.serverSide ? setPagination:undefined,
    onShowColumnFiltersChange: (val) => {val?open():close()},
    onSortingChange: setSorting,
    positionActionsColumn: meta.inlineEditing?.positionActionsColumn || "last",
    renderBottomToolbar: ({table}) => {
      const renderRight = (meta.customRenderToolbar||[]).filter((d) => d.position == "bottom-right");
      const renderLeft = (meta.customRenderToolbar||[]).filter((d) => d.position == "bottom-left");
      const renderFull = (meta.customRenderToolbar||[]).filter((d) => d.position == "bottom-full");

      return (
        <Stack>
          <Group className="mrt-bottom-toolbar" gap={12} w="100%" justify='space-between' p="md" wrap="nowrap" {...propMeta?.bottomToolbarProps}>
            {renderLeft.length > 0 && <Group gap={12}>
              {renderLeft.map((d, i) => d.render(table, i))}
            </Group>}
            <Group gap={12}>
              {meta.showLimit && <Group gap={8}>
                <Text className="font-body">Limit :</Text>
                <InputSelect 
                  disabled={loader?.isLoading || loader?.isFetching || false}
                  value={meta.serverSide ? datapost.limit.toString(): pagination.pageSize.toString()} 
                  onChange={(val) => formCreate.isDirty() || formEdit.isDirty() ? toastAlert("Finish editing first","warning") : meta.serverSide ? 
                    setDatapost((prev) => ({...prev, limit: parseInt(val || "10"), ...(prev.page > Math.ceil(propPagination.totalDocs / parseInt(val || "10")) ? 
                      {page: Math.ceil(propPagination.totalDocs / parseInt(val || "10"))} : {})})):
                    setPagination((prev) => ({...prev, pageSize: parseInt(val || "10"), ...(prev.pageIndex > Math.ceil(data.length / parseInt(val || "10"))-1 ? 
                      {pageIndex: Math.ceil(data.length / parseInt(val || "10"))-1} : {})
                    }))
                  }
                  data={['3','5','10','15','20','50','100']}
                  w={70}
                />
              </Group>
              }
              <Paginate 
                disabled={loader?.isLoading || loader?.isFetching || false}
                total={meta.serverSide ? propPagination.totalPages: Math.ceil(table.getRowCount() / pagination.pageSize)} 
                defaultValue={meta.serverSide ? datapost.page: pagination.pageIndex+1} 
                value={meta.serverSide ? datapost.page: pagination.pageIndex+1} 
                onChange={(val) => formCreate.isDirty() || formEdit.isDirty() ? toastAlert("Finish editing first","warning") : meta.serverSide ? 
                  setDatapost((prev) => ({...prev, page: val})):
                  setPagination((prev) => ({...prev, pageIndex: val-1}))
                }
              />
              {meta.showTotal && <Text className="font-body">Total {meta.totalLabel} : {meta.serverSide ? propPagination.totalDocs: table.getRowCount()}</Text>}
            </Group>
            {renderRight.length > 0 && <Group gap={12}>
              {renderRight.map((d, i) => d.render(table, i))}
            </Group>}
          </Group>
          {renderFull.map((d, i) => d.render(table, i))}
        </Stack>
      )
    },
    renderTopToolbar: ({table}) => (
      <Group className="mrt-top-toolbar" gap={12} w="100%" justify='space-between' p="md" wrap="nowrap" {...propMeta?.topToolbarProps}>
        <Group gap={12}>
          {title && <Text className="font-title">{title}</Text>}
          {meta.filtering?.withSearch && meta.filtering.searchBarPosition == "left" && 
            <SearchBox 
              key="search"
              className="datatable-search"
              keyword={meta.serverSide ? datapost.search || '' : globalFilter} 
              onChange={(val) => meta.serverSide ? setDatapost((prev) => ({...prev, search: val as string, page: 1})):setGlobalFilter(val as string)} 
              withFilter={meta.filtering.withColumnFilter}
              onFilter={meta.filtering.toggleModalFn||toggleColumnFilters} 
              isFilterActive={showColumnFilters}
              defaultOpen={meta.filtering.defaultOpen}
            />
          }
          {meta.filtering?.withFilterView && <InputSelect 
            placeholder="Pilih Status data yang ditampilkan" 
            data={['active', "nonactive", "all"]} 
            value={datapost.view} 
            onChange={(val) => setDatapost((prev) => ({...prev, view: val || undefined}))}
          />}
          {(meta.customRenderToolbar||[]).filter((d) => d.position == "top-left").map((d, i) => d.render(table, i))}
        </Group>
        
        {!meta.inlineEditing?.withoutSaveButton && formEdit.isDirty() ?
          <Group gap={12} key="edit">
            <Button onClick={() => {
              formEdit.setInitialValues({datas: data});
              formEdit.setValues({datas: data});
            }} disabled={loader?.isLoading||false} variant='outline'>Cancel</Button>
            <Button onClick={handleUpdateData} disabled={!formEdit.isValid()||loader?.isLoading||false}>Save Changes</Button>
          </Group>:
          <Group gap={12} key="default">
            {meta.filtering?.withSearch && meta.filtering.searchBarPosition == "right" && 
              <SearchBox 
                key="search"
                className="datatable-search"
                keyword={meta.serverSide ? datapost.search || '' : globalFilter} 
                onChange={(val) => meta.serverSide ? setDatapost((prev) => ({...prev, search: val as string, page: 1})):setGlobalFilter(val as string)} 
                withFilter={meta.filtering.withColumnFilter}
                onFilter={meta.filtering.toggleModalFn||toggleColumnFilters} 
                isFilterActive={showColumnFilters}
                defaultOpen={meta.filtering.defaultOpen}
              />
            }
            {(meta.customRenderToolbar||[]).filter((d) => d.position == "top-right").map((d, i) => d.render(table, i))}
          </Group>
        }
      </Group>
    ),
    renderEmptyRowsFallback: () => {
      return (<EmptyMessage 
        title={meta.emptyMessage || meta.emptyMessageProps?.title} 
        subTitle={globalFilter ? `Hasil pencarian "${globalFilter}" tidak ditemukan.`: meta.emptyMessageProps?.subTitle} 
        height={meta.emptyMessageProps?.height || 300}
      >
        {/* {meta.onReset && globalFilter ! && <Button onClick={meta.onReset}>Refresh</Button>} */}
      </EmptyMessage>)
    },
    paginationDisplayMode: 'pages',
    rowCount: meta.serverSide ? propPagination.totalDocs: undefined,
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 6 },
    ...extra,
    
    mantinePaperProps: {
      withBorder: false,
      radius: "8px",
      ...extra?.mantinePaperProps,
      className: `glassmorp ${className}`,
    },
    
    state: { 
      ...extra?.state,
      density: "xs",
      columnPinning,
      columnFilters,
      globalFilter,
      isLoading: loader?.isLoading || false,
      ...(meta.serverSide ? {}:{pagination}),
      showColumnFilters,
      showProgressBars: loader?.isFetching || false,
      sorting,
      
    },
  }

  const table = useMantineReactTable(tableOptions);

  useEffect(() => {
    const type:FilterList = {};
    const right: string[]=extra?.state?.columnPinning?.right || [];
    const left: string[]=extra?.state?.columnPinning?.left || [];

    fields.forEach((field) => {
      type[field.key] = field.filterFormat || null;
      if (field.pin === "left") left.push(field.key);
      if (field.pin === "right") right.push(field.key);
    })
    setColmnPinning({left, right});
    setColumnFilterTypes(type);
  }, [fields]);

  useEffect(() => {
    resetData();
    resetDataEdit();
    rowVirtualizerInstanceRef.current?.scrollToIndex(0);
    // console.log("reset all form", formEdit.getValues(), {data})
  }, [data]);

  useEffect(() => {
    if (propPagination.totalPages < datapost.page) {
      setDatapost((prev) => ({...prev, page: propPagination.totalPages}))
    }
  }, [propPagination]);

  useEffect(() => {
    if (meta.inlineEditing){
      formCreate.setInitialValues(meta.inlineEditing.mantineFormCreate.initialValues);
      formCreate.setValues(meta.inlineEditing.mantineFormCreate.initialValues);
    }
  }, [meta.inlineEditing])

  useEffect(() => {
    const request: DataTableRequestAPI<any> = {
      page: datapost.page,
      limit: datapost.limit,
    }
    if (datapost.search !== '') {
      request.search = datapost.search
    }
    if (datapost.view) {
      request.view = datapost.view
    }
    if (sorting.length> 0) {
      request.sort = convertSortingCriteria(sorting);
    }
    if (columnFilters.length> 0) {
      request.filter = convertFilterCriteria(columnFilters, columnFilterTypes);
    }

    if (meta.serverSide && JSON.stringify(meta.jsonParam) !== JSON.stringify(request)) {
      // console.log(JSON.stringify(meta.jsonParam) !== JSON.stringify(request), meta.jsonParam , request)
      meta.serverSideFn && meta.serverSideFn(request);
    }
  }, [datapost, sorting, columnFilters])

  useEffect(() => {
    if (!meta.serverSide && (pagination.pageIndex+1) !== propPagination.page) {
      setPagination({pageIndex: propPagination.page-1, pageSize: propPagination.limit});
    }
  }, [meta.serverSide, data, propPagination])

  useEffect(() => {
    // console.log(columnFilters, sorting, pagination)
    if (meta.filtering) {
      const value = meta.filtering.filteredData || [];
      if (value != columnFilters) setColumnFilters(value);
    }
  }, [meta.filtering?.filteredData])

  useEffect(() => {
    listenFormCreate && listenFormCreate(formCreate);
    if (formCreate.isDirty()) {
      formCreate.validate();
    }
  },[formCreate.getValues()])

  useEffect(() => {
    listenFormEdit && listenFormEdit(formEdit);
    if (formEdit.isDirty()) {
      formEdit.validate();
      if (formEdit.isValid() && findArrayDifferences(formEdit.getValues().datas, data).length === 0) {
        formEdit.resetDirty();
      }
    }
  },[formEdit.getValues()])

  return (
    <MantineReactTable table={table} key="hai"/>
  )
}

export function autoLabeling (key: string) {
  return capitalize(key.replace(/_/g, ' '));
}

export function mrtColumnFormatter<T extends MRT_RowData>(
  fields: FieldDataTableT<T>[], 
  meta: MetaDataTableT<T>,
  formCreate: UseFormReturnType<T>,
  formEdit: UseFormReturnType<DataTableEditFormT<T>>
): MRT_ColumnDef<T>[] {
  // console.log("trigger re render column")
  return fields.map(field => ({
    id: field.keyFn ? field.key as string: undefined,
    accessorKey: field.keyFn ? undefined : field.key as string,
    accessorFn: field.keyFn,
    header: field.noLabel ? "" : field.label || autoLabeling(field.key),
    footer: field.footer,
    enableClickToCopy: field.enableClickToCopy,
    enableColumnActions: meta.filtering ? !meta.filtering.filterInModal && !field.noAction : false,
    enableColumnFilter: field.withFilter||false,
    enableColumnFilterModes: false,
    enableHiding: false,
    enablePinning: false,
    enableSorting: field.withSorting || false,
    enableGlobalFilter: !field.excludeGlobalFilter,
    Cell: (props) => field.customRenderCell ? field.customRenderCell({...props, formCreate, formEdit}):props.renderedCellValue,
    GroupedCell: field.customGroupedRenderCell,
    Header: field.customRenderHeader,
    Footer: field.customRenderFooter,
    size: field.width,
    minSize: field.minWidth,
    maxSize: field.maxWidth,
    mantineTableBodyCellProps: {
      align: field.align || "left",
      className: "font-body",
      style: {
        verticalAlign: field.verticalAlign || "middle",
        whiteSpace: "normal",
        position: field.pin ? "sticky":"relative"
      }
    },
    ...(field.withFilter ? field.filterProps:{}),
  }));
}

export default DataTable;