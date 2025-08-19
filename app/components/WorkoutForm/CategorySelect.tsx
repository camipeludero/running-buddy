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
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-xl font-semibold text-dark-100">Choose the category</h4>
        <p className="text-dark-400 text-sm">Select a category that best describes your workout</p>
      </div>
      <div className="flex items-center overflow-x-auto scrollbar-thin gap-4 pb-2">
        {categories.map(({ name, id }) => (
          <Input key={id} type="radio" name="category" value={name} label={name} onChange={handleCategoryChange}/>
        ))}
        <button className="flex items-center justify-center border-2 border-dashed border-accent-primary/50 hover:border-accent-primary rounded-xl h-12 w-12 text-accent-primary hover:bg-accent-primary/10 transition-all duration-200 transform hover:scale-105 active:scale-95 flex-shrink-0">
          <span className="text-xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
}
