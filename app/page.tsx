import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/app/components/ui/Navbar";
import { Button } from "@/app/components/ui/Button";
import { SearchInput } from "@/app/components/ui/Input";
import { CourseCard } from "@/app/components/ui/CourseCard";
import { textStyles } from "@/app/components/ui/typography";

const courses = [
  {
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    moduleCount: 12,
    iconBgClassName: "bg-neutral-900 text-white",
    icon: (
      <span className="font-sans text-sm font-bold" aria-hidden="true">
        N
      </span>
    ),
  },
  {
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    moduleCount: 8,
    iconBgClassName: "border border-neutral-200 bg-white",
    icon: (
      <span className="text-lg" aria-hidden="true">
        🐳
      </span>
    ),
  },
  {
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    moduleCount: 10,
    iconBgClassName: "bg-blue-600 text-white",
    icon: (
      <span className="font-sans text-sm font-bold" aria-hidden="true">
        TS
      </span>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <Navbar />

      <section className="flex flex-col items-center gap-8 border-b border-neutral-200 px-4 py-20 text-center sm:px-8">
        <span className="rounded-xl border border-primary-200 bg-primary-100 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-primary-500">
          Intelligent Learning
        </span>

        <h1
          className={
            textStyles.display1 + " max-w-3xl text-neutral-900"
          }
        >
          Search your learning
          <br />
          in plain English.
        </h1>

        <p className={textStyles.bodyLarge + " max-w-xl text-neutral-500"}>
          Vertex understands what you want to learn and finds the exact
          lessons across all your courses.
        </p>

        <Link href="/courses">
          <Button variant="primary" icon={<ArrowRight size={16} />}>
            Explore Courses
          </Button>
        </Link>

        <SearchInput
          placeholder="Ask anything about your learning..."
          className="w-full max-w-xl"
        />
      </section>

      <section className="flex flex-col gap-6 px-4 py-16 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className={textStyles.heading1 + " text-neutral-900"}>
            All Courses
          </h2>
          <Link href="/courses">
            <Button variant="text" icon={<ArrowRight size={16} />}>
              View all courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3 px-4 py-8 sm:px-8">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="flex items-center gap-2 whitespace-nowrap font-sans text-sm text-neutral-500">
          <Star size={16} className="text-primary-400" />
          New courses and lessons added every week.
        </span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <div
        aria-hidden="true"
        className="flex h-40 items-end justify-center gap-3 overflow-hidden px-4 pt-4"
      >
        {[
          40, 70, 55, 90, 60, 100, 45, 80, 65, 95, 50, 75,
        ].map((height, index) => (
          <div
            key={index}
            className="w-8 flex-1 max-w-10 rounded-t-sm bg-gradient-to-t from-primary-300/70 to-primary-100/0"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}
