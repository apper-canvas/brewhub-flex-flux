import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange/30 border-t-orange rounded-full mx-auto mb-4"
        />
        <h3 className="font-display text-xl text-coffee mb-2">Loading...</h3>
        <p className="text-gray-600">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}

export default Loading