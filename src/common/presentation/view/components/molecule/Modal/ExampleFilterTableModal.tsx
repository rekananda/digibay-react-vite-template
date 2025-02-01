import Icon from '@/Components/Atom/Icon';
import ModalMain, { ModalFooter } from '@/Components/Atom/ModalMain';
import { FilterDataValueT, PropsFilterTableModal } from '@/types';
import { ExampleData } from '@/utils/dummyData';
import { Button } from '@mantine/core';
import ExampleFormFilter from '../Form/ExampleFormFilter';
import { flattenObject } from '@/utils/formatting';

const ExampleFilterTableModal = (props: PropsFilterTableModal<ExampleData>) => {
  const { onFilter, initValue, ...rest } = props;

  const handleSubmit = (values: FilterDataValueT<ExampleData>) => {
    if (Object.keys(values).length > 0) {
      onFilter(flattenObject<ExampleData>(values as ExampleData))
    }
    rest.onClose();
  };

  return (
    <ModalMain {...rest} title="Filters" size="md">
      <ExampleFormFilter handleSubmit={handleSubmit} initValue={initValue} formName='example-filter-form'/>
      <ModalFooter className='justify-center' mt={12}>
        <Button color="primary" form="example-filter-form" type="submit" leftSection={<Icon name='IconFilter'/>}>Filter</Button>
      </ModalFooter>
    </ModalMain>
  )
}

export default ExampleFilterTableModal;