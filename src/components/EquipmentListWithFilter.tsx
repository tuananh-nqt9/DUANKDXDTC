"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  ArrowRight,
  Sparkles,
  Package,
  MapPin,
  Calendar,
  Phone,
  Search,
  Filter,
  CheckCircle2,
} from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  slug: string;
  model: string | null;
  manufacturer: string | null;
  origin: string | null;
  year: number | null;
  description: string | null;
  specs: string | null;
  image: string | null;
  category: string | null;
  order: number;
  featured: boolean;
  published: boolean;
}

interface EquipmentListProps {
  initialItems: EquipmentItem[];
}

export default function EquipmentListWithFilter({ initialItems }: EquipmentListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Lấy danh sách danh mục duy nhất
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialItems.forEach((item) => {
      if (item.category && item.category.trim()) {
        set.add(item.category.trim());
      }
    });
    return Array.from(set);
  }, [initialItems]);

  // Lọc theo danh mục và tìm kiếm
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchCategory =
        selectedCategory === "ALL" ||
        item.category?.trim().toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.model?.toLowerCase().includes(q) ||
        item.manufacturer?.toLowerCase().includes(q) ||
        item.origin?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [initialItems, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Bộ lọc Danh mục & Ô tìm kiếm */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs danh mục */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === "ALL"
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả ({initialItems.length})
            </button>
            {categories.map((cat) => {
              const count = initialItems.filter(
                (i) => i.category?.trim().toLowerCase() === cat.toLowerCase()
              ).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Ô tìm kiếm */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thiết bị..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Danh sách thiết bị */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Không tìm thấy thiết bị phù hợp
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
            {searchQuery
              ? `Không có kết quả nào trùng khớp với từ khóa "${searchQuery}". Vui lòng thử tìm với từ khóa khác.`
              : "Danh mục này hiện đang được cập nhật thiết bị mới."}
          </p>
          {(selectedCategory !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="btn-primary text-sm"
            >
              Xem tất cả thiết bị
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-gray-200/90 hover:border-primary-400 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
            >
              {/* Image Container */}
              <Link
                href={`/trang-thiet-bi/${item.slug}`}
                className="relative h-64 bg-gray-950 overflow-hidden flex items-center justify-center block"
              >
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt="Background blur"
                      fill
                      className="object-cover opacity-25 blur-lg scale-110"
                    />
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain relative z-10 p-3 group-hover:scale-105 transition-transform duration-700 drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                    <Wrench className="w-12 h-12 text-primary-400 mb-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-xs font-semibold text-gray-500">Phòng TN LAS-XD 795</span>
                  </div>
                )}

                {/* Badge Nổi bật */}
                {item.featured && (
                  <span className="absolute top-4 left-4 z-20 backdrop-blur-md bg-secondary-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-md border border-secondary-400/40">
                    <Sparkles className="w-3.5 h-3.5" />
                    Nổi bật
                  </span>
                )}

                {/* Category Badge */}
                {item.category && (
                  <span className="absolute bottom-4 left-4 z-20 backdrop-blur-md bg-primary-900/85 text-white text-xs px-3 py-1 rounded-lg font-medium border border-white/20">
                    {item.category}
                  </span>
                )}
              </Link>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/trang-thiet-bi/${item.slug}`}>{item.name}</Link>
                  </h3>

                  {/* Thông tin kỹ thuật tóm tắt */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {item.model && (
                      <p className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span className="truncate">
                          <strong>Model:</strong> {item.model}
                        </span>
                      </p>
                    )}
                    {item.origin && (
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span className="truncate">
                          <strong>Xuất xứ:</strong> {item.origin}
                        </span>
                      </p>
                    )}
                    {item.year && (
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span>
                          <strong>Năm sản xuất:</strong> {item.year}
                        </span>
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Buttons Action */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                  <Link
                    href={`/trang-thiet-bi/${item.slug}`}
                    className="flex-1 text-center py-2.5 px-4 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all shadow-md shadow-primary-600/20 flex items-center justify-center gap-1.5 group-hover:shadow-lg"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/lien-he"
                    className="py-2.5 px-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                    title="Liên hệ tư vấn thí nghiệm"
                  >
                    <Phone className="w-4 h-4 text-primary-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
