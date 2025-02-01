import { Box, BoxProps } from '@mantine/core';
import { ReactNode } from 'react';

type PropsHeap = {
  children: ReactNode
} & BoxProps

const Heap = ({children, ...rest}: PropsHeap) => {
  return (
    <Box {...rest} pos="relative">{children}</Box>
  )
}

type PropsHeapChild = {
  children: ReactNode;
  position?: "top-left"|"top-right"|"bottom-left"|"bottom-right"|"center";
} & BoxProps

export const HeapChild = ({children, position, ...rest}: PropsHeapChild) => {
  switch(position) {
    case 'center':
      rest.top = "50%";
      rest.left = "50%";
      rest.style = {...rest.style, transform: "translate(-50%, -50%)"};
      break;
    case 'bottom-left':
      rest.bottom = 0;
      rest.left = 0;
      break;
    case 'bottom-right':
      rest.bottom = 0;
      rest.right = 0;
      break;
    case 'top-left':
      rest.top = 0;
      rest.left = 0;
      break;
    case 'top-right':
      rest.top = 0;
      rest.right = 0;
      break;
  }
  return (
    <Box {...rest} pos="absolute">{children}</Box>
  )
}

Heap.Child = HeapChild;

export default Heap;