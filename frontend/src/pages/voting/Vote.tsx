import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { voteService } from '../../services/voteService';
import CandidateCard from '../../components/voting/CandidateCard';
import Modal from '../../components/common/Modal';
import { CandidateView } from '../../types';
import toast from 'react-hot-toast';

const Vote: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateView[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateView | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const  electionId = 1;


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await voteService.getCandidates();
         const mapped = data.map((item: CandidateView) => ({
                     id : item.id,
                     userId:item.userId,
                     name : item.name,
                }));
        setCandidates(mapped);
      } catch (error) {
        toast.error('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
    
    // Check if user has already voted (you might want to get this from API)
    const votedStatus = localStorage.getItem('has_voted');
   
    setHasVoted(votedStatus === 'true');
     console.log("votestatus",votedStatus)
  }, []);

  const handleVoteClick = (candidateId: string) => {
    console.log("checking candidates list before selecting them",candidates)
    const candidate = candidates.find(c => Number(c.userId) === Number(candidateId));
    console.log("selected candidate to vote",candidate)
    setSelectedCandidate(candidate || null);
    setShowConfirmModal(true);
  };

  const confirmVote = async () => {
    if (!selectedCandidate) return;
    
    setVoting(true);
    try {
      await voteService.addVote({  candidateId: Number(selectedCandidate.userId),electionId: Number(electionId)});
      setHasVoted(true);
      localStorage.setItem('has_voted', 'true');
      toast.success(`Vote cast successfully for ${selectedCandidate.name}!`);
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Failed to cast vote', error);
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cast Your Vote</h1>
        <p className="text-gray-600 mt-2">
          Select your preferred candidate below. You can only vote once.
        </p>
      </div>

      {hasVoted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
        >
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="text-green-800 font-medium">Vote Submitted</h3>
            <p className="text-green-700 text-sm">Thank you for participating in the election!</p>
          </div>
        </motion.div>
      )}

      {!hasVoted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3"
        >
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-blue-800 font-medium">Voting Instructions</h3>
            <p className="text-blue-700 text-sm">
              Click on the "Vote" button next to your preferred candidate. Your vote will be final and cannot be changed.
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CandidateCard
              candidate={candidate}
              onVote={() => handleVoteClick(candidate.userId)}
              canVote={!hasVoted}
              hasVoted={hasVoted}
            />
          </motion.div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => !voting && setShowConfirmModal(false)}
        title="Confirm Your Vote"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to vote for <strong>{selectedCandidate?.name}</strong>?
          </p>
          <p className="text-sm text-gray-600">
            This action cannot be undone. You will not be able to change your vote once submitted.
          </p>
          <div className="flex space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={confirmVote}
              disabled={voting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {voting ? 'Casting Vote...' : 'Confirm Vote'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfirmModal(false)}
              disabled={voting}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Vote;
