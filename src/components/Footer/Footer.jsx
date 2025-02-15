import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo";

function Footer() {
  return (
    // <section className="relative overflow-hidden py-10 bg-indigo-200 mt-8 border-t-4 border-white">
    //   <div className="relative z-10 mx-auto max-w-7xl px-4">
    //     <div className="-m-6 flex flex-wrap">
    //       <div className="w-full p-6 md:w-1/2 lg:w-5/12">
    //         <div className="flex h-full flex-col justify-between">
    //           <div className="mb-4 inline-flex items-center">
    //             <Logo width="100px" />
    //           </div>
    //           <div>
    //             <p className="text-sm text-gray-600">
    //               &copy; Copyright 2023. All Rights Reserved by DevUI.
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    //         <div className="h-full">
    //           <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //             Company
    //           </h3>
    //           <ul>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Features
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Pricing
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Affiliate Program
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Press Kit
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>

    //       <div className="w-full p-6 md:w-1/2 lg:w-2/12">
    //         <div className="h-full">
    //           <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //             Support
    //           </h3>
    //           <ul>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Account
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Help
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Contact Us
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Customer Support
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>

    //       <div className="w-full p-6 md:w-1/2 lg:w-3/12">
    //         <div className="h-full">
    //           <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
    //             Legals
    //           </h3>
    //           <ul>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Terms &amp; Conditions
    //               </Link>
    //             </li>
    //             <li className="mb-4">
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Privacy Policy
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className=" text-base font-medium text-gray-900 hover:text-gray-700"
    //                 to="/"
    //               >
    //                 Licensing
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='relative overflow-hidden bg-black py-12 mt-8 border-t-2 border-yellow-400'
    >
      <div className='relative z-10 mx-auto max-w-7xl px-4'>
        <div className='-m-6 flex flex-wrap'>
          {/* Logo and Copyright Section */}
          <div className='w-full p-6 md:w-1/2 lg:w-5/12'>
            <div className='flex h-full flex-col justify-between'>
              <div className='mb-4 inline-flex items-center'>
                <Logo width='100px' className='text-white' />
              </div>
              <div>
                <p className='text-sm text-gray-400'>
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className='w-full p-6 md:w-1/2 lg:w-2/12'>
            <div className='h-full'>
              <h3 className='tracking-px mb-9 text-xs font-semibold uppercase text-gray-400'>
                Company
              </h3>
              <ul>
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                  (link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className='mb-4'
                    >
                      <Link
                        className='text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-300'
                        to='/'
                      >
                        {link}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className='w-full p-6 md:w-1/2 lg:w-2/12'>
            <div className='h-full'>
              <h3 className='tracking-px mb-9 text-xs font-semibold uppercase text-gray-400'>
                Support
              </h3>
              <ul>
                {["Account", "Help", "Contact Us", "Customer Support"].map(
                  (link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className='mb-4'
                    >
                      <Link
                        className='text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-300'
                        to='/'
                      >
                        {link}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Legals Links */}
          <div className='w-full p-6 md:w-1/2 lg:w-3/12'>
            <div className='h-full'>
              <h3 className='tracking-px mb-9 text-xs font-semibold uppercase text-gray-400'>
                Legals
              </h3>
              <ul>
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                  (link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className='mb-4'
                    >
                      <Link
                        className='text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-300'
                        to='/'
                      >
                        {link}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Footer;
