"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Cookie } from "lucide-react";

export default function Privacy() {
  const [activeTab, setActiveTab] = useState("privacy");

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab("privacy");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,107,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-semibold text-sm uppercase tracking-wider"
          >
            Legal Information
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
          >
            Legal <span className="text-gradient">Documents</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Review our privacy policy, terms of service, and cookie policy to understand how we protect and handle your information.
          </motion.p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger value="terms" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </TabsTrigger>
                <TabsTrigger value="cookies" className="flex items-center gap-2">
                  <Cookie className="w-4 h-4" />
                  Cookie Policy
                </TabsTrigger>
              </TabsList>

              {/* Privacy Policy */}
              <TabsContent value="privacy" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 md:p-12 shadow-card"
                >
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Privacy Policy
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <div className="space-y-6 text-muted-foreground">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        1. Introduction
                      </h3>
                      <p>
                        Top Tier Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        2. Information We Collect
                      </h3>
                      <p className="mb-3">We may collect information about you in various ways:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and job title when you contact us or request services.</li>
                        <li><strong>Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, pages visited, and time spent on pages.</li>
                        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        3. How We Use Your Information
                      </h3>
                      <p className="mb-3">We use the information we collect to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Respond to your inquiries and provide customer support</li>
                        <li>Send you marketing communications (with your consent)</li>
                        <li>Analyze website usage and improve user experience</li>
                        <li>Comply with legal obligations and protect our rights</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        4. Information Sharing and Disclosure
                      </h3>
                      <p>
                        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                        <li>With service providers who assist us in operating our website and conducting our business</li>
                        <li>When required by law or to protect our rights and safety</li>
                        <li>In connection with a business transfer or merger</li>
                        <li>With your explicit consent</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        5. Data Security
                      </h3>
                      <p>
                        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        6. Your Rights
                      </h3>
                      <p className="mb-3">You have the right to:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Access and receive a copy of your personal information</li>
                        <li>Rectify inaccurate or incomplete information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Object to processing of your personal information</li>
                        <li>Withdraw consent at any time</li>
                        <li>Opt-out of marketing communications</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        7. Data Retention
                      </h3>
                      <p>
                        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        8. Children's Privacy
                      </h3>
                      <p>
                        Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        9. Changes to This Privacy Policy
                      </h3>
                      <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        10. Contact Us
                      </h3>
                      <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                      </p>
                      <p className="mt-2">
                        <strong>Email:</strong> info@tttech.com.sa<br />
                        <strong>Address:</strong> Top Tier Tech, 12245 Riyadh.Al Sulaimaniyah Dist
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Terms of Service */}
              <TabsContent value="terms" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 md:p-12 shadow-card"
                >
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Terms of Service
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <div className="space-y-6 text-muted-foreground">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        1. Acceptance of Terms
                      </h3>
                      <p>
                        By accessing and using the Top Tier Tech website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our website or services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        2. Use License
                      </h3>
                      <p className="mb-3">
                        Permission is granted to temporarily access the materials on Top Tier Tech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose or for any public display</li>
                        <li>Attempt to reverse engineer any software contained on the website</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        3. Services
                      </h3>
                      <p>
                        Top Tier Tech provides digital transformation consulting, technology advisory, and related services. All services are subject to separate service agreements that will be executed between Top Tier Tech and the client. The information on this website is for general informational purposes only and does not constitute professional advice.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        4. User Accounts
                      </h3>
                      <p>
                        If you create an account with us, you are responsible for maintaining the security of your account and password. You agree to accept responsibility for all activities that occur under your account.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        5. Prohibited Uses
                      </h3>
                      <p className="mb-3">You may not use our website or services:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>In any way that violates any applicable law or regulation</li>
                        <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                        <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                        <li>In any way that infringes upon the rights of others</li>
                        <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        6. Intellectual Property
                      </h3>
                      <p>
                        All content, features, and functionality of the website, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of Top Tier Tech and are protected by copyright, trademark, and other intellectual property laws.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        7. Disclaimer
                      </h3>
                      <p>
                        The materials on Top Tier Tech's website are provided on an 'as is' basis. Top Tier Tech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        8. Limitations of Liability
                      </h3>
                      <p>
                        In no event shall Top Tier Tech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Top Tier Tech's website, even if Top Tier Tech or an authorized representative has been notified orally or in writing of the possibility of such damage.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        9. Indemnification
                      </h3>
                      <p>
                        You agree to indemnify, defend, and hold harmless Top Tier Tech, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the website or services.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        10. Governing Law
                      </h3>
                      <p>
                        These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        11. Changes to Terms
                      </h3>
                      <p>
                        We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last Updated" date.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        12. Contact Information
                      </h3>
                      <p>
                        If you have any questions about these Terms of Service, please contact us at:
                      </p>
                      <p className="mt-2">
                        <strong>Email:</strong> legal@toptiertech.com<br />
                        <strong>Address:</strong> Top Tier Tech, 12245 Riyadh.Al Sulaimaniyah Dist
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Cookie Policy */}
              <TabsContent value="cookies" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 md:p-12 shadow-card"
                >
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Cookie Policy
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>

                  <div className="space-y-6 text-muted-foreground">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        1. What Are Cookies?
                      </h3>
                      <p>
                        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        2. How We Use Cookies
                      </h3>
                      <p className="mb-3">Top Tier Tech uses cookies for the following purposes:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off.</li>
                        <li><strong>Analytics Cookies:</strong> We use analytics cookies to understand how visitors interact with our website, helping us improve user experience.</li>
                        <li><strong>Functional Cookies:</strong> These cookies enable enhanced functionality and personalization, such as remembering your preferences.</li>
                        <li><strong>Marketing Cookies:</strong> These cookies are used to deliver relevant advertisements and track campaign effectiveness.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        3. Types of Cookies We Use
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Session Cookies</h4>
                          <p>These are temporary cookies that are deleted when you close your browser. They help maintain your session while navigating the website.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Persistent Cookies</h4>
                          <p>These cookies remain on your device for a set period or until you delete them. They help us remember your preferences and improve your experience.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Third-Party Cookies</h4>
                          <p>These cookies are set by third-party services that appear on our pages, such as analytics providers or advertising networks.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        4. Managing Cookies
                      </h3>
                      <p className="mb-3">
                        You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.
                      </p>
                      <p className="mb-3">To manage cookies, you can:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Adjust your browser settings to block or delete cookies</li>
                        <li>Use browser extensions that manage cookies</li>
                        <li>Use our cookie consent banner to manage your preferences</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        5. Third-Party Cookies
                      </h3>
                      <p>
                        Some cookies are placed by third-party services that appear on our pages. We do not control the setting of these cookies, so please check the third-party websites for more information about their cookies and how to manage them.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        6. Updates to This Cookie Policy
                      </h3>
                      <p>
                        We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3">
                        7. Contact Us
                      </h3>
                      <p>
                        If you have any questions about our use of cookies, please contact us at:
                      </p>
                      <p className="mt-2">
                        <strong>Email:</strong> info@tttech.com.sa<br />
                        <strong>Address:</strong> Top Tier Tech, 12245 Riyadh.Al Sulaimaniyah Dist
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
