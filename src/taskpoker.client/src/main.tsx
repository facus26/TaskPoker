import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

// Comoponets
import Router from './router';
import { Layout } from './components/layout';
import { ThemeProvider } from './hooks/ThemeProvider';

// Styles
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <Layout>
        <Router />
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
)
