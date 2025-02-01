"use client"

import InputSelectMultiple from '@/Components/Atom/FormInput/InputSelectMultiple';
import InputText from '@/Components/Atom/FormInput/InputText';
import { FilterDataValueT, PropsFormFilter } from '@/types';
import { ExampleData } from '@/utils/dummyData';
import { Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

const ExampleFormFilter = ({ formName, handleSubmit, initValue={} }: PropsFormFilter<ExampleData>) => {
  const form = useForm<FilterDataValueT<ExampleData>>({
    mode: 'controlled',
    initialValues: {
      user: {
        name: "",
        email: ""
      },
      content: "",
      tags: {
        id: []
      },
      ...initValue
    },
  });

  return (
    <form id={formName} name={formName} className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <InputText 
          label="Name" 
          key={form.key('user.name')} 
          {...form.getInputProps('user.name')}
        />
        <InputText 
          label="email" 
          key={form.key('user.email')} 
          {...form.getInputProps('user.email')}
        />
        <InputText 
          label="content" 
          key={form.key('content')} 
          {...form.getInputProps('content')}
        />
        <InputSelectMultiple 
          label="Tags"
          data={[{label: 'tech', value: 'tech'}, {label: 'foods', value: 'foods'}, {label: 'game', value: 'game'}, {label: 'ootd', value: 'ootd'}]} 
          key={form.key('tags.id')} 
          {...form.getInputProps('tags.id')}
        />
      </Stack>
    </form>
  )
}

export default ExampleFormFilter;