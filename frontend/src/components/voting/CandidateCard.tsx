import React from 'react';
import { motion } from 'framer-motion';
import { User, Vote } from 'lucide-react';
import { CandidateView } from '../../types';

interface CandidateCardProps {
  candidate: CandidateView;
  onVote?: (candidateId: string) => void;
  canVote?: boolean;
  hasVoted?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onVote, 
  canVote = true,
  hasVoted = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-100 rounded-full p-3">
          <User className="h-8 w-8 text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-500">Candidate ID: {candidate.id}</p>
        </div>
      </div>

      {canVote && onVote && (
        <motion.button
          whileHover={{ scale: hasVoted ? 1 : 1.02 }}
          whileTap={{ scale: hasVoted ? 1 : 0.98 }}
          onClick={() => !hasVoted && onVote(candidate.userId)}
          disabled={hasVoted}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            hasVoted
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Vote className="h-4 w-4" />
          <span>{hasVoted ? 'Voted' : 'Vote'}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default CandidateCard;
