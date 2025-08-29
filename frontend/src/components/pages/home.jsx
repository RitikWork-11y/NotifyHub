import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faCreditCard,
  faUniversity,
  faWifi,
  faQuoteLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.3,
      },
    }),
  };

  const testimonials = [
    {
      name: "Jane Doe",
      role: "CEO, TechTrend",
      quote:
        "NotifyHub transformed our team's communication. Real-time alerts keep us ahead of the curve!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "John Smith",
      role: "Freelancer",
      quote:
        "The seamless integrations and analytics have saved me hours every week. Highly recommend!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const faqs = [
    {
      question: "What is NotifyHub?",
      answer:
        "NotifyHub is a powerful platform for real-time notifications, integrations, and analytics to streamline business communication.",
    },
    {
      question: "How does NotifyHub integrate with my existing tools?",
      answer:
        "NotifyHub supports integrations with popular tools like Slack, Trello, and more via our API and pre-built connectors.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for both our Plus and Premium plans. No credit card required!",
    },
  ];

  return (
    <>
      
      <div className="flex flex-col md:flex-row pt-20 px-6 md:px-16 justify-center items-center font-sans relative overflow-hidden mb-24 min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <div className="flex-1 flex flex-col items-center md:items-start justify-center mb-12 md:mb-0 md:mr-10 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[#0a2540] text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight mb-4"
          >
            Get notified instantly <br />
            <span className="text-3xl sm:text-4xl md:text-5xl">
              manage efficiently
            </span>
            <br />
            <span>all your alerts.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn", delay: 0.8 }}
            className="text-[#425466] text-base mb-6 max-w-md"
          >
            NotifyHub supports businesses with real-time notifications, powerful
            integrations, and advanced analytics tools.
          </motion.p>

          <motion.div
            key="left-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.6 }}
            className="w-full max-w-md"
          >
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="email"
                placeholder="Your business email"
                className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500 transition"
              />
              <button className="p-3 w-full sm:w-auto bg-gradient-to-r from-[#012B38] to-[#0e7c91] text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
                Get Started →
              </button>
            </div>
          </motion.div>
        </div>

        <div className="relative flex-1 flex items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            className="absolute -top-10 right-10 md:right-32 w-52 sm:w-60 h-32 sm:h-36 rounded-xl overflow-hidden shadow-2xl z-20 bg-gradient-to-br from-teal-400 to-teal-600"
          >
            <div className="h-3/5 p-4 text-white flex flex-col justify-between">
              <span className="text-sm">Notification Card</span>
              <p className="text-xl font-semibold">Alert: New Message</p>
            </div>
            <div className="bg-gray-900 h-2/5 flex items-center justify-between p-4 text-white">
              <FontAwesomeIcon icon={faWifi} className="text-lg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md z-10 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#00bfa5] p-2 rounded-full">
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="text-white text-xl"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-800">
                  Notify Hub
                </h3>
                <p className="text-xs text-gray-500">support@notifyhub.com</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">Latest Notification</p>
              <p className="text-3xl font-bold text-gray-800">500K+ Sent</p>
              <p className="text-xs text-gray-400 mt-1">August 28, 2025</p>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 flex-1">
                  Instant Alerts
                </span>
                <div className="w-4 h-4 rounded-full border-2 border-teal-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                </div>
              </label>

              <label className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition">
                <FontAwesomeIcon
                  icon={faUniversity}
                  className="text-gray-600"
                />
                <span className="text-sm font-medium text-gray-700 flex-1">
                  Team Updates
                </span>
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-[#012B38] to-[#0e7c91] text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition">
              Subscribe Now
            </button>
          </motion.div>
        </div>
      </div>

    
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            backgroundImage:
              "url('https://preview.redd.it/zo347zu2a1a71.png?width=1080&crop=smart&auto=webp&s=66e78ef2a2c9009f4edde8c0246c20045a76bdb2')",
          }}
          className="relative bg-cover bg-center bg-no-repeat rounded-xl shadow-2xl mt-32px p-6 md:p-10 h-[750px] w-full max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-xl inline-block text-3xl md:text-5xl p-4 font-serif text-left text-[#0a2540]"
          >
            Features – Why Use NotifyHub?
          </motion.h1>
          <motion.div
            className="absolute bottom-6 left-6 right-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8 }}
                className="w-full rounded-lg bg-gradient-to-br from-red-200/50 to-pink-200/50 backdrop-blur-md shadow-md p-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-black text-[1.2rem] font-serif"
                  >
                    Reach users with our platform now.
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-end items-start"
                  >
                    <div className="bg-white rounded-full p-2 shadow">
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-xl text-black"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white font-serif"
                  >
                    <span className="text-4xl text-neutral-700">+200%</span>
                    <br />
                    <span className="text-neutral-500">active users</span>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-white font-serif flex items-center"
                  >
                    <div className="flex -space-x-4">
                      {[
                        "men/32.jpg",
                        "women/44.jpg",
                        "men/65.jpg",
                        "men/69.jpg",
                        "men/15.jpg",
                      ].map((img, i) => (
                        <img
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 transition-all ease-in-out"
                          src={`https://randomuser.me/api/portraits/${img}`}
                          alt={`User ${i + 1}`}
                        />
                      ))}
                      <div className="w-10 h-10 rounded-full bg-white text-black border-2 border-white flex items-center justify-center text-xs font-bold">
                        +3
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full rounded-lg bg-gradient-to-br from-teal-200/50 to-blue-200/50 backdrop-blur-md shadow-md min-h-[200px] p-6"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, rotate: -30 },
                      visible: { opacity: 1, rotate: 0 },
                    }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex-shrink-0"
                  >
                    <img
                      src="https://img.freepik.com/free-psd/notification-bell-with-single-wave-icon-3d-illustration_56104-2805.jpg?semt=ais_hybrid&w=740"
                      alt="Notification Icon"
                      className="w-12 h-12 rounded-full"
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="text-white font-serif"
                  >
                    <h2 className="text-xl font-semibold mb-1 text-black">
                      Stay in the Loop
                    </h2>
                    <p className="text-base text-neutral-700">
                      <strong>NotifyHub</strong> delivers instant updates and
                      seamless integrations with your apps, improving
                      productivity across your entire team. No more missed
                      alerts.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:p-10 h-[750px] w-full max-w-4xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-4xl font-bold text-teal-600">3k+</h2>
              <p className="text-lg font-medium text-gray-800 mt-2">
                Businesses already running on NotifyHub
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
              className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-sm"
            >
              <p className="text-lg font-medium text-gray-800 mb-4">
                Instant check messages, notifications, blogs, and newsletters
                around the world!
              </p>
              <div className="flex items-center justify-start space-x-4 mt-auto">
                <div className="bg-teal-600 p-3 rounded-full text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M2 12l5-4v3h9v2H7v3l-5-4zm15-9h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2V3z" />
                  </svg>
                </div>
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h8m-8 0l4-4m0 8l-4-4"
                  />
                </svg>
                <div className="bg-gray-800 p-3 rounded-full text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M4 10V8l8-4 8 4v2l-8 4-8-4zm0 4v2l8 4 8-4v-2l-8 4-8-4z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeIn" }}
              className="md:col-span-2 bg-white rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  No Third Party Risk
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Generate engagement and benefits on your profile.
                </p>
              </div>
              <div className="bg-gradient-to-t from-teal-100 to-white rounded-lg shadow-md p-4 w-full md:w-1/2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-gray-900">
                    $1,876,580
                  </span>
                  <span className="text-sm text-gray-500">6 Months</span>
                </div>
                <div className="h-32 relative overflow-hidden">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path
                      d="M0,90 L30,70 L60,55 L90,50 L120,40 L150,25 L180,10"
                      stroke="#14b8a6"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

     
      <section className="bg-gradient-to-b from-[#032B43] to-[#021e28] text-white py-16 px-4 md:px-16 mt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-sm text-teal-300 uppercase tracking-wide mb-2">
              Steps
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight max-w-xl">
              Maximize your efficiency with NotifyHub's powerful features.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((step, i) => (
              <motion.div
                key={step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gradient-to-br from-[#04314d] to-[#032B43] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl font-bold text-teal-300 mb-4">
                  {step}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {step === 1 && "Open your account"}
                  {step === 2 && "Integrate your systems"}
                  {step === 3 && "Monitor and analyze"}
                </h3>
                <p className="text-sm text-gray-300">
                  {step === 1 &&
                    "Sign up to NotifyHub and set up your account from the dashboard."}
                  {step === 2 &&
                    "Connect your apps and receive instant notifications for important events."}
                  {step === 3 &&
                    "Track performance with advanced analytics and get insights in real-time."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-white text-[#0a2540] py-16 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm text-teal-500 uppercase tracking-wide mb-2">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              What Our Users Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-teal-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-teal-500 text-2xl mb-2"
                />
                <p className="text-gray-600">{testimonial.quote}</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-gradient-to-b from-teal-50 to-white text-[#0a2540] py-16 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm text-teal-500 uppercase tracking-wide mb-2">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Got Questions? We Have Answers
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#012B38] to-[#0e7c91] text-white py-16 px-4 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-teal-300 uppercase tracking-wide mb-2">
              Stay Updated
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Get the latest updates, tips, and insights from NotifyHub
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full sm:w-2/3 rounded-lg border bg-gray-300 border-gray-300 focus:outline-none focus:border-teal-500 text-gray-800"
              />
              <motion.button
                className="p-3 w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

   
      <section className="bg-white text-[#0a2540] mt-40">
        <motion.div
          className="max-w-6xl mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="uppercase text-sm text-teal-500 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Mission
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Empowering businesses <br /> with Notify Hub
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Thousands of companies across industries rely on Notify Hub to
            streamline communication, boost engagement, and deliver real-time
            notifications.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-center p-4 rounded-lg bg-teal-50"
            >
              <p className="text-2xl font-bold">35%</p>
              <p className="text-sm text-gray-500">Increase in engagement</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-center p-4 rounded-lg bg-teal-50"
            >
              <p className="text-2xl font-bold">500K</p>
              <p className="text-sm text-gray-500">Notifications sent daily</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-center p-4 rounded-lg bg-teal-50"
            >
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-gray-500">Uptime reliability</p>
            </motion.div>
          </motion.div>

          <motion.p
            className="uppercase text-xs text-gray-400 tracking-wide mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            Choose your plan:
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Plus</h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium">£4.99/month</p>
                <span className="text-lg">↗</span>
              </div>
              <p className="text-gray-600 mb-4">
                Ideal for small teams and startups looking to streamline
                notifications.
              </p>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>✔ Up to 1,000 notifications/month</li>
                <li>✔ Email & SMS support</li>
                <li>✔ Basic analytics dashboard</li>
                <li>✔ 1 user account</li>
                <li>✔ 24/7 email support</li>
              </ul>
              <button className="w-full bg-gradient-to-br from-[#0e7c91] to-[#012B38] text-white rounded-xl p-6 hover:shadow-md transition">
                Choose Plus
              </button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-[#0e7c91] to-[#012B38] text-white rounded-xl p-6 hover:shadow-md transition"
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Premium</h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium">£9.99/month</p>
                <span className="text-lg">↗</span>
              </div>
              <p className="text-gray-200 mb-4">
                Perfect for growing businesses needing advanced notification
                features.
              </p>
              <ul className="text-gray-200 space-y-2 mb-6">
                <li>✔ Up to 5,000 notifications/month</li>
                <li>✔ Email, SMS & Push notifications</li>
                <li>✔ Advanced analytics & reporting</li>
                <li>✔ Up to 5 user accounts</li>
                <li>✔ Priority 24/7 support</li>
              </ul>
              <button className="w-full bg-white text-[#0e7c91] py-2 rounded-lg hover:bg-gray-200 transition">
                Choose Premium
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-[#012B38] to-[#0e7c91] text-white rounded-4xl px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          >
            <div>
              <p className="uppercase text-xs text-teal-400 mb-2">Try it now</p>
              <h3 className="text-2xl font-semibold mb-2">
                Transform your <br /> communication with Notify Hub
              </h3>
              <p className="text-sm text-gray-300">
                Empower your business with real-time notifications, seamless
                integrations, and advanced analytics.
              </p>
            </div>
            <div className="flex gap-4">
              <motion.button
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>
              <motion.button
                className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#012B38] transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More ↗
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.footer
          className="bg-gradient-to-t from-gray-50 to-white py-10 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10 text-sm text-gray-700">
            <div>
              <h4 className="text-lg font-bold text-[#0a2540] mb-2">
                Notify Hub
              </h4>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Solutions</h5>
              <ul className="space-y-1">
                <li>Real-Time Alerts</li>
                <li>Team Collaboration</li>
                <li>Customer Engagement</li>
                <li>Analytics</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Company</h5>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Resources</h5>
              <ul className="space-y-1">
                <li>Blog</li>
                <li>Guides</li>
                <li>Webinars</li>
                <li>API Docs</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t pt-6 px-6 text-center text-sm text-gray-500">
            <p>© Notify Hub 2025. All Rights Reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <motion.a
                href="#"
                className="hover:text-black"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-black"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-black"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </motion.a>
            </div>
          </div>
        </motion.footer>
      </section>
    </>
  );
};

export default Home;
