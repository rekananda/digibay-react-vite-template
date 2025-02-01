import { PropBaseT } from "@/common/presentation/view/types";
import { Box, BoxProps, Modal, ModalProps, ScrollAreaAutosize } from "@mantine/core";
import { Children, ReactNode, isValidElement } from "react";
import "./style.scss"

export type PropsModalT<T = undefined> = {
  onSubmit?: (d: Partial<T>) => void;
} & PropBaseT & ModalProps

const ModalMain = (props: ModalProps) => {
  const { children, ...rest } = props;

  let footerChild:ReactNode|null = null;
  const normalChild:ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.props?.className?.includes('footerContainer')) {
      footerChild = child;
    } else {
      normalChild.push(child);
    }
  })

  return (
    <Modal 
      {...rest}
      centered 
      scrollAreaComponent={ScrollAreaAutosize}
      radius={8}
    >
      {normalChild.map((child) => (child))}
      {footerChild}
    </Modal>
  )
}

export const ModalFooter = ({children, className="", ...rest} :PropBaseT & BoxProps) => {
  return (
    <Box className={`footerContainer ${className}`} {...rest}>
      {children}
    </Box>
  )
}

export default ModalMain;