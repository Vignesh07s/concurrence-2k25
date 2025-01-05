import React from 'react';

const Contact = () => {
    return (
        <>
            {/* Header Section */}
            <section className="py-12 bg-gradient-to-r from-blue-600 to-green-500 text-white text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg">
                        Have questions? We're here to help. Get in touch with us for any queries or assistance.
                    </p>
                </div>
            </section>

            {/* General Contact Information */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-4 text-blue-600">Get in Touch</h2>
                            <p className="mb-4">
                                📞 <strong>Event Hotline:</strong> +91-9876543210
                            </p>
                            <p className="mb-4">
                                📧 <strong>Email:</strong> ripple2k25@cse.rgmcet.edu
                            </p>
                            <p className="mb-4">
                                📍 <strong>Address:</strong> RGMCET Campus, CSE Department
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-bold mb-4 text-blue-600">Follow Us</h2>
                            <div className="flex space-x-6">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <img src="/icons/instagram.svg" alt="Instagram" className="h-8 w-8 hover:scale-110 transition" />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <img src="/icons/facebook.svg" alt="Facebook" className="h-8 w-8 hover:scale-110 transition" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-8 w-8 hover:scale-110 transition" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Send Us a Message</h2>
                    <form className="max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-lg p-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="border p-3 rounded focus:ring-2 focus:ring-blue-500 w-full"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="border p-3 rounded focus:ring-2 focus:ring-blue-500 w-full"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="border p-3 rounded focus:ring-2 focus:ring-blue-500 w-full"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="border p-3 rounded focus:ring-2 focus:ring-blue-500 w-full h-32"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg w-full font-bold hover:opacity-90 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>

            {/* Key Contacts */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Key Contacts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <h4 className="font-bold text-lg">Head Coordinator</h4>
                            <p>Your Name</p>
                            <p>📞 +91-9876543210</p>
                            <p>📧 ripple2k25@cse.rgmcet.edu</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <h4 className="font-bold text-lg">Sponsorship Inquiries</h4>
                            <p>Coordinator Name</p>
                            <p>📞 +91-9876543222</p>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <h4 className="font-bold text-lg">Technical Support</h4>
                            <p>Coordinator Name</p>
                            <p>📞 +91-9876543233</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Maps Integration */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Find Us Here</h2>
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <iframe
                            title="Map showing RGMCET campus location"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30759.02529903764!2d78.3810054!3d15.4909844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5b49bf7e231ed%3A0xf209159e6bde969c!2sRajeev%20Gandhi%20Memorial%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1735946683024!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-blue-600 text-white text-center">
                <p>&copy; {new Date().getFullYear()} RIPPLE 2K25 | Organized by CSE Department</p>
            </footer>
        </>
    );
};

export default Contact;
