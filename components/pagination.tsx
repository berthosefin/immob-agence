import { Button } from "@/components/ui/button";
import { LIMIT } from "@/lib/constant";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  path: string;
  limit?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  path,
  limit = LIMIT,
}) => {
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex justify-center space-x-6 mt-4">
      <span className="flex items-center text-gray-600 text-sm">
        Page {currentPage} / {totalPages}
      </span>
      <Button
        asChild
        className={clsx(currentPage <= 1 && "pointer-events-none opacity-50")}
        variant="outline"
        size={"sm"}
      >
        <Link
          href={`${path}?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          className={clsx(currentPage <= 1 && "pointer-events-none opacity-50")}
        >
          <ArrowLeftIcon size={16} />
        </Link>
      </Button>
      <Button
        asChild
        className={clsx(
          currentPage * limit >= totalItems && "pointer-events-none opacity-50"
        )}
        size={"sm"}
        variant="outline"
      >
        <Link href={`${path}?page=${currentPage + 1}`}>
          <ArrowRightIcon size={16} />
        </Link>
      </Button>
    </div>
  );
};

export default Pagination;
