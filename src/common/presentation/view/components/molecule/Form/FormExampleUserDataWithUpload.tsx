/* eslint-disable max-lines */
"use client"

import InputDate from '@/Components/Atom/FormInput/InputDate';
import { InputDropzoneImage } from '@/Components/Atom/FormInput/InputDropzone';
import InputNumber from '@/Components/Atom/FormInput/InputNumber';
import InputRadio from '@/Components/Atom/FormInput/InputRadio';
import InputSelect from '@/Components/Atom/FormInput/InputSelect';
import InputText from '@/Components/Atom/FormInput/InputText';
import InputTextarea from '@/Components/Atom/FormInput/InputTextarea';
import Icon from '@/Components/Atom/Icon';
import { FormDataUserWithImageValidation } from '@/utils/validation';
import { ActionIcon, Grid, GridCol, Group, LoadingOverlay, SimpleGrid, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from "dayjs";
import { useState } from 'react';

type FormDataT = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  gender: string|null,
  religion: string|null,
  birtdayDate: Date | null,
  birtday: string,
  password: string,
  confirmationPassword: string,
  image: string,
}

const FormExampleUserDataWithUpload = () => {
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const form = useForm<FormDataT>({
    mode: 'controlled',
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      gender: null,
      religion: null,
      birtdayDate: null,
      birtday: "",
      password: "",
      confirmationPassword: "",
      image: "https://cdn-lfs-us-1.huggingface.co/repos/ac/b3/acb3de135033956271456e8ab1bbe284964f74bf9fab49fb27002b798f18f382/0450e96b0141236216854cda9303da17e2096d48cc144bb12dbff4111d6f5ab2?response-content-disposition=inline%3B+filename*%3DUTF-8%27%27image-classification-input.jpeg%3B+filename%3D%22image-classification-input.jpeg%22%3B&response-content-type=image%2Fjpeg&Expires=1723057773&Policy=eyJTdGF0ZW1lbnQiOlt7IkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcyMzA1Nzc3M319LCJSZXNvdXJjZSI6Imh0dHBzOi8vY2RuLWxmcy11cy0xLmh1Z2dpbmdmYWNlLmNvL3JlcG9zL2FjL2IzL2FjYjNkZTEzNTAzMzk1NjI3MTQ1NmU4YWIxYmJlMjg0OTY0Zjc0YmY5ZmFiNDlmYjI3MDAyYjc5OGYxOGYzODIvMDQ1MGU5NmIwMTQxMjM2MjE2ODU0Y2RhOTMwM2RhMTdlMjA5NmQ0OGNjMTQ0YmIxMmRiZmY0MTExZDZmNWFiMj9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPSomcmVzcG9uc2UtY29udGVudC10eXBlPSoifV19&Signature=EoK-0EUPwRVQti52fK3YH4ktB8BOc3dFktnMYSWbiUr9871TnHJuyjRQ6rt822x707-fMHku3a7M7mRdxg1JoX78K-bwdg0ujaeQ5hqzRFfsgU5C5mHlkhDGpwVOPpJCUH1SISXQbMp6XBqq%7ENH51BCrZJ8W-FPKqT8cwnc%7E--dDwO6Joo%7EcFbia7AZnwZVuRQYNr9Iekn-Khl94UQO69ZRb5fd5IKa-R-rj2YD7l8Td1jwkHQQ1GEk9vH5s2s4uo5VBMibxuqP2JxjmuhcXQlMNxHMumee3PmmmUsa-HwhdTasyGSjImLP7OX099koMZS2IjKS9zsBXeix2VEajqg__&Key-Pair-Id=K24J24Z295AEI9"
    },
    validateInputOnChange: true,
    validate: zodResolver(FormDataUserWithImageValidation),
    transformValues: (values) => ({
      ...values,
      birtday: dayjs(values.birtdayDate).format("YYYY-MM-DD"),
    }),
    // onValuesChange(values) {
    //   // listen changes values
    //   console.log({values}, form.errors)
      
    // },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    if (files.length>0){
      // call fetch upload
      values.image = "url from api"
    }
    console.log("submited", {values})
    setLoading(false);
  };

  return (
    <form name="example-user-image-form" className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={isLoading}/>
      <Group justify="space-between" mb={24}>
        <Text className="font-title-content">Form Example with Upload</Text>
        <ActionIcon type="submit" className="font-title-content" color={form.isValid() ? "primary":"gray"} variant={form.isValid() ? "filled":"light"} disabled={isLoading}>
          <Icon name="IconDeviceFloppy" />
        </ActionIcon>
      </Group>

      <Grid>
        <GridCol span={{base: 12, md: 8, lg: 9}}>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md">
            <InputText 
              label="First Name" 
              required
              key={form.key('firstName')} 
              {...form.getInputProps('firstName')}
            />
            <InputText 
              label="Last Name" 
              key={form.key('lastName')} 
              {...form.getInputProps('lastName')}
            />
            <InputText 
              label="e-Mail" 
              required
              formtype="email" 
              key={form.key('email')} 
              {...form.getInputProps('email')}
            />
            <InputNumber 
              label="Phone" 
              required
              formtype="phone" 
              key={form.key('phone')} 
              {...form.getInputProps('phone')}
            />
            <InputSelect 
              label="Religion"  
              required
              data={["Buddhism","Christianity","Hinduism","Islam", "Jainism", "Judaism", "Sikhism", "Taoism"]} 
              key={form.key('religion')} 
              {...form.getInputProps('religion')}
            />
            <InputRadio 
              label="Gender" 
              required
              data={[{value: "male", label: "Male"}, {value: "female", label: "Female"}]}
              // dataProps={{columns: 2}}
              key={form.key('gender')} 
              {...form.getInputProps('gender')}
            />
          </SimpleGrid>
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputDropzoneImage
            label="Profile Image"
            required
            maxSize={2}
            unit='MB'
            size={110}
            value={files}
            urlValue={[form.getValues().image]}
            onDrop={(files) => setFiles(files)}
            error={form.errors.image}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputTextarea 
            label="Addess" 
            required
            minRows={2}
            key={form.key('address')} 
            {...form.getInputProps('address')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputDate 
            required
            label="Birtday" 
            key={form.key('birtdayDate')} 
            {...form.getInputProps('birtdayDate')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputText 
            required
            label="Password" 
            tooltip="password must contain number and special case"
            formtype="password" 
            key={form.key('password')} 
            {...form.getInputProps('password')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputText 
            required
            label="Re-Type Password" 
            tooltip="must same as password"
            formtype="password" 
            key={form.key('confirmationPassword')} 
            {...form.getInputProps('confirmationPassword')}
          />
        </GridCol>
      </Grid>
    </form>
  )
}

export default FormExampleUserDataWithUpload;