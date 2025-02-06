import React from "react";

const Contact = () => {
    const studentSecretaries = [
        { name: "Pinnapuram Varun", role: "Student Secretary", email: "varunroyalvk@gmail.com", phone: "8985523278" },
        { name: "P Lakshmi Vardhan Reddy", role: "Student Secretary", email: "plakshmivardhanreddy@gmail.com", phone: "6301894349" },
    ];

    const studentCoordinators = [
        { name: "G. Venkata Sandeep Reddy", role: "Coordinator", email: "gummireddysandeepreddy@gmail.com", phone: "9951747977" },
        { name: "Sura Sura Nagendra Babu", role: "Coordinator", email: "surasuranagendrababu@gmail.com", phone: "9398402419" },
    ];

    const technicalAssistants = [
        { name: "S Vigneshwara Reddy", role: "Technical Support", email: "vigneshwarareddys@gmail.com", phone: "8096343600" },
        { name: "K Pujith Kumar Reddy", role: "Technical Support", email: "pujithkalluru@gmail.com", phone: "8328221830" },
        { name: "P Bharath Kumar Reddy", role: "Technical Support", email: "bpippalla@gmail.com", phone: "7569716620" },
    ];

    return (
        <>
            <section className="py-12 bg-gradient-to-r from-blue-600 to-green-500 text-white text-center dark:from-gray-500 dark:to-gray-900">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg">
                        Have questions? We're here to help. Get in touch with us for any queries or assistance.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-3">

                    <div>
                        <h3 className="text-2xl font-bold text-blue-500 dark:text-white mb-4">Technical Assistance</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            For any website-related issues, registration problems, or payment screenshot upload difficulties, feel free to reach out to our technical assistance team.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                            {technicalAssistants.map((contact, index) => (
                                <ContactCard key={index} contact={contact} />
                            ))}
                        </div>
                    </div>


                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-blue-500 dark:text-white mb-4">Student Secretaries</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {studentSecretaries.map((contact, index) => (
                                <ContactCard key={index} contact={contact} />
                            ))}
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-blue-500 dark:text-white mb-4">Student Coordinators</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {studentCoordinators.map((contact, index) => (
                                <ContactCard key={index} contact={contact} />
                            ))}
                        </div>
                    </div>


                </div>
            </section>

            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-white mb-8">Find Us Here</h2>
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
        </>
    );
};

const ContactCard = ({ contact }) => (
    <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-3 h-28 w-68">
        <h4 className="font-bold text-lg text-gray-800 dark:text-white">{contact.name}</h4>
        <p>📧 <a href={`mailto:${contact.email}`} className="text-blue-500">{contact.email}</a></p>
        <p>📞 <a href={`tel:${contact.phone}`} className="text-blue-500">{contact.phone}</a></p>
    </div>
);

export default Contact;
