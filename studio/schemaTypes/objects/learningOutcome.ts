import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const learningOutcome = defineType({
  name: "learningOutcome",
  title: "Learning Outcome",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      description: "A lucide-react icon name, e.g. \"CheckCircle\".",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
