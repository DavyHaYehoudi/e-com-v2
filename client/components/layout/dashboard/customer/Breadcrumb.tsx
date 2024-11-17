import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { data } from "./data/tabs";
const BreadcrumbCustomer = () => {
  const pathname = usePathname();
  // Trouver le chemin correspondant dans la structure de navigation
  const navigationNodes = flattenNavigation(data);
  const breadcrumbPath = findBreadcrumbPath(pathname, navigationNodes);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Premier élément : Accueil */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbPath ? (
          breadcrumbPath.map((node, index) => {
            const isLast = index === breadcrumbPath.length - 1;
            return (
              <React.Fragment key={node.url}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{node.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={node.url}>
                      {node.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })
        ) : (
          <BreadcrumbSeparator />
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCustomer;
// Fonction récursive pour trouver un chemin et ses parents
const findBreadcrumbPath = (url: string, nodes: any[]): any[] | null => {
  for (const node of nodes) {
    if (node.url === url) {
      return [node];
    }

    if (node.items) {
      const childPath = findBreadcrumbPath(url, node.items);
      if (childPath) {
        return [node, ...childPath];
      }
    }
  }

  return null;
};

// Récupérer tous les nœuds de navigation sous forme de tableau
const flattenNavigation = (data: any) =>
  Object.values(data).flatMap((category: any) => category);
