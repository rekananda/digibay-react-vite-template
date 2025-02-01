import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// app css
import "@/common/presentation/view/styles/tailwind.css";
import "@/common/presentation/view/styles/font.css";
import "@/common/presentation/view/styles/index.scss";
import "@/common/presentation/view/styles/mantine.scss";
// mantine css
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/tiptap/styles.css'
// plugin css
import "mantine-react-table/styles.css"
import "react-toastify/dist/ReactToastify.css"

import App from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
