import Link from "next/link";
import LoginModal from "./AuthModal";
export default function NavBar() {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          <LoginModal isSignIn={true}></LoginModal>
          <LoginModal isSignIn={false}></LoginModal>
        </div>
      </div>
    </nav>
  );
}
