import { EnvVarWarning } from "../env-var-warning";
import { AuthButton } from "../auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full flex justify-between items-center px-24 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href="/">
             <h1 className="text-2xl font-bold">DASHBOARD</h1>
            </Link>
          </div>
          <div className="flex gap-5 items-center font-semibold">
            <Link href="/products">
              Products
            </Link>
            <Link href="/users">
              Users
            </Link>
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
