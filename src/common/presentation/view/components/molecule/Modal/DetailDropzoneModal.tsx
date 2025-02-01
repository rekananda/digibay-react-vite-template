"use client"

import Icon from '@/Components/Atom/Icon';
import ModalMain, { ModalFooter, PropsModalT } from '@/Components/Atom/ModalMain';
import { Image } from '@mantine/core';
import { AspectRatio, Button, SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';

type PropsDetailDropzoneModal = {
  datas: FileWithPath[];
  onUpload: () => void;
} & PropsModalT

const DetailDropzoneModal = (props: PropsDetailDropzoneModal) => {
  const { datas, onUpload, ...rest } = props;
  return (
    <ModalMain {...rest} title="Files" size="lg">
      <SimpleGrid cols={4} maw="70vw" spacing="lg" py="md">
        {datas.map((d,i) => {
          const imageUrl = URL.createObjectURL(d);
          return(
          <AspectRatio key={i} ratio={1/1} w="100%" mx="auto" className="box-dropzone-image">
            <Image 
              h="100%" 
              w="100%" 
              fit="contain" 
              alt={d.name} 
              src={imageUrl} 
              onLoad={() => URL.revokeObjectURL(imageUrl)} 
            />
          </AspectRatio>)
        })}
      </SimpleGrid>
      <ModalFooter className='justify-center'>
        <Button color="primary" leftSection={<Icon name='IconPlus'/>} onClick={onUpload}>Upload</Button>
      </ModalFooter>
    </ModalMain>
  )
}

export default DetailDropzoneModal;