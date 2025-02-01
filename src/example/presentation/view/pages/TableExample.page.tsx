
import PageTitle from "@Atom/PageTitle";
import { Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DataTable from "@Molecule/Table";
import { ColumnFilteredDataT, DataTableReturnAPI, PropsDataTableT } from "@Molecule/Table/type";
import { useEffect, useState } from "react";
import { dummyDataTableData, ExampleData } from "../../view-model/utils/dummiesData";
import { datatableFormater, datatableModalFormater } from "../../view-model/utils/tableformatter/exampleServerSideFormatter";
import ExampleFilterTableModal from "../components/Modal/ExampleFilterTableModal";

export default function TableExamplePage() {
  const [modalFilter, {toggle}] = useDisclosure(false);
  const dummyReturnAPI:DataTableReturnAPI<ExampleData> = {
    data: dummyDataTableData,
    total: 100,
    page: 1,
    limit: 10
  }
  const [datatable] = useState<PropsDataTableT<ExampleData>>(datatableFormater(dummyReturnAPI));
  const [columnFilters, setColumnFilters] = useState<ColumnFilteredDataT<ExampleData>[]>([]);
  const [modalDatatable, setModalDatatable] = useState<PropsDataTableT<ExampleData>>(datatableModalFormater(dummyReturnAPI));

  useEffect(() => {
    const formattedTable = datatableModalFormater(dummyReturnAPI);

    formattedTable.meta = {
      ...formattedTable.meta,
      style: {...formattedTable.meta?.style},
      filtering: {
        filterInModal: true,
        toggleModalFn: toggle,
        filteredData: columnFilters,
      }
    }
    
    setModalDatatable(formattedTable)
  },[columnFilters])

  return (
    <>
      <PageTitle
        className="mb-6"
        title="Example Table: Work in progress"
        subtitle="server side version"
      />
      <Stack>
        <DataTable {...datatable}/>
        <DataTable {...modalDatatable}/>
      </Stack>
      <ExampleFilterTableModal onFilter={setColumnFilters} opened={modalFilter} onClose={toggle}/>
    </>
  );
}
