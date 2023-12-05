import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import {
  QuestionDetailPage,
  questionDetailPagePath,
} from './pages/QuestionDetailPage';
import {
  QuestionListPage,
  questionListPagePath,
} from './pages/QuestionListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <div>Family Feud</div>
        <ul>
          <li>
            <Link to={questionListPagePath()}>Question List</Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: questionListPagePath(),
    element: <QuestionListPage />,
  },
  {
    path: questionDetailPagePath(':id'),
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
