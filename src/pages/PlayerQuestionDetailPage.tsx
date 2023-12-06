import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

export function playerQuestionDetailsPagePath(
  playerId: string,
  questionId: string
) {
  return `/players/${playerId}/questions/${questionId}`;
}

export const PlayerQuestionDetailPage: FunctionComponent<{}> = () => {
  const params = useParams<{ playerId: string; questionId: string }>();
  console.log({ params });
  // try {
  //   console.log('??');
  //   set(child(playersRef, 'player1'), {
  //     question1: [true, false],
  //   });
  // } catch (error) {
  //   console.log({ error });
  // }

  return <div>PlayerQuestionDetailPage works</div>;
};
