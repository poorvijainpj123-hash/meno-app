import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus('server not reachable'))
  }, [])

  return (
    <div>
      <h1>meno.app</h1>
      <p>Server: {status}</p>
    </div>
  )
}

export default App