import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  totalPages: number;
  limit?: number;
}

export const CustomPagination = ( {totalPages}: Props ) => {
  const page: number = 1;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Pagination */}
      <Button
        disabled={page === 1}
        variant="outline"
        size="sm"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {
        Array.from({length: totalPages}).map((_, index) => (
          <Button
            key={index}
            variant={ page === index + 1 ? 'default' : 'outline' }
            size="sm"
          >
          {index + 1}
        </Button>
        ))
      }

      {/* <Button variant="outline" size="sm">
        2
      </Button>

      <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}

      <Button
        disabled={page === totalPages}
        variant="outline"
        size="sm"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
