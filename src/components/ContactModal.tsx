import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#1b003a] border border-white/10 w-full max-w-lg md:max-w-2xl rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto relative"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-full z-20 bg-[#1b003a]/80 backdrop-blur-md border border-white/5 shadow-lg"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-5 h-full">
                {/* Info Sidebar */}
                <div className="md:col-span-2 bg-gradient-to-b from-blue-900/40 to-purple-900/40 p-5 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
                  <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                      GET IN <span className="text-yellow-500">TOUCH</span>
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                      Wanna talk? Let's discuss your next big win together.
                    </p>
                  </div>

                  <div className="space-y-3 md:space-y-4 mt-6 md:mt-0">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="bg-yellow-500/10 p-2.5 rounded-xl text-yellow-500">
                        <Phone size={16} />
                      </div>
                      <div>
                        <p className="text-gray-500 font-bold uppercase text-[9px]">Call Us</p>
                        <p className="text-white text-xs md:text-sm">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-400">
                        <Mail size={16} />
                      </div>
                      <div>
                        <p className="text-gray-500 font-bold uppercase text-[9px]">Email Support</p>
                        <p className="text-white text-xs md:text-sm">support@goamatkaa.in</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Section */}
                <div className="md:col-span-3 p-5 md:p-8 pt-12 md:pt-14 bg-[#1b003a]">
                  <form className="space-y-3 md:space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Your Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Message</label>
                      <textarea 
                        rows={3}
                        placeholder="How can we help?" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                      />
                    </div>
                    <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg mt-2">
                      <Send size={16} />
                      <span className="uppercase text-xs tracking-widest">Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
