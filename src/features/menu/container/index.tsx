import { useState, useEffect } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { FOOTER_LINKS } from '@/constants/footerLinks';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

interface Category {
  id: string;
  name: string;
}

export interface Menu {
  id: string;
  imageUrl: string;
  name: string;
  categoryId: string;
  stock: number;
  productionCapital: number;
  sellingPrice: number;
  profit: number;
  soldCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  category: Category;
}

// contoh dummy data
const menuItems: Menu[] = [
  {
    id: '1',
    name: 'Espresso Signature',
    imageUrl:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop',
    categoryId: 'kopi',
    stock: 10,
    productionCapital: 15000,
    sellingPrice: 25000,
    profit: 10000,
    soldCount: 120,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
    createdById: 'user1',
    category: { id: 'kopi', name: 'Kopi' },
  },
  {
    id: '2',
    name: 'Croissant Butter',
    imageUrl:
      'https://images.unsplash.com/photo-1555507036-ab794f4card9e?w=400&h=400&fit=crop',
    categoryId: 'makanan',
    stock: 0,
    productionCapital: 12000,
    sellingPrice: 22000,
    profit: 10000,
    soldCount: 80,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
    createdById: 'user1',
    category: { id: 'makanan', name: 'Makanan' },
  },
  {
    id: '3',
    name: 'Cappuccino Premium',
    imageUrl:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
    categoryId: 'kopi',
    stock: 15,
    productionCapital: 18000,
    sellingPrice: 30000,
    profit: 12000,
    soldCount: 95,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
    createdById: 'user1',
    category: { id: 'kopi', name: 'Kopi' },
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    categoryId: 'dessert',
    stock: 8,
    productionCapital: 20000,
    sellingPrice: 35000,
    profit: 15000,
    soldCount: 45,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
    createdById: 'user1',
    category: { id: 'dessert', name: 'Dessert' },
  },
];

const categories = [
  { id: 'semua', label: 'Semua' },
  { id: 'kopi', label: 'Kopi' },
  { id: 'non-kopi', label: 'Non-Kopi' },
  { id: 'makanan', label: 'Makanan' },
  { id: 'dessert', label: 'Dessert' },
];

const UserMenuUI = () => {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // filter hanya menu aktif
  const activeMenu = menuItems.filter(item => item.isActive);

  const filteredMenuItems = activeMenu.filter(item => {
    const matchesCategory =
      selectedCategory === 'semua' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] to-[#f5f0e8]">
      <Navbar variant="subpage" />

      {/* Search & Filter dengan light variant */}
      <section className="border-b border-[#e6d9c9] bg-[#f8f3e9] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-[#6f4e37]" />
            </div>
            <input
              type="text"
              placeholder="Cari menu favorit Anda..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#e6d9c9] bg-white py-4 pr-4 pl-12 text-[#6f4e37] shadow-sm transition-all duration-300 placeholder:text-[#8c7158] focus:border-[#d4c3b0] focus:ring-2 focus:ring-[#e6d9c9]/60"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative overflow-hidden rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#6f4e37] text-white shadow-md'
                    : 'border-2 border-[#d4c3b0] bg-white text-[#6f4e37] hover:bg-[#e6d9c9]/60'
                }`}
              >
                <span className="relative z-10">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid dengan card premium */}
      <section className="bg-[#e6d9c9] py-12">
        <div className="mx-auto max-w-7xl px-6">
          {filteredMenuItems.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#f8f3e9] to-[#d4c3b0] shadow-lg">
                <Search className="h-12 w-12 text-[#8c7158]" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#6f4e37]">
                Menu tidak ditemukan
              </h3>
              <p className="text-lg text-[#8c7158]">
                Coba kata kunci atau kategori lain untuk menemukan menu favorit
                Anda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMenuItems.map(item => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-3xl border border-[#d4c3b0] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#6f4e37]/20"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-block rounded-full bg-gradient-to-r from-[#f8f3e9] to-[#e6d9c9] px-4 py-2 text-sm font-semibold text-[#6f4e37] shadow-sm">
                        {item.category.name}
                      </span>
                      {item.soldCount > 0 && (
                        <div className="flex items-center gap-1 text-xs text-[#8c7158]">
                          <TrendingUp className="h-3 w-3" />
                          <span>Terjual {item.soldCount}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="mb-4 text-xl font-bold text-[#6f4e37] transition-colors group-hover:text-[#5d4130]">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-[#6f4e37]">
                          Rp {item.sellingPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div
                        className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm ${
                          item.stock > 0
                            ? 'border border-green-200 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                            : 'border border-red-200 bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                        }`}
                      >
                        {item.stock > 0 ? (
                          <span className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            Tersedia
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            Habis
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer variant="light" links={FOOTER_LINKS} />
    </div>
  );
};

export default UserMenuUI;
