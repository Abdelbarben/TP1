import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import api from '../api/axios'

export default function ProjectDetail() {

  const { id } = useParams()

  const [project, setProject] = useState<any>(null)

  useEffect(() => {

    async function fetchProject() {

      const res = await api.get('/projects/' + id)

      setProject(res.data)
    }

    fetchProject()

  }, [id])

  if (!project) return <div>Loading...</div>

  return (
    <div>

      <h1>{project.name}</h1>

      <p>ID : {project.id}</p>

    </div>
  )
}