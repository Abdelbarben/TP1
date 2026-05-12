import { useState, useEffect } from 'react'

import api from '../api/axios'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'

import { useAuth } from '../features/auth/AuthContext'

interface Project {
  id: string
  name: string
  color: string
}

interface Column {
  id: string
  title: string
  tasks: string[]
}

export default function Dashboard() {

  const { state, dispatch } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [projects, setProjects] = useState<Project[]>([])
  const [columns, setColumns] = useState<Column[]>([])

  useEffect(() => {

    async function fetchData() {

      const proj = await api.get('/projects')
      const col = await api.get('/columns')

      setProjects(proj.data)
      setColumns(col.data)
    }

    fetchData()

  }, [])

  async function addProject() {

    const name = prompt('Nom du projet')

    if (!name) return

    const { data } = await api.post('/projects', {
      name,
      color: '#3498db'
    })

    setProjects(prev => [...prev, data])
  }

  async function deleteProject(id: string) {

    const confirmDelete = confirm('Supprimer ?')

    if (!confirmDelete) return

    await api.delete('/projects/' + id)

    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>

      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
        userName={state.user?.name}
        onLogout={() => dispatch({ type: 'LOGOUT' })}
      />

      <button onClick={addProject}>
        Ajouter Projet
      </button>

      <Sidebar projects={projects} isOpen={sidebarOpen} />

      <MainContent columns={columns} />

    </div>
  )
}