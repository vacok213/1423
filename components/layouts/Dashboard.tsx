"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";
import { VariantProps } from "@heroui/theme";

type TDashboardProps = {
  children: React.ReactNode;
};

export default function Dashboard({ children }: TDashboardProps) {
  const pathname = usePathname();

  const tabs: Array<VariantProps<typeof Tab>> = [
    {
      key: "/products",
      id: "/products",
      title: "Продукты",
      href: "/products",
      as: Link,
    },
    {
      key: "/materials",
      id: "/materials",
      title: "Материалы",
      href: "/materials",
      as: Link,
    },
    {
      key: "/product-materials",
      id: "/product-materials",
      title: "Состав продукта",
      href: "/product-materials",
      as: Link,
    },
    {
      key: "/production-orders",
      id: "/production-orders",
      title: "Производственные заказы",
      href: "/production-orders",
      as: Link,
    },
  ];

  return (
    <section className="space-y-4 relative">
      <div className="sticky top-20 z-20">
        <Card isBlurred>
          <CardBody>
            <Tabs selectedKey={pathname} aria-label="Tabs">
              {tabs.map(({ key, ...tab }) => (
                <Tab key={key} {...tab} />
              ))}
            </Tabs>
          </CardBody>
        </Card>
      </div>
      {children}
    </section>
  );
}
