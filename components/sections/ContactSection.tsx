"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Profile } from "@/types/types";

interface ContactSectionProps {
  profile: Profile | null;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `*Message From Website Portofolio*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}
*Message:* ${formData.message}`;

    // Get phone number from profile (remove any non-numeric characters except +)
    const phoneNumber = profile?.phone?.replace(/[^\d+]/g, "") || "";

    if (!phoneNumber) {
      alert("WhatsApp number not configured");
      return;
    }

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300">
            Ready to bring your mobile app ideas to life? Let's discuss your
            next project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {profile?.email && (
              <motion.div className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer group">
                <motion.div
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-cyan-500/20 rounded-lg group-hover:shadow-lg group-hover:shadow-cyan-500/30"
                >
                  <Mail className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-300 group-hover:text-cyan-300 transition-colors">
                    {profile.email}
                  </p>
                </div>
              </motion.div>
            )}

            {profile?.phone && (
              <motion.div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer group">
                <motion.div
                  transition={{ duration: 0.6 }}
                  className="p-3 bg-blue-500/20 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/30"
                >
                  <Phone className="w-6 h-6 text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-300 group-hover:text-blue-300 transition-colors">
                    {profile.phone}
                  </p>
                </div>
              </motion.div>
            )}

            {profile?.location && (
              <motion.div className="flex items-center space-x-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer group">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-purple-500/20 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/30"
                >
                  <MapPin className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-gray-300 group-hover:text-purple-300 transition-colors">
                    {profile.location}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      rows={5}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none transition-all"
                      required
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 group"
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send to WhatsApp
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
