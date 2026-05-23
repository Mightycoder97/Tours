export default function ToursLoading() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-24 sm:pt-28">
      {/* Header skeleton */}
      <div className="bg-primary text-white py-10 sm:py-16 mb-8 sm:mb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <div className="h-10 w-64 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
