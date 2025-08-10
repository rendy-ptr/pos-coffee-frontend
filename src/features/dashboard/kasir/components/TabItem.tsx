import { TabsTrigger } from '@radix-ui/react-tabs';

interface ITabItemProps {
  value: string;
  label: string;
}

const TabItem = ({ value, label }: ITabItemProps) => {
  return (
    <TabsTrigger
      value={value}
      className="cursor-pointer rounded-lg px-1 py-2 text-xs transition-all duration-200 outline-none hover:bg-[#d2bba3] focus:ring-0 focus:outline-none data-[state=active]:bg-[#8b5e3c] data-[state=active]:text-white"
    >
      {label}
    </TabsTrigger>
  );
};
export default TabItem;
