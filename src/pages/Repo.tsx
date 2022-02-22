import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import { Repository } from './Repos'

export const Repo = () => {
  const params = useParams()
  const currentRepository = params['*'] as string

  const queryClient = useQueryClient()

  const handleChangeRepositoryDescription = async () => {
    // await queryClient.invalidateQueries(['repos'])
    const previousRepos = queryClient.getQueryData<Repository[]>('repos')

    if (previousRepos) {
      const nextRepos = previousRepos.map(repo => {
        console.log(repo.full_name === currentRepository)

        if (repo.full_name === currentRepository) {
          return { ...repo, description: 'Testando' }
        }

        return repo
      })

      console.log(nextRepos)
      queryClient.setQueryData('repos', nextRepos)
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>
        Alterar descrição do repositório
      </button>
    </div>
  )
}
