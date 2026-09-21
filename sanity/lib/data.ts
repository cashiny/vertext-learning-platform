import 'server-only'

import type {
  CATEGORIES_LIST_QUERY_RESULT,
  COURSE_BY_SLUG_QUERY_RESULT,
  COURSES_LIST_QUERY_RESULT,
  INSTRUCTOR_BY_SLUG_QUERY_RESULT,
  INSTRUCTORS_LIST_QUERY_RESULT,
  LESSON_BY_SLUG_QUERY_RESULT,
} from '@/sanity.types'

import { sanityFetch } from './fetch'
import {
  CATEGORIES_LIST_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSES_LIST_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  INSTRUCTORS_LIST_QUERY,
  LESSON_BY_SLUG_QUERY,
} from './queries'

export function getCourses() {
  return sanityFetch<COURSES_LIST_QUERY_RESULT>({
    query: COURSES_LIST_QUERY,
    tags: ['course'],
  })
}

export function getCourseBySlug(slug: string) {
  return sanityFetch<COURSE_BY_SLUG_QUERY_RESULT>({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`course:${slug}`, 'course', 'lesson', 'instructor', 'category'],
  })
}

export function getLessonBySlug(slug: string) {
  return sanityFetch<LESSON_BY_SLUG_QUERY_RESULT>({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
    tags: [`lesson:${slug}`, 'lesson', 'course'],
  })
}

export function getInstructors() {
  return sanityFetch<INSTRUCTORS_LIST_QUERY_RESULT>({
    query: INSTRUCTORS_LIST_QUERY,
    tags: ['instructor'],
  })
}

export function getInstructorBySlug(slug: string) {
  return sanityFetch<INSTRUCTOR_BY_SLUG_QUERY_RESULT>({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: { slug },
    tags: [`instructor:${slug}`, 'instructor', 'course'],
  })
}

export function getCategories() {
  return sanityFetch<CATEGORIES_LIST_QUERY_RESULT>({
    query: CATEGORIES_LIST_QUERY,
    tags: ['category'],
  })
}
