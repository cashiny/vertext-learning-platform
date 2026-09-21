import { StackIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const module_ = defineType({
  name: "module",
  title: "Module",
  type: "object",
  icon: StackIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "lesson" }] })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", lessons: "lessons" },
    prepare({ title, lessons }) {
      const count = Array.isArray(lessons) ? lessons.length : 0;
      return { title, subtitle: `${count} lesson${count === 1 ? "" : "s"}` };
    },
  },
});
