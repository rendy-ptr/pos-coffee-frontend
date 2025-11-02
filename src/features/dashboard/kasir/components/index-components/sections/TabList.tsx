import { TabsList } from '@radix-ui/react-tabs';
import { TAB_LINK } from '../../../constant/TabLink';
import TabItem from '../../TabItem';

const TabListSection = () => {
  return (
    <TabsList className="mb-4 grid h-auto w-full grid-cols-4 gap-1 rounded-xl bg-[#eaddd0] p-1">
      {TAB_LINK.map(tab => (
        <TabItem key={tab.value} {...tab} />
      ))}
    </TabsList>
  );
};
export default TabListSection;
