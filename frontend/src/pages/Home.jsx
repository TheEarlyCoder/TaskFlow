
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: "✓",
      title: "Manage Tasks",
      description:
        "Create, organize, and manage all your daily tasks in one place.",
    },
    {
      icon: "◷",
      title: "Track Progress",
      description:
        "Keep track of completed and pending tasks and stay on schedule.",
    },
    {
      icon: "↗",
      title: "Stay Productive",
      description:
        "Build better habits, stay focused, and accomplish more every day.",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero section */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[70px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Your day, organized.
          </span>

          <h1 className="mt-8 text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            Turn your plans
            <br />
            into{" "}
            <span className="text-orange-500">
              accomplishments.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
            Organize your tasks, track your progress, and
            make every day count with a simpler way to
            manage your to-do list.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-xl bg-orange-500 px-8 py-3.5 font-semibold text-white transition hover:bg-orange-400"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-neutral-700 px-8 py-3.5 font-semibold text-neutral-200 transition hover:border-orange-500 hover:text-orange-400"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-sm text-neutral-500">
            Simple tasks. Clear priorities. Better days.
          </p>
        </div>
      </section>

      {/* Features section */}
      <section className="border-t border-neutral-800/80 px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Make productivity simple.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              All your tasks, your progress, and your goals
              in one organized workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-neutral-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl font-bold text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom call to action */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-neutral-900 p-8 text-center sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to get things done?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            Start organizing your day and take control of
            your to-do list.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-flex rounded-xl bg-orange-500 px-8 py-3.5 font-semibold text-white transition hover:bg-orange-400"
          >
            Create Your Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-5 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Todo Manager. Stay
        organized, stay productive.
      </footer>
    </main>
  );
};

export default Home;