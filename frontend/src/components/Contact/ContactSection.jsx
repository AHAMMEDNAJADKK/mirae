import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Private Residence',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.submitInquiry(formData);
      if (res.inquiryId) setInquiryId(res.inquiryId);
      setFormSubmitted(true);
    } catch (err) {
      console.error(err);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-[#060606] text-[#f4f3ef] pt-32 pb-16 px-6 sm:px-12 md:px-20 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Editorial Quote - Authentic from Brochure Page 20 */}
        <div className="mb-24 text-center md:text-left border-b border-white/[0.08] pb-20">
          <div className="text-6xl sm:text-8xl font-serif text-white/20 select-none -mb-4 font-light">
            “
          </div>
          <h2 className="font-architectural text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white uppercase tracking-tight max-w-5xl leading-[1.05]">
            Design is thinking made visual.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono-subtle text-subtle">
            <span>MIRAE ARC STUDIO • BY PMR INFRA LLP</span>
            <span className="mt-2 sm:mt-0">ESTABLISHED ON 50+ YEARS OF REAL CONSTRUCTION MASTERY</span>
          </div>
        </div>

        {/* Two-Column Layout: Direct Contact Info & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Authentic Studio Details */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-xs font-mono-subtle text-subtle uppercase tracking-[0.3em] block mb-3">
                DIRECT CONTACT
              </span>
              <h3 className="font-architectural text-2xl sm:text-3xl text-white font-light uppercase tracking-wider mb-6">
                START A CONVERSATION
              </h3>
              <p className="text-sm font-light text-[#9f9f9f] leading-relaxed max-w-md">
                We accept a discerning number of bespoke residential, commercial, and hospitality commissions annually to ensure meticulous design detailing and uncompromised execution.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/80 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-subtle text-subtle uppercase block">TELEPHONE</span>
                  <a href="tel:+919388330033" className="text-lg font-light text-white hover:underline">
                    +91 9388330033
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/80 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-subtle text-subtle uppercase block">OFFICIAL EMAIL</span>
                  <a href="mailto:miraearcstudio@gmail.com" className="text-lg font-light text-white hover:underline">
                    miraearcstudio@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/80 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-subtle text-subtle uppercase block">STUDIO LOCATION</span>
                  <span className="text-lg font-light text-white">
                    Malappuram, Kerala, India
                  </span>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-white/80 flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono-subtle text-subtle uppercase block">DIGITAL ADDRESS</span>
                  <a href="https://miraearc.com" target="_blank" rel="noreferrer" className="text-lg font-light text-white hover:underline">
                    miraearc.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Commission Form */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/[0.08] p-8 sm:p-12">
            <span className="text-xs font-mono-subtle text-subtle uppercase tracking-widest block mb-2">
              COMMISSION INQUIRY
            </span>
            <h4 className="font-architectural text-xl sm:text-2xl text-white font-light uppercase tracking-wider mb-8">
              Discuss Your Project
            </h4>

            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-white/90 mx-auto" />
                <h5 className="font-architectural text-xl text-white uppercase">
                  INQUIRY RECEIVED
                </h5>
                {inquiryId && (
                  <span className="inline-block font-mono-subtle text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1">
                    REFERENCE: {inquiryId}
                  </span>
                )}
                <p className="text-sm font-light text-[#a0a0a0] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to MIRAE arc studio. Our principal architects will review your project requirements and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-mono-subtle text-subtle uppercase block mb-2">
                      YOUR NAME *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Liam Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono-subtle text-subtle uppercase block mb-2">
                      PHONE NUMBER *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 / +1 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-mono-subtle text-subtle uppercase block mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono-subtle text-subtle uppercase block mb-2">
                      PROJECT CATEGORY
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors"
                    >
                      <option value="Private Residence">Private Residence / Villa</option>
                      <option value="Resort & Hospitality">Resort & Hospitality</option>
                      <option value="Residential High-Rise">Residential High-Rise</option>
                      <option value="Commercial & Dining">Commercial, Café & Dining</option>
                      <option value="Interior Architecture">Luxury Interior Architecture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono-subtle text-subtle uppercase block mb-2">
                    PROJECT VISION & SITE DETAILS
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Briefly describe your site location, timeline, and spatial intentions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black text-xs font-mono-subtle tracking-[0.25em] uppercase hover:bg-[#dedcd6] transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>SUBMIT ARCHITECTURAL INQUIRY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Sub-Footer & Copyright */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between text-xs font-mono-subtle text-subtle">
          <div>
            <span>© {new Date().getFullYear()} MIRAE ARC STUDIO BY PMR INFRA LLP. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">EDITORIAL TERMS</a>
            <span>•</span>
            <a href="#journey" className="hover:text-white transition-colors">RETURN TO TOP</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
