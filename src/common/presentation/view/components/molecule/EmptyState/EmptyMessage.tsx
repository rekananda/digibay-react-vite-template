import { PropBaseT } from "@/common/presentation/view/types";
import Icon from "@Atom/Icon";
import { Stack, Text, TextProps } from "@mantine/core";

export type PropsEmptyMessageT = {
  title?: string;
  subTitle?: string;
  height?: string | number;
} & PropBaseT & TextProps

const EmptyMessage = (props: PropsEmptyMessageT) => {
  const { height, title, subTitle, children, className } = props
  return (
    <Stack gap={8} className={className} mih={height} align="center"  justify="center">
      <Icon name="IconAlertTriangleFilled" size={26} className="text-gray"/>
      <Text className="font-subheading">{title || "Data Kosong"}</Text>
      {subTitle && <Text className="font-body">{subTitle}</Text>}
      {children}
    </Stack>
  )
}

export default EmptyMessage;