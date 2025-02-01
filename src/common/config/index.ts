import { MainConstantaI } from "../domain/types/index.d"

const MainConstanta:MainConstantaI = {
  env: import.meta.env.VITE_ENV||'production'
}

export default MainConstanta