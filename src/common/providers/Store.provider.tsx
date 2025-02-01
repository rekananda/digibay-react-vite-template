import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../presentation/view-model/store'

type ProviderProps = {
  children: React.ReactNode
}

const StoreProvider = ({ children }: ProviderProps) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider