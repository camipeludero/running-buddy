import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold text-red-400">404</h1>
        <h2 className="text-xl font-semibold text-dark-100">Workout Not Found</h2>
        <p className="text-dark-400">
          The requested workout could not be found. It may have been removed or the URL is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="button-primary">
            Browse Workouts
          </Link>
          <Link href="/new" className="button-secondary">
            Create New Workout
          </Link>
        </div>
      </div>
    </div>
  );
}