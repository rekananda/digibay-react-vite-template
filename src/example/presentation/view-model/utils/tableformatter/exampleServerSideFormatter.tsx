
import UserAvatar from "@Atom/Avatar/UserAvatar";
import { Badge, Group } from "@mantine/core";
import ButtonDropdown from "@Molecule/Button/ButtonDropdown";
import { DataTableReturnAPI, PropsDataTableT } from "@Molecule/Table/type";
import { ExampleData } from "../dummiesData";

export const datatableFormater = (dataAPI: DataTableReturnAPI<ExampleData>):PropsDataTableT<ExampleData> => {
  const result:PropsDataTableT<ExampleData> = {
    title: "Server Side example",
    data: dataAPI.data,
    pagination: {
      page: dataAPI.page,
      limit: dataAPI.limit,
      totalPages: dataAPI.total / dataAPI.limit,
      totalDocs: dataAPI.total,
    },
    fields: [
      {
        key: 'id',
        label: "ID",
        noAction: true,
      },
      {
        key: 'user.name',
        label: "User",
        withFilter: true,
        withSorting: true,
        filterFormat: "search",
        filterProps:{
          filterVariant: "text"
        },
        customRenderCell: ({row, renderedCellValue}) => {
          return (
            <UserAvatar data={{alt: row.original.user.name,title: renderedCellValue}} color=""/>
          )
        }
      },
      {
        key: 'user.email',
        label: "Email",
        withFilter: true,
        withSorting: true,
        filterFormat: "search",
        filterProps:{
          filterVariant: "autocomplete"
        }
      },
      {
        key: 'content',
        label: "Content",
        withFilter: true,
        filterFormat: "search",
        filterProps:{
          filterVariant: "text"
        },
        width: 200
      },
      {
        key: 'tags.id',
        keyFn: (d) => d.tags,
        label: "Tags",
        withFilter: true,
        filterFormat: "in",
        filterProps:{
          filterVariant: "multi-select",
          mantineFilterMultiSelectProps: {
            data: ['tech', 'foods', 'game', 'ootd']
          }
        },
        customRenderCell: ({row}) => {
          return (
            <Group gap={12}>{row.original.tags.map((tag, i) => (<Badge key={i} color="primary">{tag.name}</Badge>))}</Group>
          )
        }
      },
    ],
    meta: {
      style: {
        maxHeight: "40vh"
      },
      serverSide: true,
      serverSideFn: (data) => {console.log(data)},
      customRenderToolbar: [{
        position: "top-right",
        render: () => {
          return (
            <ButtonDropdown items={[]} withIconDrop>Action</ButtonDropdown>
          )
        }
      }]
    }
  }

  return result;
}
export const datatableModalFormater = (dataAPI: DataTableReturnAPI<ExampleData>):PropsDataTableT<ExampleData> => {
  const result:PropsDataTableT<ExampleData> = {
    title: "Server Side example: filter modal",
    data: dataAPI.data,
    pagination: {
      page: dataAPI.page,
      limit: dataAPI.limit,
      totalPages: dataAPI.total / dataAPI.limit,
      totalDocs: dataAPI.total,
    },
    fields: [
      {
        key: 'id',
        label: "ID",
        noAction: true,
      },
      {
        key: 'user.name',
        label: "User",
        withFilter: true,
        withSorting: true,
        filterFormat: "search",
        filterProps:{
          filterVariant: "text"
        },
        noAction: true,
        customRenderCell: ({row, renderedCellValue}) => {
          return (
            <UserAvatar data={{alt: row.original.user.name, title: renderedCellValue}} color=""/>
          )
        }
      },
      {
        key: 'user.email',
        label: "Email",
        withFilter: true,
        withSorting: true,
        filterFormat: "search",
        filterProps:{
          filterVariant: "autocomplete"
        },
        noAction: true,
      },
      {
        key: 'alamat_rumah',
        withFilter: true,
        filterFormat: "search",
        filterProps:{
          filterVariant: "text"
        },
        noAction: true,
        maxWidth: 200,
        customRenderCell: ({row}) => {
          return (
            row.original.content
          )
        }
      },
      {
        key: 'tags.id',
        keyFn: (d) => d.tags,
        label: "Tags",
        withFilter: true,
        filterFormat: "in",
        filterProps:{
          filterVariant: "multi-select"
        },
        noAction: true,
        customRenderCell: ({row}) => {
          return (
            <Group gap={12}>{row.original.tags.map((tag, i) => (<Badge  key={i}>{tag.name}</Badge>))}</Group>
          )
        }
      },
    ],
    meta: {
      style: {
        maxHeight: "40vh"
      },
      serverSide: true,
      serverSideFn: (data) => {console.log(data)},
      customRenderToolbar: [{
        position: "top-right",
        render: () => {
          return (
            <ButtonDropdown items={[]} withIconDrop>Action</ButtonDropdown>
          )
        }
      }]
    }
  }

  return result;
}