import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, AlertCircle, CheckCircle } from 'lucide-react';
import { adminService } from '../../services/adminService';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

const ElectionControl: React.FC = () => {
  const [electionStatus, setElectionStatus] = useState<'active' | 'inactive'>('inactive');
  const [showStartModal, setShowStartModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try{
      const res = await adminService.getElectionStatus('1');
      setElectionStatus(res?'active':'inactive')
      }catch(error){
        console.log("error while fetching election status",error);
      }
    }
    fetchStatus();
  },[])

  const handleStartElection = async () => {
    setLoading(true);
    try {
      await adminService.startElection({electionId: '1' });
      setElectionStatus('active');
      toast.success('Election started successfully!');
      setShowStartModal(false);
    } catch (error) {
      toast.error('Failed to start election');
    } finally {
      setLoading(false);
    }
  };

  const handleStopElection = async () => {
    setLoading(true);
    try {
      await adminService.stopElection({ electionId: '1' });  
      setElectionStatus('inactive');
      toast.success('Election stopped successfully!');
      setShowStopModal(false);
    } catch (error) {
      toast.error('Failed to stop election');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Election Control</h1>
        <p className="text-gray-600 mt-2">
          Manage the election process - start or stop voting periods.
        </p>
      </div>

      {/* Election Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg p-6 border-2 ${
          electionStatus === 'active'
            ? 'border-green-200 bg-green-50'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-3">
          {electionStatus === 'active' ? (
            <CheckCircle className="h-8 w-8 text-green-600" />
          ) : (
            <AlertCircle className="h-8 w-8 text-gray-600" />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Election Status: {electionStatus === 'active' ? 'Active' : 'Inactive'}
            </h2>
            <p className="text-gray-600">
              {electionStatus === 'active'
                ? 'Voting is currently open and users can cast their votes.'
                : 'Voting is currently closed. No votes can be cast at this time.'
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Start Election</h3>
              <p className="text-sm text-gray-600">Open voting for all registered users</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowStartModal(true)}
            disabled={electionStatus === 'active'}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {electionStatus === 'active' ? 'Election Already Active' : 'Start Election'}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-red-100">
              <Square className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Stop Election</h3>
              <p className="text-sm text-gray-600">Close voting and finalize results</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowStopModal(true)}
            disabled={electionStatus === 'inactive'}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {electionStatus === 'inactive' ? 'Election Already Stopped' : 'Stop Election'}
          </motion.button>
        </motion.div>
      </div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
      >
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <div>
            <h3 className="text-yellow-800 font-medium">Important Notice</h3>
            <p className="text-yellow-700 text-sm mt-1">
              Starting or stopping an election will affect all users. Make sure to communicate any changes to voters and coordinators.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Start Election Modal */}
      <Modal
        isOpen={showStartModal}
        onClose={() => !loading && setShowStartModal(false)}
        title="Start Election"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to start the election? This will allow all registered users to cast their votes.
          </p>
          <div className="flex space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartElection}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Starting...' : 'Start Election'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowStartModal(false)}
              disabled={loading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Modal>

      {/* Stop Election Modal */}
      <Modal
        isOpen={showStopModal}
        onClose={() => !loading && setShowStopModal(false)}
        title="Stop Election"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to stop the election? This will close voting and finalize the results. This action cannot be undone.
          </p>
          <div className="flex space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStopElection}
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Stopping...' : 'Stop Election'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowStopModal(false)}
              disabled={loading}
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

export default ElectionControl;