import {
  Truck,
  Ship,
  Plane,
  Warehouse,
  PackageCheck,
  MapPin,
  Radar,
  ShieldCheck,
  Gauge,
  Plug,
  Leaf,
  Headset,
  type LucideProps,
} from "lucide-react";

const map = {
  Truck,
  Ship,
  Plane,
  Warehouse,
  PackageCheck,
  MapPin,
  Radar,
  ShieldCheck,
  Gauge,
  Plug,
  Leaf,
  Headset,
};

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Truck;
  return <Cmp {...props} />;
}
