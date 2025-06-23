"use client";

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { sendEmail, FormState } from '../app/gabriele-dagostino/actions';
import { FiSend } from 'react-icons/fi';

const initialState: FormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      aria-disabled={pending}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg transition-all duration-300 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Invio...</span>
        </>
      ) : (
        <>
          <FiSend />
          <span>Invia Messaggio</span>
        </>
      )}
    </button>
  );
}

export const ContactForm = () => {
  const [state, formAction] = useActionState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6 w-full max-w-lg mx-auto">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">Nome</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">Messaggio</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          required 
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors"
        ></textarea>
      </div>
      <SubmitButton />
      {state.message && (
        <p className={`mt-4 text-center text-sm ${state.success ? 'text-green-400' : 'text-red-400'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}; 