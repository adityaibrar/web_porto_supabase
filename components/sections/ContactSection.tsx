"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { type Profile } from "@/app/page";

interface ContactSectionProps {
  profile: Profile | null;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 px-6">
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
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-300">{profile.email}</p>
                </div>
              </div>
            )}

            {profile?.phone && (
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-300">{profile.phone}</p>
                </div>
              </div>
            )}

            {profile?.location && (
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-gray-300">{profile.location}</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Subject"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your message..."
                      rows={5}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 resize-none"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
