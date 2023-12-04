import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { QuestionDetailPage } from './pages/QuestionDetailPage';
import { QuestionListPage } from './pages/QuestionListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <div>Family Feud</div>
        <ul>
          <li>
            <Link to="/questions">Question List</Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: '/questions',
    element: <QuestionListPage />,
  },
  {
    path: '/questions/:id',
    element: <QuestionDetailPage />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
