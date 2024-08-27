import Link from "next/link";

export default async function Home() {
  return (
    <main className="container">
      <h1 className="text-7xl font-bold text-center mt-10">
        Welcome to the LRWC Forum
      </h1>
      <span className="divider divider-primary my-16" />

      <h2 className="text-3xl text-center mb-16">
        This is a private message board for members of the Love, Rage and Wisdom
        Crew
      </h2>
      <h2 className="text-3xl text-center mb-20">
        Members can sign in{" "}
        <Link href={"/sign-in"} className="link link-primary">
          here
        </Link>
      </h2>
    </main>
  );
}
