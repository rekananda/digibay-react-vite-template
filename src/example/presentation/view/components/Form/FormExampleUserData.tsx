/* eslint-disable max-lines */
import { FormDataUserValidation } from '@/example/presentation/view-model/utils/formValidator';
import InputDate from '@Atom/FormInput/InputDate';
import InputNumber from '@Atom/FormInput/InputNumber';
import InputRadio from '@Atom/FormInput/InputRadio';
import InputSelect from '@Atom/FormInput/InputSelect';
import InputText from '@Atom/FormInput/InputText';
import InputTextarea from '@Atom/FormInput/InputTextarea';
import Icon from '@Atom/Icon';
import { ActionIcon, Grid, GridCol, Group, LoadingOverlay, Text } from '@mantine/core';
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
}

const FormExampleUserData = () => {
  const [isLoading, setLoading] = useState(false);
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
    },
    validateInputOnChange: true,
    validate: zodResolver(FormDataUserValidation),
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
    console.log("submited", {values})
    setLoading(false);
  };

  return (
    <form name="example-user-image-form" className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay visible={isLoading}/>
      <Group justify="space-between" mb={24}>
        <Text className="font-title-content">Form Example</Text>
        <ActionIcon type="submit" className="font-title-content" color={form.isValid() ? "primary":"gray"} variant={form.isValid() ? "filled":"light"} disabled={isLoading}>
          <Icon name="IconDeviceFloppy" />
        </ActionIcon>
      </Group>

      <Grid>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputText 
            label="First Name" 
            required
            key={form.key('firstName')} 
            {...form.getInputProps('firstName')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputText 
            label="Last Name" 
            key={form.key('lastName')} 
            {...form.getInputProps('lastName')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputText 
            label="e-Mail" 
            required
            formtype="email" 
            key={form.key('email')} 
            {...form.getInputProps('email')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputNumber 
            label="Phone" 
            required
            formtype="phone" 
            key={form.key('phone')} 
            {...form.getInputProps('phone')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputSelect 
            label="Religion"  
            required
            data={["Buddhism","Christianity","Hinduism","Islam", "Jainism", "Judaism", "Sikhism", "Taoism"]} 
            key={form.key('religion')} 
            {...form.getInputProps('religion')}
          />
        </GridCol>
        <GridCol span={{base: 12, md: 4, lg: 3}}>
          <InputRadio 
            label="Gender" 
            required
            data={[{value: "male", label: "Male"}, {value: "female", label: "Female"}]}
            // dataProps={{columns: 2}}
            key={form.key('gender')} 
            {...form.getInputProps('gender')}
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

export default FormExampleUserData;