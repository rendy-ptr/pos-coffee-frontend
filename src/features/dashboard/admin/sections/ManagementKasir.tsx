import { lucideIcons } from '@/icon/lucide-react-icons';
import { staffMembers } from '@/features/dashboard/admin/mocks/staffMembers';
import KasirCard from '../components/ManagementKasirItem';

const ManagementKasirSection = () => {
  const { UserX, Calendar, UserCheck } = lucideIcons;

  // Transform staffMembers to match KasirCardProps staffList structure
  const activeStaff = staffMembers
    .filter(staff => staff.status === 'active')
    .map(staff => ({ staff }));
  const inactiveStaff = staffMembers
    .filter(staff => staff.status === 'offline')
    .map(staff => ({ staff }));
  const onLeaveStaff = staffMembers
    .filter(staff => ['sick', 'leave', 'permit'].includes(staff.status))
    .map(staff => ({ staff }));

  const handleAddKasir = () => {
    console.log('Tambah kasir baru');
    // TODO: Implement add kasir functionality
  };

  const handleAddLeaveRequest = () => {
    console.log('Tambah permintaan izin');
    // TODO: Implement add leave request functionality
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <KasirCard
          title="Kasir Dalam Masa Kerja"
          staffList={activeStaff}
          showAddButton={true}
          onAddClick={handleAddKasir}
          icon={<UserCheck className="h-6 w-6 text-white" />}
          headerColor="from-[#6f4e37] to-[#8b5e3c]"
          addButtonText="Tambah Kasir"
        />

        <KasirCard
          title="Kasir Resign"
          staffList={inactiveStaff}
          icon={<UserX className="h-6 w-6 text-white" />}
          headerColor="from-[#8c7158] to-[#a08b7a]"
        />

        <div className="lg:col-span-2 xl:col-span-1">
          <KasirCard
            title="Kasir Tidak Hadir"
            staffList={onLeaveStaff}
            showAddButton={true}
            onAddClick={handleAddLeaveRequest}
            icon={<Calendar className="h-6 w-6 text-white" />}
            headerColor="from-[#a66a4c] to-[#8b5e3c]"
            addButtonText="Tambah Izin"
          />
        </div>
      </div>
    </div>
  );
};

export default ManagementKasirSection;
