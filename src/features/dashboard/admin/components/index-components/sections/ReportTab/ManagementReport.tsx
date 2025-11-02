import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COLOR } from '@/constants/Style';
import { lucideIcons } from '@/icon/lucide-react-icons';
import { formatCurrency } from '@/utils/formatCurrency';
import { Printer, FileDown } from 'lucide-react';
import { useToast } from '@/components/shared/ToastProvider';

type ReportGrouping = 'daily' | 'weekly' | 'monthly';

const {
  Calendar,
  Filter,
  FileText,
  Save,
  TrendingUp,
  DollarSign,
  ShoppingBasket,
} = lucideIcons;

interface ReportRecord {
  id: string;
  date: string;
  periodLabel: string;
  orders: number;
  revenue: number;
  profit: number;
  averageTicket: number;
  bestSeller: string;
}

const mockReportData: ReportRecord[] = [
  {
    id: 'RPT-240601',
    date: '2024-06-01',
    periodLabel: 'Sabtu, 1 Juni 2024',
    orders: 68,
    revenue: 2480000,
    profit: 850000,
    averageTicket: 36470,
    bestSeller: 'Caramel Machiatto',
  },
  {
    id: 'RPT-240602',
    date: '2024-06-02',
    periodLabel: 'Minggu, 2 Juni 2024',
    orders: 72,
    revenue: 2650000,
    profit: 940000,
    averageTicket: 36805,
    bestSeller: 'Kopi Susu Gula Aren',
  },
  {
    id: 'RPT-240603',
    date: '2024-06-03',
    periodLabel: 'Senin, 3 Juni 2024',
    orders: 51,
    revenue: 1820000,
    profit: 620000,
    averageTicket: 35686,
    bestSeller: 'Latte Hazelnut',
  },
  {
    id: 'RPT-240604',
    date: '2024-06-04',
    periodLabel: 'Selasa, 4 Juni 2024',
    orders: 55,
    revenue: 1950000,
    profit: 680000,
    averageTicket: 35454,
    bestSeller: 'Americano Signature',
  },
  {
    id: 'RPT-240605',
    date: '2024-06-05',
    periodLabel: 'Rabu, 5 Juni 2024',
    orders: 60,
    revenue: 2050000,
    profit: 705000,
    averageTicket: 34166,
    bestSeller: 'Cappuccino Classic',
  },
  {
    id: 'RPT-240606',
    date: '2024-06-06',
    periodLabel: 'Kamis, 6 Juni 2024',
    orders: 58,
    revenue: 1995000,
    profit: 688000,
    averageTicket: 34483,
    bestSeller: 'Affogato Cream',
  },
  {
    id: 'RPT-240607',
    date: '2024-06-07',
    periodLabel: 'Jumat, 7 Juni 2024',
    orders: 74,
    revenue: 2765000,
    profit: 995000,
    averageTicket: 37364,
    bestSeller: 'Cold Brew Citrus',
  },
  {
    id: 'RPT-240608',
    date: '2024-06-08',
    periodLabel: 'Sabtu, 8 Juni 2024',
    orders: 80,
    revenue: 2850000,
    profit: 1020000,
    averageTicket: 35625,
    bestSeller: 'Mocha Almond',
  },
  {
    id: 'RPT-240609',
    date: '2024-06-09',
    periodLabel: 'Minggu, 9 Juni 2024',
    orders: 82,
    revenue: 2920000,
    profit: 1045000,
    averageTicket: 35609,
    bestSeller: 'Matcha Latte',
  },
  {
    id: 'RPT-240610',
    date: '2024-06-10',
    periodLabel: 'Senin, 10 Juni 2024',
    orders: 50,
    revenue: 1780000,
    profit: 605000,
    averageTicket: 35600,
    bestSeller: 'Long Black',
  },
];

const reportTypes = [
  { value: 'sales', label: 'Ringkasan Penjualan' },
  { value: 'profit', label: 'Laba & Margin' },
  { value: 'inventory', label: 'Kebutuhan Inventori' },
  { value: 'cashier', label: 'Performa Kasir' },
];

const groupingOptions: { value: ReportGrouping; label: string }[] = [
  { value: 'daily', label: 'Per Hari' },
  { value: 'weekly', label: 'Per Minggu' },
  { value: 'monthly', label: 'Per Bulan' },
];

const monthFormatter = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
  year: 'numeric',
});

const longDateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const getStartOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day + 6) % 7;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

const getEndOfWeek = (start: Date) => {
  const result = new Date(start);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);
  return result;
};

const formatWeekRange = (date: Date) => {
  const start = getStartOfWeek(date);
  const end = getEndOfWeek(start);
  return `${longDateFormatter.format(start)} - ${longDateFormatter.format(end)}`;
};

const formatDateLabel = (value: string | null) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const ManagementReport = () => {
  const [startDate, setStartDate] = useState('2024-06-01');
  const [endDate, setEndDate] = useState('2024-06-10');
  const [selectedReport, setSelectedReport] = useState<string>('sales');
  const [grouping, setGrouping] = useState<ReportGrouping>('daily');
  const { addToast } = useToast();

  const filteredRecords = useMemo(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return mockReportData.filter(record => {
      const current = new Date(record.date);
      if (start && current < start) return false;
      if (end && current > end) return false;
      return true;
    });
  }, [startDate, endDate]);

  const groupedRecords = useMemo(() => {
    if (grouping === 'daily') return filteredRecords;

    const map = new Map<
      string,
      {
        startDate: Date;
        endDate: Date;
        label: string;
        orders: number;
        revenue: number;
        profit: number;
        averageTicketTotal: number;
        count: number;
        bestSeller: { name: string; revenue: number };
      }
    >();

    filteredRecords.forEach(record => {
      const recordDate = new Date(record.date);
      let key: string;
      let label: string;

      if (grouping === 'monthly') {
        key = `${recordDate.getFullYear()}-${recordDate.getMonth()}`;
        label = monthFormatter.format(recordDate);
      } else {
        const weekStart = getStartOfWeek(recordDate);
        key = weekStart.toISOString();
        label = formatWeekRange(recordDate);
      }

      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          startDate: recordDate,
          endDate: recordDate,
          label,
          orders: record.orders,
          revenue: record.revenue,
          profit: record.profit,
          averageTicketTotal: record.averageTicket,
          count: 1,
          bestSeller: { name: record.bestSeller, revenue: record.revenue },
        });
        return;
      }

      existing.orders += record.orders;
      existing.revenue += record.revenue;
      existing.profit += record.profit;
      existing.averageTicketTotal += record.averageTicket;
      existing.count += 1;
      if (record.revenue > existing.bestSeller.revenue) {
        existing.bestSeller = {
          name: record.bestSeller,
          revenue: record.revenue,
        };
      }
      if (recordDate < existing.startDate) {
        existing.startDate = recordDate;
      }
      if (recordDate > existing.endDate) {
        existing.endDate = recordDate;
      }
      if (grouping === 'weekly') {
        const weekStart = getStartOfWeek(existing.startDate);
        existing.label = `${longDateFormatter.format(weekStart)} - ${longDateFormatter.format(getEndOfWeek(weekStart))}`;
      } else {
        existing.label = monthFormatter.format(existing.startDate);
      }
    });

    return Array.from(map.values())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .map((entry, index) => ({
        id: `${grouping}-${index}`,
        date: entry.startDate.toISOString(),
        periodLabel: entry.label,
        orders: entry.orders,
        revenue: entry.revenue,
        profit: entry.profit,
        averageTicket:
          entry.count > 0
            ? Math.round(entry.averageTicketTotal / entry.count)
            : 0,
        bestSeller: entry.bestSeller.name,
      }));
  }, [filteredRecords, grouping]);

  const summary = useMemo(() => {
    if (groupedRecords.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        totalProfit: 0,
        averageTicket: 0,
      };
    }

    const totalRevenue = groupedRecords.reduce(
      (acc, record) => acc + record.revenue,
      0
    );
    const totalOrders = groupedRecords.reduce(
      (acc, record) => acc + record.orders,
      0
    );
    const totalProfit = groupedRecords.reduce(
      (acc, record) => acc + record.profit,
      0
    );

    return {
      totalRevenue,
      totalOrders,
      totalProfit,
      averageTicket:
        totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0,
    };
  }, [groupedRecords]);

  const handleResetFilters = () => {
    setStartDate('2024-06-01');
    setEndDate('2024-06-10');
    setSelectedReport('sales');
    setGrouping('daily');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      addToast('Menyiapkan tampilan cetak laporan...', 'info', 2500);
      window.print();
    }
  };

  const handleDownload = (format: 'pdf' | 'excel') => {
    const label = format === 'pdf' ? 'PDF' : 'Excel';
    addToast(`Mengunduh laporan dalam format ${label}...`, 'info', 2500);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border-2 border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fdf8f3] to-[#f5ede2] p-8 shadow-lg">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${COLOR.BG_ICON} shadow-md`}
            >
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl ${COLOR.TEXT_PRIMARY}`}>
                Cetak & Unduh Laporan
              </h2>
              <p className={`text-sm ${COLOR.TEXT_SECONDARY}`}>
                Tentukan rentang tanggal dan jenis laporan sebelum mencetak.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={handlePrint}
              className={`h-11 ${COLOR.BUTTON_HOVER_ICON}`}
            >
              <Printer className={`mr-2 h-5 w-5 ${COLOR.ICON_TRANSITION}`} />
              Cetak Laporan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDownload('pdf')}
              className="h-11 rounded-lg border-2 border-[#e6d9c9]/60 bg-white/80 px-4 font-semibold text-[#6f4e37] transition-all duration-300 hover:border-[#6f4e37] hover:bg-[#6f4e37]/10 hover:shadow-md"
            >
              <FileDown className="mr-2 h-5 w-5" />
              Unduh PDF
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDownload('excel')}
              className="h-11 rounded-lg border-2 border-[#e6d9c9]/60 bg-white/80 px-4 font-semibold text-[#6f4e37] transition-all duration-300 hover:border-[#6f4e37] hover:bg-[#6f4e37]/10 hover:shadow-md"
            >
              <Save className="mr-2 h-5 w-5" />
              Ekspor Excel
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="space-y-2 lg:col-span-1">
            <Label
              htmlFor="reportType"
              className={`text-sm font-semibold ${COLOR.TEXT_PRIMARY}`}
            >
              Jenis Laporan
            </Label>
            <Select
              value={selectedReport}
              onValueChange={value => setSelectedReport(value)}
            >
              <SelectTrigger
                id="reportType"
                className="h-12 rounded-xl border-2 border-[#e6d9c9]/60 bg-white/80 px-4 text-[#6f4e37] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30"
              >
                <SelectValue placeholder="Pilih jenis laporan" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#e6d9c9]/50 bg-white shadow-lg">
                {reportTypes.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 lg:col-span-1">
            <Label
              htmlFor="grouping"
              className={`text-sm font-semibold ${COLOR.TEXT_PRIMARY}`}
            >
              Periode
            </Label>
            <Select
              value={grouping}
              onValueChange={value => setGrouping(value as ReportGrouping)}
            >
              <SelectTrigger
                id="grouping"
                className="h-12 rounded-xl border-2 border-[#e6d9c9]/60 bg-white/80 px-4 text-[#6f4e37] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30"
              >
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-[#e6d9c9]/50 bg-white shadow-lg">
                {groupingOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 lg:col-span-1">
            <Label
              htmlFor="startDate"
              className={`text-sm font-semibold ${COLOR.TEXT_PRIMARY}`}
            >
              Tanggal Mulai
            </Label>
            <div className="relative">
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
                className="h-12 rounded-xl border-2 border-[#e6d9c9]/60 bg-white/80 pr-4 pl-12 text-[#6f4e37] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30"
              />
              <Calendar className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
            </div>
          </div>

          <div className="space-y-2 lg:col-span-1">
            <Label
              htmlFor="endDate"
              className={`text-sm font-semibold ${COLOR.TEXT_PRIMARY}`}
            >
              Tanggal Akhir
            </Label>
            <div className="relative">
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={event => setEndDate(event.target.value)}
                className="h-12 rounded-xl border-2 border-[#e6d9c9]/60 bg-white/80 pr-4 pl-12 text-[#6f4e37] transition-all duration-200 focus:border-[#6f4e37] focus:ring-[#6f4e37]/30"
              />
              <Calendar className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#8c7158]" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[#8c7158]">
            Menampilkan laporan{' '}
            <span className="font-semibold text-[#6f4e37]">
              {groupingOptions.find(option => option.value === grouping)?.label}
            </span>{' '}
            untuk periode{' '}
            <span className="font-semibold text-[#6f4e37]">
              {formatDateLabel(startDate)}
            </span>{' '}
            hingga{' '}
            <span className="font-semibold text-[#6f4e37]">
              {formatDateLabel(endDate)}
            </span>
            .
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={handleResetFilters}
              variant="outline"
              className="h-10 rounded-lg border-2 border-[#e6d9c9]/70 bg-white/80 px-4 text-sm font-semibold text-[#6f4e37] transition-all duration-300 hover:border-[#6f4e37] hover:bg-[#6f4e37]/10"
            >
              Reset Filter
            </Button>
            <Button
              type="button"
              className="h-10 rounded-lg bg-gradient-to-r from-[#6f4e37] to-[#8b5e3c] px-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-[#5d4130] hover:to-[#7a5033] hover:shadow-lg"
            >
              <Filter className="mr-2 h-4 w-4" />
              Terapkan Filter
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Total Penjualan',
            value: formatCurrency(summary.totalRevenue),
            description: `${summary.totalOrders} transaksi selama periode terpilih`,
            icon: DollarSign,
          },
          {
            title: 'Total Laba',
            value: formatCurrency(summary.totalProfit),
            description: 'Estimasi laba kotor berdasarkan penjualan bersih',
            icon: TrendingUp,
          },
          {
            title: 'Rata-rata Nilai Order',
            value: formatCurrency(summary.averageTicket),
            description: 'Nilai transaksi rata-rata per struk',
            icon: ShoppingBasket,
          },
        ].map(card => (
          <div
            key={card.title}
            className="group rounded-3xl border-2 border-[#e6d9c9]/60 bg-gradient-to-br from-white via-[#fdf8f3] to-[#f4ece2] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm tracking-wide uppercase ${COLOR.TEXT_SECONDARY}`}
                >
                  {card.title}
                </p>
                <p className="mt-2 text-2xl font-bold text-[#6f4e37]">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-[#8c7158]">
                  {card.description}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${COLOR.BG_ICON} shadow-md transition-transform duration-300 group-hover:scale-105`}
              >
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border-2 border-[#e6d9c9]/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className={`text-xl ${COLOR.TEXT_PRIMARY}`}>
              Pratinjau Laporan
            </h3>
            <p className={`text-sm ${COLOR.TEXT_SECONDARY}`}>
              Rincian data yang akan disertakan saat mencetak atau mengunduh.
            </p>
          </div>
          <div className="rounded-full bg-[#f2e6d8] px-4 py-1 text-sm font-semibold text-[#6f4e37]">
            {groupedRecords.length} periode ditemukan
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e6d9c9]/60">
          <table className="min-w-full divide-y divide-[#e6d9c9]/70">
            <thead className="bg-[#f7f1e8] text-left text-sm font-semibold text-[#6f4e37]">
              <tr>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4">Jumlah Transaksi</th>
                <th className="px-6 py-4">Total Penjualan</th>
                <th className="px-6 py-4">Estimasi Laba</th>
                <th className="px-6 py-4">Rata-rata Order</th>
                <th className="px-6 py-4">Menu Terlaris</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm text-[#6f4e37]">
              {groupedRecords.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-[#8c7158]"
                  >
                    Tidak ada data laporan untuk rentang tanggal yang dipilih.
                  </td>
                </tr>
              ) : (
                groupedRecords.map(record => (
                  <tr
                    key={record.id}
                    className="border-b border-[#f1e5d6] transition-colors duration-150 hover:bg-[#fdf7f1]"
                  >
                    <td className="px-6 py-4 font-semibold">
                      {record.periodLabel}
                    </td>
                    <td className="px-6 py-4">{record.orders} transaksi</td>
                    <td className="px-6 py-4">
                      {formatCurrency(record.revenue)}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(record.profit)}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(record.averageTicket)}
                    </td>
                    <td className="px-6 py-4">{record.bestSeller}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#e6d9c9]/60 bg-white/70 p-5">
            <h4 className={`mb-2 text-lg ${COLOR.TEXT_PRIMARY}`}>
              Rekomendasi Tindakan
            </h4>
            <ul className="list-inside list-disc space-y-2 text-sm text-[#8c7158]">
              <li>
                Pertimbangkan promosi pada menu dengan performa di bawah
                rata-rata.
              </li>
              <li>
                Jadwalkan restock untuk menu best seller sebelum akhir minggu
                ini.
              </li>
              <li>
                Evaluasi beban kerja kasir pada hari dengan transaksi tertinggi.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e6d9c9]/60 bg-white/70 p-5">
            <h4 className={`mb-2 text-lg ${COLOR.TEXT_PRIMARY}`}>
              Catatan Otomatis
            </h4>
            <p className="text-sm text-[#8c7158]">
              Laporan{' '}
              {reportTypes
                .find(option => option.value === selectedReport)
                ?.label.toLowerCase()}{' '}
              akan dicetak lengkap dengan grafik tren dan data transaksi detail.
              Pastikan printer terhubung dan cek kembali konfigurasi format
              kertas sebelum melanjutkan proses cetak.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementReport;
