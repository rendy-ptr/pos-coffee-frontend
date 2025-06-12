import React, { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TAB_LINK } from '../constant/TabLink';

type MainContentCustomerProps = {
  children: React.ReactNode;
};

const MainContentCustomer = ({ children }: MainContentCustomerProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="order-2 lg:order-2 lg:col-span-3">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid h-auto w-full grid-cols-5 gap-1 rounded-xl bg-[#eaddd0] p-1">
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
        {children}
      </Tabs>
    </div>
  );
};
export default MainContentCustomer;
