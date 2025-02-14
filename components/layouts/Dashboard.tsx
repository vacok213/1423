"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";
import { VariantProps } from "@heroui/theme";
import { useSession } from "next-auth/react";

type TDashboardProps = {
  children: React.ReactNode;
};

export default function Dashboard({ children }: TDashboardProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = session?.user.role === "ADMIN";
  const isManager = session?.user.role === "MANAGER";

  const tabs: Array<VariantProps<typeof Tab>> = [
    {
      key: "/products",
      id: "/products",
      title: "Продукты",
      href: "/products",
      as: Link,
      isDisabled: !isAdmin,
    },
    {
      key: "/materials",
      id: "/materials",
      title: "Материалы",
      href: "/materials",
      as: Link,
      isDisabled: !isAdmin,
    },
    {
      key: "/product-materials",
      id: "/product-materials",
      title: "Состав продукта",
      href: "/product-materials",
      as: Link,
      isDisabled: !isAdmin,
    },
    {
      key: "/production-orders",
      id: "/production-orders",
      title: "Производственные заказы",
      href: "/production-orders",
      as: Link,
      isDisabled: !isAdmin && !isManager,
    },
  ];

  return (
    <section className="space-y-4 relative">
      <Card className="sticky top-20 z-20" isBlurred>
        <CardBody>
          <Tabs selectedKey={pathname} aria-label="Tabs">
            {tabs.map(({ key, ...tab }) => (
              <Tab key={key} {...tab} />
            ))}
          </Tabs>
        </CardBody>
      </Card>
      {children}
    </section>
  );
}
