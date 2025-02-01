import { PropBaseT } from "@/common/presentation/view/types";
import { Stack, Text } from '@mantine/core';

type PropsTitleT = {
  title: string;
  subtitle?: string
} & PropBaseT

const PageTitle = ({title,  subtitle, ...rest}: PropsTitleT) => {
  return (
    <Stack gap={0} {...rest}>
      <Text className='font-heading'>{title}</Text>
      {subtitle && <Text  className='font-subheading' c="dark.3">{subtitle}</Text>}
    </Stack>
  )
}

export default PageTitle;