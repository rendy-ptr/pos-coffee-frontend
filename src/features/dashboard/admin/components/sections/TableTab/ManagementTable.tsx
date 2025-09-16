import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { Button } from '@/components/ui/button';
const {
  SquaresExclude,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  BadgeInfo,
} = lucideIcons;
import { COLOR } from '@/constants/Style';
import ManagementTableItem from '../../organism/TableTab/ManagementTableItem';
import type { BaseTable } from '../../../types/table.type';
import TableModal from '../../organism/TableTab/TableModal';
import AddTableModal from '../../molecule/TableTab/AddTableModal';
import { useGetTables } from '../../../hooks/table.hook';
import EditTableModal from '../../molecule/TableTab/EditTableModal';
import DeleteTableModal from '../../molecule/TableTab/DeleteTableModal';

const { BUTTON_HOVER_ICON, ICON_TRANSITION } = COLOR;

const STATUS = {
  AVAILABLE: 'AVAILABLE',
  OCCUPIED: 'OCCUPIED',
  RESERVED: 'RESERVED',
  MAINTENANCE: 'MAINTENANCE',
} as const;

const filterOptions = [
  { value: 'SEMUA', label: 'Semua' },
  { value: STATUS.RESERVED, label: 'Meja Reserved' },
  { value: STATUS.MAINTENANCE, label: 'Meja Maintenance' },
  { value: STATUS.OCCUPIED, label: 'Meja Terisi' },
  { value: STATUS.AVAILABLE, label: 'Meja Tersedia' },
];

const ManagementTableSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('SEMUA');
  const [selectedMeja, setSelectedMeja] = useState<BaseTable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { tables } = useGetTables();

  const handleCardClick = (meja: BaseTable) => {
    setSelectedMeja(meja);
    setIsModalOpen(true);
  };

  const selectedFilterLabel = useMemo(() => {
    const selected = filterOptions.find(
      option => option.value === selectedFilter
    );
    return selected ? selected.label : 'Semua';
  }, [selectedFilter]);

  const filterMejaSemua = tables.length;
  const filterMejaAvailable = tables.filter(
    t => t.status === STATUS.AVAILABLE
  ).length;
  const filterMejaOccupied = tables.filter(
    t => t.status === STATUS.OCCUPIED
  ).length;
  const filterMejaReserved = tables.filter(
    t => t.status === STATUS.RESERVED
  ).length;
  const filterMejaMaintenance = tables.filter(
    t => t.status === STATUS.MAINTENANCE
  ).length;

  const filteredItems = useMemo(() => {
    return tables.filter(table => {
      const matchesSearch = searchTerm
        ? table.number.toString().includes(searchTerm)
        : true;

      const matchesFilter =
        selectedFilter === 'SEMUA' ? true : table.status === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter, tables]);

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e6d9c9]/10 via-transparent to-[#d2bba3]/10 opacity-30" />
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#6f4e37] via-[#8b5e3c] to-[#a66a4c] opacity-70" />
        </div>

        <CardHeader className="relative z-10 overflow-visible px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-3">
                <SquaresExclude className="h-6 w-6 text-[#6f4e37]" />
              </div>
              <div>
                <CardTitle className="bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Manajemen Meja
                </CardTitle>
                <p className="mt-1 text-sm font-medium text-[#8c7158]/80">
                  Kelola meja dengan mudah
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8c7158]/60" />
                <input
                  type="text"
                  placeholder="Cari nomer meja..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-[#e6d9c9]/50 bg-white/80 py-2 pr-4 pl-9 text-sm backdrop-blur-sm transition-all duration-300 focus:border-[#6f4e37]/50 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 lg:justify-start">
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 rounded-lg border border-[#e6d9c9]/50 bg-white/80 px-4 py-2 text-sm font-medium text-[#6f4e37] backdrop-blur-sm transition-all duration-300 hover:border-[#6f4e37]/30 hover:bg-[#6f4e37]/5 focus:ring-2 focus:ring-[#6f4e37]/30 focus:outline-none"
                  >
                    <Filter className="h-4 w-4" />
                    <span>{selectedFilterLabel}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isFilterOpen && (
                    <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[160px] overflow-hidden rounded-lg border border-[#e6d9c9]/50 bg-white shadow-xl backdrop-blur-sm">
                      {filterOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedFilter(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-200 hover:bg-[#6f4e37]/5 ${
                            selectedFilter === option.value
                              ? 'bg-[#6f4e37]/10 text-[#6f4e37]'
                              : 'text-[#8c7158]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  className={`flex items-center gap-2 ${BUTTON_HOVER_ICON}`}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <SquaresExclude className={`h-4 w-4 ${ICON_TRANSITION}`} />
                  Tambah Meja
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </div>

      {/* Card Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-[#6f4e37]/15 to-[#8b5e3c]/15 p-2">
              <SquaresExclude className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6f4e37]">
                {filterMejaSemua}
              </p>
              <p className="text-sm text-[#8c7158]/70">Total Meja</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-green-500/15 to-green-600/15 p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {filterMejaAvailable}
              </p>
              <p className="text-sm text-[#8c7158]/70">Meja Tersedia</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-blue-500/15 to-blue-600/15 p-2">
              <BadgeInfo className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {filterMejaOccupied}
              </p>
              <p className="text-sm text-[#8c7158]/70">Meja Terisi</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-purple-500/15 to-purple-600/15 p-2">
              <BadgeInfo className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {filterMejaReserved}
              </p>
              <p className="text-sm text-[#8c7158]/70">Meja Terisi</p>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border border-[#e6d9c9]/30 bg-gradient-to-br from-white to-[#faf9f7] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-orange-500/15 to-orange-600/15 p-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {filterMejaMaintenance}
              </p>
              <p className="text-sm text-[#8c7158]/70">Meja Maintenance</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Card Daftar Pesanan */}
      <Card className="relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(tableItem => (
                <ManagementTableItem
                  key={tableItem.id}
                  tableItem={tableItem}
                  onClick={handleCardClick}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full bg-[#e6d9c9]/20 p-4">
                  <Search className="h-8 w-8 text-[#8c7158]/50" />
                </div>
                <p className="mb-2 text-lg font-semibold text-[#6f4e37]">
                  Tidak ada meja ditemukan
                </p>
                <p className="max-w-md text-center text-sm text-[#8c7158]/70">
                  Coba ubah filter atau kata kunci pencarian untuk menemukan
                  meja yang Anda cari.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <AddTableModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      {selectedMeja && (
        <>
          <TableModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedMeja(null);
            }}
            tableItem={selectedMeja}
            onEdit={() => {
              setIsModalOpen(false);
              setIsEditModalOpen(true);
            }}
            onDelete={() => {
              setIsModalOpen(false);
              setIsDeleteModalOpen(true);
            }}
          />

          <EditTableModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            tableItem={selectedMeja}
          />
          <DeleteTableModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            tableItem={selectedMeja}
          />
        </>
      )}
    </div>
  );
};

export default ManagementTableSection;
