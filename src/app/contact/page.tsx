'use client';

import React, { useState } from 'react';
import { analytics } from '@/lib/analytics';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  contactPreference: 'email' | 'phone';
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
    contactPreference: 'email',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is your current delivery radius?',
      answer:
        'We deliver within an 8-mile radius of our Downtown kitchen (142 Green Street). This ensures all hot meals arrive at optimal eating temperature in 25 to 35 minutes.',
    },
    {
      question: 'How do you handle severe allergies (nuts, gluten, dairy)?',
      answer:
        'Our kitchen has dedicated prep lines for gluten-free and allergen-sensitive orders. Every item on our menu clearly lists its allergens. If you have an extreme allergy, please mention it in the order notes and our chef will take special precautions.',
    },
    {
      question: 'Do you offer office catering or bulk meal orders?',
      answer:
        'Yes! We provide corporate lunch catering, bowl buffets, and private event packages for groups of 10 to 200 people. Please submit a catering inquiry using this form at least 24 hours in advance.',
    },
    {
      question: 'What if my order is delayed or missing an item?',
      answer:
        'We stand behind every meal. If your delivery is delayed or anything is missing, contact our live dispatch team via phone at (555) 382-7483 or message us here, and we will issue an immediate replacement or credit.',
    },
  ];

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.firstName.trim()) {
      errs.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      errs.lastName = 'Last name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message or question.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your inquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `FB-MSG-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);

      const domain = formData.email.includes('@') ? formData.email.split('@')[1] : 'unknown';
      analytics.trackContactSubmit(formData.inquiryType, domain);
    }, 800);
  };

  const handleResetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      inquiryType: 'general',
      message: '',
      contactPreference: 'email',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
          We&apos;re Here to Help
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          Get in Touch with FreshBite
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Have a question about an order, catering, dietary ingredients, or just want to say hi? Send us a note and our kitchen team will reply promptly.
        </p>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs">
          {isSubmitted ? (
            <div className="py-12 px-4 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-stone-900">
                Message Received!
              </h2>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-stone-900">{formData.firstName}</strong>. We have logged your inquiry and sent an acknowledgment to <strong className="text-stone-900">{formData.email}</strong>.
              </p>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-sm mx-auto text-xs text-stone-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Reference Number:</span>
                  <span className="font-mono font-bold text-stone-900">{referenceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Inquiry Topic:</span>
                  <span className="capitalize font-semibold text-stone-800">{formData.inquiryType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Response ETA:</span>
                  <span className="font-semibold text-emerald-700">Within 2 hours</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h2 className="font-bold text-stone-900 text-lg">Send Our Kitchen a Message</h2>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold text-stone-700 mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    onFocus={() => analytics.trackFormInteraction('contact', 'firstName', 'focus')}
                    placeholder="e.g. Jordan"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.firstName
                        ? 'border-rose-300 bg-rose-50/40 focus:border-rose-500'
                        : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold text-stone-700 mb-1">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    onFocus={() => analytics.trackFormInteraction('contact', 'lastName', 'focus')}
                    placeholder="e.g. Taylor"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.lastName
                        ? 'border-rose-300 bg-rose-50/40 focus:border-rose-500'
                        : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => analytics.trackFormInteraction('contact', 'email', 'focus')}
                    placeholder="jordan@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-rose-300 bg-rose-50/40 focus:border-rose-500'
                        : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
                    Phone Number <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={() => analytics.trackFormInteraction('contact', 'phone', 'focus')}
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Inquiry Type & Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiryType" className="block text-xs font-bold text-stone-700 mb-1">
                    Topic of Inquiry
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="general">General Question</option>
                    <option value="order_support">Current or Past Order Support</option>
                    <option value="catering">Corporate &amp; Event Catering</option>
                    <option value="dietary">Dietary, Allergen, or Nutrition Info</option>
                    <option value="partnership">Local Farmer or Supplier Partnership</option>
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Reply Method
                  </span>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <label className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.contactPreference === 'email'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}>
                      <input
                        type="radio"
                        name="contactPreference"
                        value="email"
                        checked={formData.contactPreference === 'email'}
                        onChange={() => setFormData({ ...formData, contactPreference: 'email' })}
                        className="sr-only"
                      />
                      <span>Email</span>
                    </label>

                    <label className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.contactPreference === 'phone'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-stone-200 bg-stone-50 text-stone-600'
                    }`}>
                      <input
                        type="radio"
                        name="contactPreference"
                        value="phone"
                        checked={formData.contactPreference === 'phone'}
                        onChange={() => setFormData({ ...formData, contactPreference: 'phone' })}
                        className="sr-only"
                      />
                      <span>Phone Call</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-stone-700 mb-1">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => analytics.trackFormInteraction('contact', 'message', 'focus')}
                  placeholder="How can we assist you today? Please include any order numbers or event dates if applicable..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.message
                      ? 'border-rose-300 bg-rose-50/40 focus:border-rose-500'
                      : 'border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-track="contact-form-submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Sending message to kitchen...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Cards & Location */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick info boxes */}
          <div className="bg-stone-900 text-stone-200 p-6 rounded-3xl space-y-5 shadow-lg border border-stone-800">
            <h3 className="font-bold text-white text-base border-b border-stone-800 pb-3">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Order Hotline</p>
                  <p className="text-stone-300">(555) 382-7483</p>
                  <p className="text-stone-500 text-[11px]">Available during kitchen hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Email Inquiries</p>
                  <p className="text-stone-300">hello@freshbite-kitchen.demo</p>
                  <p className="text-stone-500 text-[11px]">Average response: &lt; 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center shrink-0 border border-sky-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Downtown Kitchen</p>
                  <p className="text-stone-300">142 Green Street, Suite 4B</p>
                  <p className="text-stone-300">Freshville, CA 94102</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Service Hours</p>
                  <p className="text-stone-300">Mon &ndash; Fri: 10:00 AM &ndash; 10:00 PM</p>
                  <p className="text-stone-300">Sat &ndash; Sun: 9:00 AM &ndash; 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Mock */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Kitchen Location
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Pickup Window Open
              </span>
            </div>

            {/* Stylized Map Viewport */}
            <div className="relative aspect-16/9 w-full bg-emerald-50 rounded-2xl overflow-hidden border border-emerald-100 flex items-center justify-center">
              {/* Grid map pattern lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="relative flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-2 bg-white/95 px-3 py-1 rounded-xl shadow-md border border-stone-200 text-xs font-bold text-stone-800">
                  FreshBite Kitchen #1
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5">142 Green Street, Freshville</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200/80 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl font-black text-stone-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
