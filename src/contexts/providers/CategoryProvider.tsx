import React, { createContext, useContext, useState } from "react";
import { Category } from "../../types/category";

interface CategroyState {
    category: Category;
    setCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategroyState | null>(null);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [category, setCategory] = useState<Category>({
        slug: "all",
        name: "All",
    });
    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategroyProvider");
    }
    return context;
}
