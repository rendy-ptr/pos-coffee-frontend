import type { menuData } from '@/types/menu/menu-data';

type MenuGridProps = {
  filteredMenuItems: menuData[];
};

const MenuGrid = ({ filteredMenuItems }: MenuGridProps) => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {filteredMenuItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-[#8c7158]">
              Tidak ada menu yang ditemukan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenuItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-[#e6d9c9] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-[#f8f3e9] px-2 py-1 text-xs font-medium text-[#a67c52]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#6f4e37]">
                    {item.name}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-[#8c7158]">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#6f4e37]">
                      {item.price}
                    </span>
                    <span className="rounded-full bg-[#f8f3e9] px-3 py-1 text-sm text-[#8c7158]">
                      Tersedia di kedai
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;
