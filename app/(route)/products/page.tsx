import ProductsContent from "@/components/products/ProductsContent";
import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';

const ProductsPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div>
      <ProductsContent email={user.email} />
    </div>
  );
};

export default ProductsPage;
