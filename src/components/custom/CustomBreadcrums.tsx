import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router";

const routeLabels: Record<string, string> = {
  '': 'Home',
  'search': 'Search',
  'admin': 'Admin',
};

const getSegmentLabel = (segment: string): string => {
  // Si existe en el diccionario, retorna la etiqueta
  if (routeLabels[segment]) return routeLabels[segment];
  // Si es un número, asumimos que es un ID dinámico
  if (!isNaN(Number(segment))) return `Hero #${segment}`;
  // Fallback: capitaliza el segmento
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export const CustomBreadcrums = () => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [
    { label: 'Home', path: '/' },
    ...segments.map((segment, index) => ({
      label: getSegmentLabel(segment),
      path: '/' + segments.slice(0, index + 1).join('/'),
    })),
  ];

  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={crumb.path} className="flex items-center gap-1.5">
              <BreadcrumbItem>
                {isLast ? (
                  // Página actual: resaltada y sin enlace
                  <BreadcrumbPage className="font-semibold text-foreground">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  // Páginas anteriores: con enlace
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Separador después de cada item excepto el último */}
              {!isLast && <BreadcrumbSeparator />}
            </span>
          )}
        )}
      </BreadcrumbList>
    </Breadcrumb>

  )
}
