import { defineQuery } from 'next-sanity'

const COURSE_CARD_PROJECTION = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  level,
  price,
  popular,
  studentCount,
  "moduleCount": count(modules),
}`

export const COURSES_LIST_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(title asc) ${COURSE_CARD_PROJECTION}
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    whatYoullLearn,
    instructor->{ _id, name, "slug": slug.current, photo, expertise, bio },
    category->{ _id, title, "slug": slug.current },
    modules[]{
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview,
        studentCount,
        poster,
      },
    },
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources,
    "course": *[_type == "course" && references(^._id)][0]{
      _id,
      title,
      "slug": slug.current,
      modules[]{
        title,
        lessons[]->{ _id, title, "slug": slug.current },
      },
    },
  }
`)

export const INSTRUCTORS_LIST_QUERY = defineQuery(`
  *[_type == "instructor" && defined(slug.current)] | order(name asc){
    _id, name, "slug": slug.current, photo, expertise,
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id) && defined(slug.current)] ${COURSE_CARD_PROJECTION}
  }
`)

export const CATEGORIES_LIST_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc){
    _id, title, "slug": slug.current, description,
  }
`)
