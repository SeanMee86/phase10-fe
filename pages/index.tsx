import type { NextPage } from 'next'
import { Form } from '@components'
import Layout from './layout'
import { useContext, useEffect } from 'react'
import { GameContext } from './game.context'

const Home: NextPage = () => {

  const { rejoinMessage } = useContext(GameContext)

  useEffect(() => {
    const pass = localStorage.getItem("p10Pass");
    const uName = localStorage.getItem("p10Player");
    if (!pass || !uName) return;
    rejoinMessage()
  }, [])

  

  return (
    <Layout>
      <Form />
    </Layout>
  )
}

export default Home
