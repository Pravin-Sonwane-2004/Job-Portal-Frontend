// App is the top-level component that connects React Router to the whole project.
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

// App is the main React component exported from this file.
export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
