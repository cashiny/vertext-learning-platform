import {
  BarChart2,
  Bell,
  Bookmark,
  Clock,
  FileText,
  PlayCircle,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { SearchInput, TextInput } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { Badge } from "@/app/components/ui/Badge";
import { StatusIndicator } from "@/app/components/ui/StatusIndicator";
import { ProgressBar } from "@/app/components/ui/ProgressBar";
import { CourseCard } from "@/app/components/ui/CourseCard";
import { LessonCard } from "@/app/components/ui/LessonCard";
import { ResourceCard } from "@/app/components/ui/ResourceCard";
import { Navbar } from "@/app/components/ui/Navbar";
import { Breadcrumbs } from "@/app/components/ui/Breadcrumbs";
import { Pagination } from "@/app/components/ui/Pagination";
import { textStyles } from "@/app/components/ui/typography";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-primary-500">
        {number} &nbsp; {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-sm border border-neutral-200"
        style={{ backgroundColor: hex }}
      />
      <div className="font-sans text-xs text-neutral-500">
        <div className="font-medium text-neutral-900">{name}</div>
        <div>{hex}</div>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 bg-white p-8">
      <header className="flex flex-col gap-2">
        <h1 className={textStyles.display1 + " text-neutral-900"}>
          Vertex Design System
        </h1>
        <p className={textStyles.bodyLarge + " max-w-2xl text-neutral-500"}>
          A unified design language for the Vertex learning platform. Clean,
          modern, and focused on clarity, consistency, and intuitive learning
          experiences.
        </p>
      </header>

      <Section number="01" title="Colors">
        <div>
          <h3 className="mb-2 font-sans text-sm font-semibold text-neutral-900">
            Primary
          </h3>
          <div className="grid grid-cols-5 gap-3">
            <Swatch name="Primary 500" hex="#F97316" />
            <Swatch name="Primary 400" hex="#FB923C" />
            <Swatch name="Primary 300" hex="#FDBA74" />
            <Swatch name="Primary 200" hex="#FED7AA" />
            <Swatch name="Primary 100" hex="#FFEEE5" />
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-sans text-sm font-semibold text-neutral-900">
            Neutral
          </h3>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            <Swatch name="Neutral 900" hex="#0F172A" />
            <Swatch name="Neutral 700" hex="#33415C" />
            <Swatch name="Neutral 500" hex="#64748B" />
            <Swatch name="Neutral 300" hex="#CBD5E1" />
            <Swatch name="Neutral 200" hex="#E2E8F0" />
            <Swatch name="Neutral 100" hex="#F1F5F9" />
            <Swatch name="Neutral 50" hex="#FAFAFC" />
            <Swatch name="White" hex="#FFFFFF" />
          </div>
        </div>
      </Section>

      <Section number="02 / 03" title="Typography & Type Scale">
        <div className="flex flex-col gap-3">
          <p className={textStyles.display1 + " text-neutral-900"}>
            Display 1 &middot; Playfair Display
          </p>
          <p className={textStyles.display2 + " text-neutral-900"}>
            Display 2 &middot; Playfair Display
          </p>
          <p className={textStyles.heading1 + " text-neutral-900"}>
            Heading 1 &middot; Inter Semibold
          </p>
          <p className={textStyles.heading2 + " text-neutral-900"}>
            Heading 2 &middot; Inter Semibold
          </p>
          <p className={textStyles.heading3 + " text-neutral-900"}>
            Heading 3 &middot; Inter Medium
          </p>
          <p className={textStyles.bodyLarge + " text-neutral-900"}>
            Body Large &middot; Inter Regular
          </p>
          <p className={textStyles.body + " text-neutral-900"}>
            Body &middot; Inter Regular
          </p>
          <p className={textStyles.small + " text-neutral-500"}>
            Small &middot; Inter Regular
          </p>
        </div>
      </Section>

      <Section number="04" title="Spacing System">
        <div className="flex items-end gap-3">
          {[4, 8, 12, 16, 24, 32, 40, 48, 64].map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <div
                className="rounded-xs bg-primary-200"
                style={{ width: size, height: size }}
              />
              <span className="font-sans text-xs text-neutral-500">
                {size}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section number="05" title="Radius & Shadows">
        <div className="flex flex-wrap gap-4">
          {(
            [
              ["xs", "rounded-xs"],
              ["sm", "rounded-sm"],
              ["md", "rounded-md"],
              ["lg", "rounded-lg"],
              ["xl", "rounded-xl"],
            ] as const
          ).map(([label, className]) => (
            <div
              key={label}
              className={`flex h-16 w-16 items-center justify-center border border-neutral-200 bg-white font-sans text-xs text-neutral-500 ${className}`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {(
            [
              ["sm", "shadow-sm"],
              ["md", "shadow-md"],
              ["lg", "shadow-lg"],
              ["xl", "shadow-xl"],
            ] as const
          ).map(([label, className]) => (
            <div
              key={label}
              className={`flex h-16 w-24 items-center justify-center rounded-md bg-white font-sans text-xs text-neutral-500 ${className}`}
            >
              shadow-{label}
            </div>
          ))}
        </div>
      </Section>

      <Section number="06" title="Icons">
        <div className="flex flex-wrap gap-6 text-neutral-700">
          <Bell size={24} strokeWidth={2} />
          <Search size={24} strokeWidth={2} />
          <PlayCircle size={24} strokeWidth={2} />
          <FileText size={24} strokeWidth={2} />
          <Bookmark size={24} strokeWidth={2} />
          <BarChart2 size={24} strokeWidth={2} />
          <Clock size={24} strokeWidth={2} />
          <User size={24} strokeWidth={2} />
          <Bell size={24} fill="currentColor" />
          <Search size={24} fill="currentColor" />
        </div>
      </Section>

      <Section number="07" title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Explore Courses</Button>
          <Button variant="tertiary" icon={<PlayCircle size={16} />}>
            View Lesson
          </Button>
          <Button variant="text" icon={<PlayCircle size={16} />}>
            Watch Video
          </Button>
          <Button variant="primary" disabled>
            Get Started
          </Button>
        </div>
      </Section>

      <Section number="08" title="Inputs">
        <div className="flex flex-wrap gap-4">
          <SearchInput placeholder="Search anything..." className="w-72" />
          <Select className="w-48" defaultValue="relevant">
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
          </Select>
          <TextInput placeholder="Text input" className="w-48" />
        </div>
      </Section>

      <Section number="09" title="Badges / Tags">
        <div className="flex flex-wrap gap-3">
          <Badge variant="video">Video</Badge>
          <Badge variant="lesson">Lesson</Badge>
          <Badge variant="popular">Popular</Badge>
        </div>
      </Section>

      <Section number="10" title="Status / Indicators">
        <div className="flex flex-wrap gap-6">
          <StatusIndicator status="in-progress" />
          <StatusIndicator status="completed" />
          <StatusIndicator status="now-playing" />
          <StatusIndicator status="locked" />
        </div>
      </Section>

      <Section number="11" title="Progress Bar">
        <ProgressBar percent={35} />
      </Section>

      <Section number="12" title="Cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CourseCard
            icon={<span className="font-display font-bold">N</span>}
            title="Next.js for Production"
            description="Build scalable, high-performance web applications with Next.js."
            level="Intermediate"
            duration="18h 24m"
            moduleCount={12}
          />
          <LessonCard
            variant="video"
            title="Data Fetching in Server Components"
            description="Learn how to fetch data on the server using async/await and Next.js best practices."
            lessonLabel="Lesson 5.1"
            timestamp="12:45"
          />
          <LessonCard
            variant="lesson"
            title="Data Fetching & Caching"
            description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
            moduleLabel="Module 5"
          />
          <ResourceCard
            title="Caching and Revalidation Guide"
            description="Deep dive into Next.js caching strategies."
            fileType="PDF"
            fileSize="1.2 MB"
          />
        </div>
      </Section>

      <Section number="13" title="Navigation">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-md border border-neutral-200">
            <Navbar />
          </div>
          <Breadcrumbs
            items={[
              { label: "All Courses", href: "/courses" },
              { label: "Next.js for Production", href: "/courses/nextjs" },
              { label: "Data Fetching & Caching" },
            ]}
          />
          <Pagination currentPage={1} totalPages={8} />
        </div>
      </Section>

      <Section number="14" title="Principles">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm font-semibold text-neutral-900">
              Clarity First
            </h3>
            <p className="font-sans text-xs text-neutral-500">
              Every element should communicate clearly.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm font-semibold text-neutral-900">
              Consistency
            </h3>
            <p className="font-sans text-xs text-neutral-500">
              Use components and patterns consistently across the platform.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm font-semibold text-neutral-900">
              Focus &amp; Calm
            </h3>
            <p className="font-sans text-xs text-neutral-500">
              Remove noise and help learners focus on what matters.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-sm font-semibold text-neutral-900">
              Accessible
            </h3>
            <p className="font-sans text-xs text-neutral-500">
              Design with accessibility and inclusivity in mind.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
