import React from 'react';
import { Link } from 'react-router';
import { Lock, ShieldAlert, Home } from 'lucide-react';
import { motion } from 'framer-motion';
console.log(motion)

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
        >
        {/* Animated Icon */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -5, 5, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-red-600 to-red-700 mb-8 shadow-xl"
          >
          <Lock size={56} className="text-white" />
        </motion.div>

        {/* Error Title */}
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600"
          >
          403 Forbidden
        </motion.h1>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
          >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldAlert className="text-yellow-400" size={24} />
            <p className="text-xl font-medium text-gray-300">
              Access Denied
            </p>
          </div>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            You don't have permission to access this resource. Please verify your credentials or contact support if you believe this is an error.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <Home size={18} />
            Return Home
          </Link>
          
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 text-sm text-gray-500"
        >
          Error code: 403_FORBIDDEN_ACCESS
        </motion.p>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500 filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};

export default Forbidden;