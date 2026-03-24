import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { CaretRightIcon } from "@icons/CaretRightIcon";
import { ICategory, ICategoryNavProps } from "@/types/category";
import { MobileMenuBtn } from "@buttons/MobileMenuBtn";
import { DesktopLinks } from "@/components/layout-related/site/header/blocks/DesktopLinks";
import { CloseBtn } from "@/components/shared/buttons/CloseBtn";
import { CompanyLogoBtn } from "@/components/shared/buttons/CompanyLogoBtn";
import { createPortal } from "react-dom";
import { useModal } from "@/hooks/useModal";
import { CaretLeftIcon } from "@/components/shared/icons/CaretLeftIcon";
import { ButtonBtnTrans } from "@/components/shared/buttons/ButtonBtnTrans";
import { useClickOutside } from "@/hooks/useClickOutside";

export const MobileCategoryNav = ({ categories }: ICategoryNavProps) => {
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const isClient = typeof document !== "undefined";

  const { isModalOpen, openModal, closeModal } = useModal();

  const closeAll = () => {
    closeModal();
    setActiveCategory(null);
  };

  useClickOutside(isModalOpen, (e) => {
    if (
      e.target &&
      e.target instanceof HTMLElement &&
      !e.target.closest(".mobile-nav-modal")
    ) {
      closeAll();
    }
  });

  if (!isClient) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const modalJsx = (
    <div
      className={`fixed mobile-nav-modal inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
        isModalOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* DRAWER HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-100">
        <CompanyLogoBtn onClick={closeAll} />

        <CloseBtn onClick={closeAll} className="text-neutral-400" />
      </div>

      {/* DRAWER CONTENT */}
      <div className="flex-1 overflow-hidden relative">
        {/* LEVEL 1: MAIN CATEGORIES */}
        <div
          className={`h-full overflow-y-auto py-2 transition-transform duration-300 ${activeCategory ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className="w-full flex items-center justify-between px-5 py-4 border-b border-neutral-50"
            >
              <div className="flex items-center gap-4">
                {cat.icon && <Icon icon={cat.icon} width={18} />}
                <span className="text-sm font-medium">
                  {cat.categoryDisplayName}
                </span>
              </div>

              <CaretRightIcon className="text-neutral-400/80" />
            </button>
          ))}
        </div>

        {/* LEVEL 2: SUBCATEGORIES (Slide-in) */}
        <div
          className={`absolute inset-0 bg-white z-1 py-2 transition-transform duration-300 ease-in-out ${activeCategory ? "translate-x-0" : "translate-x-full"}`}
        >
          {activeCategory && (
            <div className="flex flex-col h-full">
              {/* Back Button */}
              <ButtonBtnTrans
                onClick={() => setActiveCategory(null)}
                className="px-5 py-3 text-neutral-400/80 font-medium border-b border-neutral-100 w-full!"
              >
                <CaretLeftIcon /> Back
              </ButtonBtnTrans>

              {/* Subcategory List */}
              <div className="overflow-y-auto p-4">
                <h3 className="text-[11px] tracking-widest font-bold text-secondary uppercase mb-4 px-1">
                  {activeCategory.categoryDisplayName}
                </h3>

                {/* "View All" Link */}
                <Link
                  href={`/category/${activeCategory.categoryName}`}
                  onClick={closeAll}
                  className="block px-3 text-sm font-bold rounded-lg mb-2"
                >
                  View All Products
                </Link>

                {activeCategory.subCategories?.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${activeCategory.categoryName}/${sub.subCategoryName}`}
                    onClick={closeAll}
                    className="block text-[15px] active:bg-neutral-50 px-3 py-4 border-b border-neutral-50"
                  >
                    {sub.subCategoryDisplayName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DRAWER FOOTER (Quick Links) */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-100">
        <DesktopLinks />
      </div>
    </div>
  );

  return (
    <>
      <MobileMenuBtn
        isMenuOpen={isModalOpen}
        noToggleState={true}
        onClick={openModal}
      />

      {modalRoot && createPortal(modalJsx, modalRoot)}
    </>
  );
};
