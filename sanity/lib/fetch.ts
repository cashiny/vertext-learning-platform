import 'server-only'

import { client } from './client'

export async function sanityFetch<QueryResult>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, string | number | boolean>
  tags?: string[]
}): Promise<QueryResult> {
  return client.fetch<QueryResult>(query, params, {
    next: { tags },
  })
}
