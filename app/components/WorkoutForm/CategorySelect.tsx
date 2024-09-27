import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import Input from "../Basic/Input";
import { Category } from "@/app/types";

export default function CategorySelect() {
  const { category, setCategory } = useWorkoutStore();
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <h4>Choose the category</h4>
      <div className="flex items-center overflow-auto scrollbar-none gap-4">
        {categories.map(({ name, id }) => (
          <Input key={id} type="radio" name="category" value={name} label={name} onChange={handleCategoryChange}/>
        ))}
        <button className="flex items-center justify-center border border-black rounded-full h-8 w-8">
          +
        </button>
      </div>
    </div>
  );
}
