
import HomeContent from '@/components/home/HomeContent';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
 const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  

  if (!user) {
    redirect("/auth/login");
  }
  return (
  <div>
    <HomeContent />
  </div>
);
}
