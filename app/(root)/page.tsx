import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import HomeSection from "@/components/HomeSectiom";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeSection />
      <Collections/>
      <ProductList/>
    </div>
  );
}
