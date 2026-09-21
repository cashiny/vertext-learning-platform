import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, readToken } from '../env'

// Server-only: reads the private dataset with a read token. Never import
// this from a "use client" component.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: readToken,
  useCdn: false,
  perspective: 'published',
})
