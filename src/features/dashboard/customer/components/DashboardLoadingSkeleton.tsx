import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Skeleton untuk CardCustomerSection
export const CardCustomerSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn('order-1 lg:order-1 lg:col-span-1', className)}>
      <Card className="border border-[#e6d9c9] bg-white shadow-md">
        <CardHeader className="pb-4 text-center">
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r bg-[length:200%_100%] md:h-20 md:w-20" />
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto h-5 w-32 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-6 md:w-36" />
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto mt-2 h-4 w-28 rounded bg-gradient-to-r bg-[length:200%_100%]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:block md:space-y-4">
            <div className="text-center">
              <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto h-6 w-12 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-8 md:w-16" />
              <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto mt-1 h-3 w-20 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-3.5 md:w-24" />
            </div>
            <div className="text-center">
              <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto h-5 w-8 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-5 md:w-10" />
              <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mx-auto mt-1 h-3 w-24 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-3.5 md:w-28" />
            </div>
          </div>
          <div className="border-t border-[#e6d9c9] pt-4">
            <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mb-1 h-3 w-32 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-3.5 md:w-36" />
            <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-3 w-40 rounded bg-gradient-to-r bg-[length:200%_100%] md:h-3.5 md:w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Skeleton untuk MetricCard (sesuai dengan struktur MetricCardCustomer)
export const MetricCardSkeleton = () => {
  return (
    <Card className="border border-[#e6d9c9] bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mb-2 h-4 w-20 rounded bg-gradient-to-r bg-[length:200%_100%]" />
            <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mb-1 h-8 w-16 rounded bg-gradient-to-r bg-[length:200%_100%]" />
            <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-3 w-28 rounded bg-gradient-to-r bg-[length:200%_100%]" />
          </div>
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-8 w-8 rounded bg-gradient-to-r bg-[length:200%_100%]" />
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton untuk SummaryCardSection
export const SummaryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6',
        className
      )}
    >
      <MetricCardSkeleton />
      <MetricCardSkeleton />
      <MetricCardSkeleton />
    </div>
  );
};

// Skeleton untuk RecentOrderItemCustomer
export const RecentOrderItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#e6d9c9] bg-[#faf8f5] p-3">
      <div className="flex items-center space-x-3">
        <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-12 w-12 rounded-lg bg-gradient-to-r bg-[length:200%_100%]" />
        <div className="space-y-1">
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-4 w-32 rounded bg-gradient-to-r bg-[length:200%_100%]" />
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-3 w-24 rounded bg-gradient-to-r bg-[length:200%_100%]" />
          <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-3 w-20 rounded bg-gradient-to-r bg-[length:200%_100%]" />
        </div>
      </div>
      <div className="text-right">
        <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift mb-1 h-4 w-16 rounded bg-gradient-to-r bg-[length:200%_100%]" />
        <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-3 w-12 rounded bg-gradient-to-r bg-[length:200%_100%]" />
      </div>
    </div>
  );
};

// Skeleton untuk OverviewCardContentSection (menggunakan CARD_STYLES yang sama)
export const OverviewCardContentSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Card
      className={cn('border border-[#e6d9c9] bg-white shadow-md', className)}
    >
      <CardHeader>
        <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-6 w-32 rounded bg-gradient-to-r bg-[length:200%_100%]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3 md:space-y-4">
          <RecentOrderItemSkeleton />
          <RecentOrderItemSkeleton />
          <RecentOrderItemSkeleton />
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton untuk TabListSection (struktur persis sama)
export const TabListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'mb-4 grid h-auto w-full grid-cols-4 gap-1 rounded-xl bg-[#eaddd0] p-1',
        className
      )}
    >
      <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-9 rounded-lg bg-gradient-to-r bg-[length:200%_100%]" />
      <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-9 rounded-lg bg-gradient-to-r bg-[length:200%_100%]" />
      <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-9 rounded-lg bg-gradient-to-r bg-[length:200%_100%]" />
      <div className="from-muted via-muted-foreground/20 to-muted animate-gradient-shift h-9 rounded-lg bg-gradient-to-r bg-[length:200%_100%]" />
    </div>
  );
};

// Skeleton gabungan untuk seluruh halaman customer (layout yang tepat)
export const DashboardLoadingSkeleton = () => {
  return (
    <div className="container mx-auto space-y-6 p-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Customer card and Tab skeleton */}
        <div className="order-1 space-y-6 lg:order-1 lg:col-span-1">
          <CardCustomerSkeleton className="order-1" />
          <TabListSkeleton className="order-2" />
        </div>

        {/* Right column - Summary dan overview */}
        <div className="order-2 space-y-6 lg:order-2 lg:col-span-2">
          {/* Summary cards skeleton */}
          <SummaryCardSkeleton />

          {/* Overview content skeleton */}
          <OverviewCardContentSkeleton />
        </div>
      </div>
    </div>
  );
};
