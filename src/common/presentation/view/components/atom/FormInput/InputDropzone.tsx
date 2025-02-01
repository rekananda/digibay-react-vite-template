import { ByteUnitsT, byteOptions } from '@/common/domain/types/index.d';
import Icon from '@Atom/Icon';
import toastAlert from '@Hooks/toastAlert';
import { AspectRatio, Box, Button, Group, Image, Indicator, ScrollAreaAutosize, Stack, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { getAcceptLabel, getSizeLabel } from '@Utils/formatting';
import { useEffect, useRef, useState } from 'react';

type PropsInputDropzoneT = {
  value?: FileWithPath[];
  onChange?:(files: FileWithPath[]) => void;
  label?: string;
  description?: string;
  unit?: ByteUnitsT;
  withButton?: boolean;
  withPreview?: boolean;
  onDrop?:(files: FileWithPath[]) => void;
  onReject?:(files: FileRejection[]) => void;
  onDelete?:(files: FileWithPath[]) => void;
} & Partial<DropzoneProps>


const InputDropzone = (props: PropsInputDropzoneT) => {
  const { value, onChange, label, description, withButton = true, withPreview = false, onDrop, onReject, onDelete, unit, ...rest } = props;
  const [files, setFiles] = useState<FileWithPath[]>(value || []);
  const openRef = useRef<() => void>(null);

  if (unit && rest.maxSize) {
    rest.maxSize = rest.maxSize * (1024 ** byteOptions.findIndex((d) => d === unit));
  }

  const handleDelete = (index:number) => {
    setFiles((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1);
      onDelete && onDelete(newArray);
      return newArray;
    });
  }

  useEffect(() => {
    if (files.length > 0 && onChange) {
      onChange(files);
    }
  },[files, onChange])

  useEffect(() => {
    setFiles(value || []);
  },[value])

  return (
    <Dropzone
      activateOnClick={!withButton}
      openRef={openRef}
      enablePointerEvents
      {...rest}
      accept={withPreview ? IMAGE_MIME_TYPE:rest.accept}
      onDrop={(files) => {
        if(rest.multiple) {
          setFiles((p) => [...p, ...files.filter(file => !p.some(pFile => pFile.name === file.name))]);
        } else {
          setFiles(files);
        }
        onDrop && onDrop(files);
      }}
      onReject={(files) => {
        const errors = files[0].errors;
        // console.log('rejected files', files);
        if ((rest.multiple === false && files.length>1) || (rest.maxFiles && files.length > rest.maxFiles)){
          toastAlert(`Please upload/choose only ${rest.maxFiles||1} file${rest.maxFiles && rest.maxFiles>1?"s":''}`, "error")
        }
        if (rest.maxSize && errors.findIndex((d) => d.code === "file-too-large") >=0 ){
          toastAlert(`Please upload/choose a file with a maximum size of ${rest.maxSize}`, "error")
        }
        if (withPreview || rest.accept && errors.findIndex((d) => d.code === "file-invalid-type") >=0 ){
          toastAlert(`Please upload/choose a file with ${getAcceptLabel(withPreview ? IMAGE_MIME_TYPE:rest.accept)} extension only.`, "error")
        }
        onReject && onReject(files);
      }}
      p={0}
    >
      <ScrollAreaAutosize mah={rest.mah || 400} mih={200} className='scroll-dropzone'>
        <Box p="md" px="sm" >
          {files.length === 0 && <Stack align="center" style={{ pointerEvents: 'none' }}>
            <Group align='flex-start'>
              <Dropzone.Accept>
                <Icon name={withPreview?"IconPhotoCheck":"IconFileCheck"} size={40} stroke={1.5} className="text-primary"/>
              </Dropzone.Accept>
              <Dropzone.Reject>
                <Icon name={withPreview?"IconPhotoX":"IconFileX"} size={40} stroke={1.5} className="text-red"/>
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Icon name={withPreview?"IconPhotoFilled":"IconFile"} size={40} stroke={1.5} className="text-gray"/>
              </Dropzone.Idle>
              <Stack gap={4}>
                <Text size="lg" inline fw={700}>
                  {label || "Drag file here or click to select files"}
                </Text>
                <Text size="sm" c="dimmed" inline>
                  {
                    `Accept ${
                      !rest.multiple ? "only 1 file, ": rest.maxFiles? rest.maxFiles+" files, ":''
                    }${
                      withPreview ? getAcceptLabel(IMAGE_MIME_TYPE) : rest.accept ? getAcceptLabel(rest.accept)+", ":''
                    }${
                      rest.maxSize ? "max "+getSizeLabel(rest.maxSize)+", ":''
                    }`.slice(0, -2)
                  }
                </Text>
                {description && <Text size="sm" c="dimmed" inline>{description}</Text>}
              </Stack>
            </Group>
            {withButton && <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>Select Files</Button>}
          </Stack>}
          {files.length > 0 && <Group gap={20}>
            {files.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <Indicator key={index} inline label="X" size={20} offset={7} color='red' 
                  onClick={() => handleDelete(index)} style={{ pointerEvents: 'all', cursor: "pointer" }}>
                  {withPreview ? 
                    <AspectRatio ratio={1/1} w="100%" mx="auto" className='box-dropzone-image'>
                      <Image 
                        h="100%" 
                        w="100%" 
                        fit="contain" 
                        alt={file.name} 
                        src={imageUrl} 
                        onLoad={() => URL.revokeObjectURL(imageUrl)} />
                    </AspectRatio>
                    :
                    <AspectRatio ratio={1/1} w="100%">
                      <Box className="box-dropzone-file" >
                        <Icon name="IconFile" size={40} stroke={1.5} className="text-dark"/>
                        <Text size="sm" c="dimmed" inline mt={7} lineClamp={1} maw={120}>
                          {file.name}
                        </Text>
                      </Box>
                    </AspectRatio>
                  }
                </Indicator>
              )
            })}
            {(rest.multiple || files.length < (rest.maxFiles||99)) && 
            <Box className="box-dropzone-file border border-dashed rounded-md boder-gray" 
              onClick={() => withButton && openRef.current?.()} 
              style={withButton ? { pointerEvents: 'all', cursor: "pointer" }:{}}
            >
              <Icon name="IconPlus" size={45} stroke={1} className='text-gray'/>
            </Box>}
          </Group>}
        </Box>
      </ScrollAreaAutosize>
    </Dropzone>
  );
}

export default InputDropzone;
