import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { TAB_LINK } from '../constant/TabLink';

const TabListSection = () => {
  return (
    <TabsList className="mb-4 grid h-auto w-full grid-cols-4 gap-1 rounded-xl bg-[#eaddd0] p-1">
      {TAB_LINK.map(tab => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className="cursor-pointer rounded-lg px-1 py-2 text-xs transition-all duration-200 outline-none hover:bg-[#d2bba3] focus:ring-0 focus:outline-none data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white"
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
export default TabListSection;
