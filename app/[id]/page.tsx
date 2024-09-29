import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../types/supabase"

import Running from "../components/Running";
const page = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      *,
      sets (
        *,
        steps (
          *
        )
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("Error fetching workout data:", error);
    return <div>Error loading workout</div>;
  }

  const workout = data;
  console.log('workout...........', workout)

  return (
    <div>
      <Running workout={workout} />
    </div>
  );
};

export default page;
