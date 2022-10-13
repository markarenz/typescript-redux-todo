import React from 'react';
import { useTodoSelector } from '../store/reduxHooks';
import { getCompletionStats } from '../helpers';

const CompletionStats: React.FC = () => {
  const { todos } = useTodoSelector((state) => state.todo);
  const completionStats = getCompletionStats(todos);
  return (
    <div className="text-right mt-4 mb-8" data-testid="completion-stats">
      {completionStats}
    </div>
  );
};

export default CompletionStats;
