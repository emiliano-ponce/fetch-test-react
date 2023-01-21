const baseURL = 'https://frontend-take-home.fetchrewards.com/form'

export type OptionsResponse = {
  occupations: string[]
  states: State[]
}
interface State {
  name: string
  abbreviation: string
}

const getOptions = async (): Promise<OptionsResponse> => {
  const res = await fetch(baseURL)
  return await res.json()
}

const createUser = async (values: any) => {
  const res = await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.ok) return res
  else {
    console.error(res)
    throw new Error()
  }
}

export const formService = { getOptions, createUser }
