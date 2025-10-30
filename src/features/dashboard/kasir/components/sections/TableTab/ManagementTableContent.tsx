// LOCAL-IMPORTS

// COMPONENTS

// HOOKS
import { useState } from 'react';
import { useTables } from '../../../hooks/table.hook';

// TYPES
import type { IBaseTable } from '../../../types/table';
import { Card } from '@/components/ui/card';
import { CARD_STYLES } from '@/constants/Style';
import CardHeaderTableTab from '../../organisms/TableTab/CardHeaderTableTab';
import CardContentTableTab from '../../organisms/TableTab/CardContentTableTab';
import CardModalTableTab from '../../organisms/TableTab/CardModalTableTab';

const ManagementTableContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedMeja, setSelectedMeja] = useState<IBaseTable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tables } = useTables();

  const uniqueStatuses = Array.from(
    new Set(tables.map((table: IBaseTable) => table.status))
  );

  const filterOptions = ['All', ...uniqueStatuses];

  const filteredTables = tables.filter((table: IBaseTable) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      table.number.toString().includes(query) ||
      table.status.toLocaleLowerCase().includes(query);
    const matchesFilter =
      selectedFilter === 'All' ? true : table.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleCardClick = (meja: IBaseTable) => {
    setSelectedMeja(meja);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className={`${CARD_STYLES} shadow-lg transition-shadow`}>
        <CardHeaderTableTab
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filterOptions={filterOptions}
          filteredTables={filteredTables}
        />
        <CardContentTableTab
          filteredItems={filteredTables}
          onClick={handleCardClick}
        />
      </Card>
      {selectedMeja && (
        <CardModalTableTab
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMeja(null);
          }}
          tableItem={selectedMeja}
        />
      )}
    </>
  );
};
export default ManagementTableContent;
