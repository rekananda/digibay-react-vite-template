
import { flattenObject } from '@/common/presentation/view-model/utils/formatting';
import { FilterDataValueT, PropsFilterTableModal } from '@/common/presentation/view/components/atom/ModalMain/type';
import { ExampleData } from '@/example/presentation/view-model/utils/dummiesData';
import Icon from '@Atom/Icon';
import ModalMain, { ModalFooter } from '@Atom/ModalMain';
import { Button } from '@mantine/core';
import ExampleFormFilter from '../Form/ExampleFormFilter';

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