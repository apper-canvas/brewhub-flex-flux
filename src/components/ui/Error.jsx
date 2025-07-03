import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Card variant="elevated" className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </motion.div>
        
        <h3 className="font-display text-xl text-coffee mb-2">Oops!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
      </Card>
    </div>
  )
}

export default Error