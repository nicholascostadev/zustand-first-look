import './App.css'
import { useFetchRepos } from './queries/repo'
import { Card } from './components/Card'
import useFavoriteRepoStore from './store/useFavoriteRepos'
import { useCallback } from 'react'

function App() {
  const { data } = useFetchRepos('nicholascostadev')

  const favoriteRepoIds = useFavoriteRepoStore((state) => state.favoriteRepoIds)
  const addToFavorites = useFavoriteRepoStore((state) => state.addToFavorites)
  const removeFromFavorites = useFavoriteRepoStore(
    (state) => state.removeFromFavorites
  )

  const handleAddToFavorites = useCallback((repoId: number) => {
    addToFavorites(repoId)
  }, [])

  const handleRemoveFromFavorites = useCallback((repoId: number) => {
    removeFromFavorites(repoId)
  }, [])

  return (
    <div className="App">
      {data?.map((repo) => (
        <Card
          key={repo.id}
          repo={repo}
          addToFavorites={handleAddToFavorites}
          removeFromFavorites={handleRemoveFromFavorites}
          isFavorite={favoriteRepoIds.includes(repo.id)}
        />
      ))}
    </div>
  )
}

export default App
