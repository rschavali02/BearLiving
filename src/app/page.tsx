"use client";

import React, { useState } from "react";
import axios from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle, FastForward, GraduationCap } from "lucide-react";
import Link from "next/link";
import Modal from "@/components/Modal";

const perks = [
  {
    name: "Quick-to-Use, Easy-to-Find",
    Icon: FastForward,
    description: "Find your dream Sublet for the semester/year as painlessly as possible."
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description: "Every location on our website is verified to ensure highest quality"
  },
  {
    name: "For Students, By Students",
    Icon: GraduationCap,
    description: "Sublets by Students for Students, built by a Student"
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ email: "", message: "" }); // Clear form data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/email', formData);
      alert("Email sent successfully");
      handleModalClose(); // Close the modal and clear form data after successful form submission
    } catch (error) {
      console.error("There was an error sending the email!", error);
    }
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Student-To-Student Marketplace for High Quality{" "}
            <span className="text-red-600">Subletting</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            At BearLiving, we connect students with available sublets.<br />
            Fill out the Google form in the top right to BUY or SELL. <br />
            Buyers receive a ranked list of sublets by best fit, emailed directly to you for time-efficient shopping!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href='/sign-up' className={buttonVariants()}>
              Join Our Waitlist for Updates
            </Link>
            <Button variant='ghost' onClick={handleModalOpen}>
              Email Us! &rarr;
            </Button>
          </div>
        </div>

        {/* TODO: List Products */}
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:text-left lg:block lg:text-center">
                <div className="md: flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 text-red-900">
                    {<perk.Icon className="w-5/12 h-5/12" />}
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Email Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-xl font-bold mb-4">Email Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Type your message here"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="mr-2" onClick={handleModalClose}>Send</Button>
            <Button type="button" variant="outline" onClick={handleModalClose}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
