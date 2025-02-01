import { PropBaseT } from "@/common/presentation/view/types";
import InputText from "@Atom/FormInput/InputText";
import Icon from "@Atom/Icon";
import { Box, BoxProps, Button, ButtonGroup } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

type PropsSearchBoxT = {
  keyword: string;
  onChange: (val: string) => void;
  defaultOpen?: boolean;
  withFilter?: boolean;
  isFilterActive?: boolean;
  onFilter?: () => void;
} & PropBaseT & BoxProps

const SearchBox = (props: PropsSearchBoxT) => {
  const { keyword, withFilter=false, defaultOpen, onChange, isFilterActive=false, onFilter, ...rest } = props;
  const [searched, setKeyword] = useState<string>(keyword);
  const [isSearch, {toggle: toggleSearch}] = useDisclosure(defaultOpen ? defaultOpen : keyword !== '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searched !== '' || searched !== keyword) {
        onChange(searched);
      }
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [searched])

  return (
    <Box {...rest} className={`flex gap-2 items-center ${rest.className}`}>
      {isSearch && <InputText 
        className={`${rest.w ? 'flex-grow':''}`}
        placeholder="Search something" 
        rightSection={<Icon name="IconSearch" size={20}/>}
        value={searched} 
        onChange={(e) => setKeyword(e.currentTarget.value)}/>}
      <ButtonGroup variant='transparent'>
        <Button variant="transparent" px={8} py={4} onClick={() => {
          if (isSearch) {
            setKeyword("");
            onChange("");
          }
          !defaultOpen && toggleSearch();
        }}>
          <Icon name={!isSearch ? "IconSearch":"IconSearchOff"} size={20}/>
        </Button>
        {withFilter && <Button variant="transparent" px={8} py={4} onClick={onFilter}><Icon name={!isFilterActive ? "IconFilter":"IconFilterOff"} size={20}/></Button>}
      </ButtonGroup>
    </Box>
  )
}

export default SearchBox;