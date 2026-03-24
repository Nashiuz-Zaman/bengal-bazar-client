"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { HamburgerIcon } from "@icons/HamburgerIcon";
import { CaretRightIcon } from "@icons/CaretRightIcon";
import { ICategory, ICategoryNavProps } from "@/types/category";

export const DesktopCategoryNav = ({ categories }: ICategoryNavProps) => {
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
      <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-50 group-hover:bg-neutral-100 transition-colors duration-200">
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
                    flex items-center justify-between px-4 py-4 transition-all duration-300
                    ${
                      activeCategory?.id === cat.id
                        ? "bg-white text-primary pl-6"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {cat.icon && (
                      <Icon
                        icon={cat.icon}
                        width={20}
                        className={`transition-colors`}
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
                          ? ""
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
                <h3 className="text-xs tracking-wider font-bold text-secondary uppercase mb-4 flex items-center gap-2">
                  <span className="w-4 h-0.5 block bg-tertiary rounded-full"></span>
                  {activeCategory.categoryDisplayName}
                </h3>
                <div className="flex flex-col gap-1">
                  {activeCategory.subCategories?.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/category/${activeCategory.categoryName}/${sub.subCategoryName}`}
                      className="text-sm hover:bg-primary/85 hover:text-white px-3 py-2 rounded-lg transition-all duration-300"
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
