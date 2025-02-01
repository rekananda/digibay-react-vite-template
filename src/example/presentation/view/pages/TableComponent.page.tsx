import PageTitle from "@Atom/PageTitle";
import { Stack } from "@mantine/core";
import DataTable from "@Molecule/Table";
import { dummyRandomdata } from "../../view-model/utils/dummiesData";
import { datatableFormater } from "../../view-model/utils/tableformatter/componentTableFormatter";

export default function TableComponentPage() {
  return (
    <>
      <Stack gap={24}>
        <PageTitle
          title="Table"
          subtitle="Put any short description here."
        />
        <DataTable {...datatableFormater(dummyRandomdata)} />
      </Stack>
    </>
  );
}
