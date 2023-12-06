import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import {
  QuestionDetailPage,
  questionDetailPagePath,
} from './pages/QuestionDetailPage';
import {
  QuestionListPage,
  questionListPagePath,
} from './pages/QuestionListPage';
import {
  PlayerQuestionDetailPage,
  playerQuestionDetailsPagePath,
} from './pages/PlayerQuestionDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <div>Not found</div>,
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
  {
    path: playerQuestionDetailsPagePath(':playerId', ':questionId'),
    element: <PlayerQuestionDetailPage />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
