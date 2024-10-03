"use client";

import ContactForm from "@/components/pages/contact/ContactForm";

const ContactPage = () => {
  return (
    <main className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg border border-gray-300">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 inline-block px-4 py-2 bg-white relative -top-4">
            Formulaire de Contact
          </h2>
        </div>
        <ContactForm />
      </div>
    </main>
  );
};

export default ContactPage;
