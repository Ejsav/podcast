import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">№ 404</div>
      <h1 className="display mt-5 text-[clamp(3rem,8vw,6rem)] text-balance">
        That page is not <em className="serif-italic text-accent">famous</em> yet.
      </h1>
      <p className="mt-6 max-w-md text-ink-muted">
        Maybe it&rsquo;s underground. Maybe it&rsquo;s gone. Either way, here&rsquo;s a way back.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to the show →
      </Link>
    </div>
  );
}
