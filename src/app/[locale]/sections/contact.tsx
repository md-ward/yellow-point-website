import { SectionProps } from "@/types/sections.type";
import { NextPage } from "next";


const ContactSection: NextPage<SectionProps> = ({ sectionRefs }) => {
  return (
    <section
      id="contact"
      ref={(el) => {
        sectionRefs.current = el;
      }}
      className="h-screen panel bg-[#1a1a1a] text-white flex flex-col justify-center items-center px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-yellow-300 mb-6">
        Let’s Build Something Great
      </h2>
      <p className="text-gray-400 text-lg mb-6">
        Whether you&apos;re launching a new brand or scaling an existing one,
        we&apos;re here to help you break through. Let&apos;s start a
        conversation.
      </p>
      <form
        className="max-w-xl w-full space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message sent successfully!");
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full p-4 rounded bg-gray-800 text-white border border-gray-600 focus:outline-yellow-400"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-md"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
