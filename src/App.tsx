import { createHashRouter, Link, RouterProvider } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import {
  PlayerQuestionDetailPage,
  playerQuestionDetailsPagePath,
} from './pages/PlayerQuestionDetailPage';
import {
  QuestionDetailPage,
  questionDetailPagePath,
} from './pages/QuestionDetailPage';
import {
  QuestionListPage,
  questionListPagePath,
} from './pages/QuestionListPage';
import { EditQuestionModal } from './components/EditQuestionModal';

const router = createHashRouter([
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
    children: [
      {
        path: 'edit',
        element: <EditQuestionModal />,
      },
    ],
  },
  {
    path: playerQuestionDetailsPagePath(':playerId', ':questionId'),
    element: <PlayerQuestionDetailPage />,
  },
  {
    path: 'board',
    element: <BoardPage />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
