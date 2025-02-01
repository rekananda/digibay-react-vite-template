
import { Box } from "@mantine/core";
import ButtonDropdown from "@Molecule/Button/ButtonDropdown";
import { PropsDataTableT } from "@Molecule/Table/type";
import { RandomData } from "../dummiesData";

export const datatableFormater = (data: RandomData[],):PropsDataTableT<RandomData> => {
  const result:PropsDataTableT<RandomData> = {
    title: "Table Title",
    data,
    pagination: {
      page: 1,
      limit: 10,
      totalPages: data.length/10,
      totalDocs: data.length,
    },
    fields: [
      {
        key: 'name',
        label: "Name",
        withSorting: true,
        withFilter: true,
        filterFormat: "search",
        filterProps: {
          filterVariant:"autocomplete"
        }
      },
      {
        key: 'email',
        label: "Email",
        withSorting: true,
        withFilter: true,
        filterFormat: "search",
        enableClickToCopy: true,
        filterProps: {
          filterVariant:"text"
        }
      },
      {
        key: 'country',
        label: "Country",
        withSorting: true,
        withFilter: true,
        filterFormat: "in",
        filterProps: {
          filterVariant:"multi-select"
        }
      },
      {
        key: 'phone',
        label: "Phone",
        withSorting: true,
        withFilter: true,
        filterFormat: "search",
        filterProps: {
          filterVariant:"text"
        }
      },
      {
        key: 'numberrange',
        label: "Number Range",
        withSorting: true,
        withFilter: true,
        filterFormat: "range",
        excludeGlobalFilter:true,
        filterProps: {
          filterVariant:"range-slider",
          mantineFilterRangeSliderProps: {
            minRange: 3
          },
        },
      },
      {
        key: 'currency',
        label: "Currency",
        withSorting: true,
        withFilter: true,
        filterFormat: "range",
        excludeGlobalFilter:true,
        filterProps: {
          filterVariant:"range-slider",
          mantineFilterRangeSliderProps: {
            minRange: 3,
            // label:(value) => `$${value}`
          }
        },
        customRenderCell({renderedCellValue, cell}) {
          const value = cell.getValue<number>();
          return (
            <Box p={4} px={8} style={{borderRadius: "8px"}} w="fit-content"
              bg={value < 10 ? "red":
                value < 70 ? "yellow":
                "green"
              }
            >${renderedCellValue}</Box>)
        },
      },
    ],
    meta: {
      style: {
        maxHeight: "calc(100dvh - var(--app-shell-header-height) - var(--app-shell-header-offset) - 161px - 84px)" //84 other content outside the table component include margin & padding or gap
      },
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