export default function Loading() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 py-6">
      {/* Header Skeleton */}
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-dark-700 rounded-lg animate-pulse"></div>
          <div className="w-48 h-8 sm:h-12 bg-dark-700 rounded-lg animate-pulse"></div>
        </div>
        <div className="w-64 h-6 bg-dark-700 rounded mx-auto animate-pulse"></div>
        <div className="w-96 h-4 bg-dark-700 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-dark-700 rounded animate-pulse"></div>
          <div className="w-32 h-5 bg-dark-700 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className="w-16 h-4 bg-dark-700 rounded animate-pulse"></div>
              <div className="w-full h-10 bg-dark-700 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Workouts Grid Skeleton */}
      <div className="space-y-4 sm:space-y-6">
        <div className="w-40 h-6 bg-dark-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-dark-800 border border-dark-600 rounded-xl p-4 sm:p-6 space-y-4">
              {/* Workout Name */}
              <div className="flex items-center justify-between">
                <div className="w-32 h-6 bg-dark-700 rounded animate-pulse"></div>
                <div className="w-3 h-3 bg-dark-700 rounded-full animate-pulse"></div>
              </div>

              {/* Category Badge */}
              <div className="w-20 h-6 bg-dark-700 rounded-full animate-pulse"></div>

              {/* Stats */}
              <div className="space-y-3 pt-2">
                {[1, 2, 3].map(j => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-dark-700 rounded-lg animate-pulse"></div>
                    <div className="space-y-1">
                      <div className="w-16 h-3 bg-dark-700 rounded animate-pulse"></div>
                      <div className="w-12 h-4 bg-dark-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Workout Section Skeleton */}
      <div className="bg-dark-800/50 border border-dark-600 rounded-2xl p-8 text-center space-y-6">
        <div className="space-y-2">
          <div className="w-64 h-8 bg-dark-700 rounded mx-auto animate-pulse"></div>
          <div className="w-96 h-4 bg-dark-700 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="w-48 h-12 bg-dark-700 rounded-lg mx-auto animate-pulse"></div>
      </div>
    </div>
  );
}