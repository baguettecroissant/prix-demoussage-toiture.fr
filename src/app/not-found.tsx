import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-black text-stone-300 mb-4">404</h1>
        <p className="text-stone-600 mb-6">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-cta">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
