import { Card, CardContent } from '@/components/ui/card';
import type { BaseCategory } from '../../../types/category';
import ManagementCategoryItem from './ManagementCategoryItem';
import CategoryEmptyState from '../molecules/CategoryEmptyState';

interface CategoryListProps {
  categories: BaseCategory[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <Card className="relative overflow-hidden rounded-xl border border-[#e6d9c9]/50 bg-gradient-to-br from-white via-[#fefefe] to-[#faf9f7] shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4 md:space-y-6">
          {categories.length > 0 ? (
            categories.map(category => (
              <ManagementCategoryItem
                key={category.id}
                categoryItem={category}
              />
            ))
          ) : (
            <CategoryEmptyState />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
