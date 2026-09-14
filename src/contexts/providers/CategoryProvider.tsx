import React, {createContext, useContext, useEffect, useState} from "react";
import {Category} from "../../types/category";

interface CategroyState {
    category: Category;
    setCategory: (category: Category) => void;
    categoryList: Category[];
    isLoadingCategory: boolean;
    categoryError: string | null;
}

const CategoryContext = createContext<CategroyState | null>(null);

export function CategoryProvider({children}: {children: React.ReactNode}) {
    const [category, setCategory] = useState<Category>({
        slug: "all",
        name: "All",
    });

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function fetchCategory() {
            try {
                const BASE_URL = process.env.REACT_APP_SERVER_URL;
                const response = await fetch(`${BASE_URL}/api/categories`);
                const res = await response.json();

                if (!isMounted) return;

                const rawCategories =
                    res.data || (Array.isArray(res) ? res : []);
                setCategoryList(
                    rawCategories.filter(
                        (c: Category) => c && c.name && c.name.trim() !== "",
                    ),
                );
            } catch (e) {
                if (!isMounted) return;
                if (e instanceof Error) {
                    setCategoryError(e.message);
                }
                console.error("===== 카테고리 데이터 로드 실패 =====", e);
            } finally {
                if (isMounted) {
                    setIsLoadingCategory(false);
                }
            }
        }

        fetchCategory();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <CategoryContext.Provider
            value={{
                category,
                setCategory,
                categoryList,
                isLoadingCategory,
                categoryError,
            }}
        >
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
