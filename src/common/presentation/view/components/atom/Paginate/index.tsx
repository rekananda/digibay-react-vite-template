import { Group, PaginationFirst, PaginationItems, PaginationLast, PaginationNext, PaginationPrevious, PaginationProps, PaginationRoot, Text } from "@mantine/core";

type PaginateProp = {
  type?: 'default'|'lite';
} & PaginationProps

const Paginate = (props: PaginateProp) => {
  const { type='default', value = 1, total, ...rest } = props;
  return (
    <PaginationRoot {...rest} total={total} value={value}>
      {type === "default" && <Group gap={5} justify="center">
        {value > 6 && total > 6 && <PaginationFirst />}
        {value > 2 && <PaginationPrevious />}
        <PaginationItems />
        {value < total-1 && <PaginationNext />}
        {value < total-5 && <PaginationLast />}
      </Group>}
      {type === "lite" && <Group gap={5} justify="center">
        {value > 1 && <PaginationPrevious />}
        <Text>{value} of {total}</Text>
        {value < total && <PaginationNext />}
      </Group>}
    </PaginationRoot>
  )
}

export default Paginate;