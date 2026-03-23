"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HamburgerIcon } from "@/components/shared/icons/HamburgerIcon";
import { CaretRightIcon } from "@/components/shared/icons/CaretRightIcon";

interface ISubCategory {
  id: string;
  subCategoryName: string;
  subCategoryDisplayName: string;
  categoryId: string;
}
interface ICategory {
  id: string;
  categoryName: string;
  categoryDisplayName: string;
  icon?: string;
  subCategories?: ISubCategory[];
}
interface ICatNavProps {
  categories: ICategory[];
}

export const CategoryDropdown = ({ categories }: ICatNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);

  return (
    <div
      className="relative inline-block group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCategory(null);
      }}
    >
      {/* TRIGGER */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-50 group-hover:bg-primary-light transition-colors duration-200">
        <HamburgerIcon />
        <span className="text-sm font-semibold">All Categories</span>
      </button>

      {/* DROPDOWN */}
      <div
        className={`
          absolute top-full left-0 mt-2 w-130 bg-white border border-neutral-100 rounded-xl shadow-xl z-50
          transition-all duration-300 ease-out overflow-hidden
          ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          }
        `}
      >
        <div className="flex">
          {/* LEFT: CATEGORY LIST */}
          <div className="w-1/2 bg-neutral-50/50 border-r border-neutral-100 py-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat)}
                className="group"
              >
                <Link
                  href={`/category/${cat.categoryName}`}
                  className={`
                    flex items-center justify-between px-4 py-3 transition-all duration-200
                    ${
                      activeCategory?.id === cat.id
                        ? "bg-white text-primary shadow-sm translate-x-1"
                        : "hover:bg-primary-light/50 text-neutral-700"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon && (
                      <Icon
                        icon={cat.icon}
                        width={20}
                        className={`transition-colors ${activeCategory?.id === cat.id ? "text-secondary" : "text-neutral-400 group-hover:text-primary"}`}
                      />
                    )}
                    <span className="text-sm font-medium">
                      {cat.categoryDisplayName}
                    </span>
                  </div>
                  {cat.subCategories?.length ? (
                    <CaretRightIcon
                      className={
                        activeCategory?.id === cat.id
                          ? "text-primary"
                          : "text-neutral-300"
                      }
                    />
                  ) : null}
                </Link>
              </div>
            ))}
          </div>

          {/* RIGHT: SUBCATEGORIES */}
          <div className="w-1/2 py-5 px-6 bg-white">
            {activeCategory ? (
              <>
                <h3 className="text-[11px] tracking-wider font-bold text-secondary uppercase mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 bg-tertiary rounded-full"></span>
                  {activeCategory.categoryDisplayName}
                </h3>
                <div className="flex flex-col gap-1">
                  {activeCategory.subCategories?.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/category/${activeCategory.categoryName}/${sub.subCategoryName}`}
                      className="text-sm text-neutral-600 hover:text-primary hover:bg-primary-light px-3 py-2 rounded-lg transition-all duration-200"
                    >
                      {sub.subCategoryDisplayName}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-neutral-400 italic">
                Hover over a category to explore
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
