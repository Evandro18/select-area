// @flow
import { useContext } from 'react'
import Context from './context'

type Result = {
  registerSelectedItem?: Function
}

function useRegister(): Result {
  const { registerSelectedItem } = useContext(Context)
  return { registerSelectedItem }
}

export default useRegister
