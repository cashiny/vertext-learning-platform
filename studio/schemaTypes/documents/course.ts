import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "marketing", title: "Marketing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      group: "marketing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "marketing",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "marketing",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      description: "Leave empty or 0 for a free course.",
      type: "number",
      group: "marketing",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "popular",
      title: "Popular",
      type: "boolean",
      group: "marketing",
      initialValue: false,
    }),
    defineField({
      name: "studentCount",
      title: "Student Count",
      type: "number",
      group: "marketing",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "whatYoullLearn",
      title: "What You'll Learn",
      type: "array",
      group: "marketing",
      of: [defineArrayMember({ type: "learningOutcome" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "reference",
      group: "content",
      to: [{ type: "instructor" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "module" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", level: "level" },
    prepare({ title, media, level }) {
      return { title, subtitle: level, media };
    },
  },
});
