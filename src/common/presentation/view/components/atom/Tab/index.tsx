import { Box, ComboboxItem, Tabs, TabsList, TabsPanel, TabsPanelProps, TabsProps, TabsTab } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";

export type TabT = {
  value: string;
  label: ReactNode;
} & ComboboxItem

type PropsTabT = {
  tabList: TabT[];
  activeTab: string|null;
  listenActiveTab?: (value: string|null) => void;
  isGrow?: boolean;
  withSpaces?: boolean;
  withFullBorder?: boolean;
  leftActionSection?: ReactNode;
  rightActionSection?: ReactNode;
} & TabsProps

const Tab = (props: PropsTabT) => {
  const { 
    activeTab, 
    listenActiveTab, 
    tabList, 
    isGrow, 
    withSpaces = true,
    withFullBorder = false,
    children, 
    leftActionSection, 
    rightActionSection, 
    ...rest 
  } = props;

  const [selectedTab, setTab] = useState<string|null>(activeTab || tabList[0]?.value);
  
  useEffect(() => {
    listenActiveTab && listenActiveTab(selectedTab);
  }, [listenActiveTab]);

  const handleTabChange = (tab: string|null) => {
    listenActiveTab && listenActiveTab(tab);
    setTab(tab);
  }

  return (
    <Tabs {...rest} color="primary" value={selectedTab} onChange={handleTabChange}>
      <Box className={`flex gap-4 items-start w-full ${rightActionSection ? "flex-col md:flex-row":""} ${withSpaces?'justify-between':''}`}>
        <Box className={`flex gap-4 ${withSpaces && withFullBorder?'flex-grow':''} ${isGrow?"w-full":""}`}>
          {leftActionSection}
          <TabsList className="mb-4 flex-grow" grow={isGrow}>
            {tabList.map((item, index) => {
              return <TabsTab key={`tabslist-${index}`} value={item.value} className="font-title" px="md" py={12} disabled={item.disabled||false}>{item.label}</TabsTab>
            })}
          </TabsList>
        </Box>
        {rightActionSection}
      </Box>
      {children}
    </Tabs>
  )
}

export const TabItem = ({ children, ...rest }: TabsPanelProps) => {
  return (
		<TabsPanel {...rest}>
      {children}
    </TabsPanel>
  )
}

export default Tab;