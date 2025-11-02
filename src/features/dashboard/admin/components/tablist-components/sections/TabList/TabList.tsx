import { TabsList } from '@/components/ui/tabs';
import { TAB_LINK } from '../../../../constant/TabLink';
import TabItem from '../../organisms/TabList/TabItem';

const TabListSection = () => {
  return (
    <TabsList className="mb-4 grid h-auto w-full grid-cols-7 gap-1 rounded-xl bg-[#eaddd0] p-1">
      {TAB_LINK.map(tab => (
        <TabItem key={tab.value} {...tab} />
      ))}
    </TabsList>
  );
};
export default TabListSection;
