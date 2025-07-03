import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'Nothing here yet', 
  description = 'Start by adding some items',
  actionText = 'Get Started',
  onAction,
  icon = 'Coffee'
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Card variant="elevated" className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-gradient-to-br from-orange to-caramel rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} size={40} className="text-white" />
        </motion.div>
        
        <h3 className="font-display text-2xl text-coffee mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {onAction && (
          <Button
            variant="primary"
            onClick={onAction}
            size="lg"
            className="shadow-lg"
          >
            {actionText}
          </Button>
        )}
      </Card>
    </div>
  )
}

export default Empty