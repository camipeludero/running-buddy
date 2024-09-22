import WorkoutForm from "../components/WorkoutForm/WorkoutForm";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

export default async function Page() {
 
  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto px-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <FaChevronLeft />
        </Link>
        <h2>Create your own</h2>
      </div>

      <WorkoutForm  />
    </div>
  );
}
