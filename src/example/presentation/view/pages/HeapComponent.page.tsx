import Heap, { HeapChild } from "@Atom/Heap";
import PageTitle from "@Atom/PageTitle";
import { Box, Flex, Stack } from "@mantine/core";

export default function HeapComponentPage() {
  return (
    <>
      <PageTitle
        className="mb-6"
        title="Heap"
        subtitle="Put any short description here."
      />
      <Stack>
        <Heap>
          <Flex className="w-full" h="40vh" bg="grape">Parent Component</Flex>
          <HeapChild position="top-left">
            <Box bg="lime">Top Left component</Box>
          </HeapChild>
          <HeapChild position="center">
            <Box bg="red">Center component</Box>
          </HeapChild>
          <HeapChild position="top-right">
            <Box bg="blue">Top Right component</Box>
          </HeapChild>
          <HeapChild position="bottom-left">
            <Box bg="yellow">Bottom Left component</Box>
          </HeapChild>
          <HeapChild position="bottom-right">
            <Box bg="pink">Bottom Right component</Box>
          </HeapChild>
          <HeapChild top={100} right={400}>
            <Box bg="pink">Custom component top 100 right 400</Box>
          </HeapChild>
        </Heap>
        <Heap className="w-full flex justify-center items-center" h="40vh" bg="grape">
          Parent Component
          <HeapChild left={0} top={0} bottom={0} w={300} bg="cyan">
            child 1
            <HeapChild left={0} right={0} bottom={0} bg="yellow">
              child 1.1
            </HeapChild>
            <HeapChild position="center" bg="blue">
              child 1.2
            </HeapChild>
          </HeapChild>
        </Heap>

      </Stack>
    </>
  );
}
