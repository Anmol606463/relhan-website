import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-orange-400 px-6 py-10 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-center text-black mb-6">
          About Us - Relhan Innovation Pvt. Ltd.
        </h1>

        {/* Who We Are Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Who We Are:</h2>
          <p className="text-lg leading-relaxed">
            Relhan Innovation Pvt. Ltd. is a forward-thinking edtech and innovation company that works at the intersection
            of education, robotics, and digital transformation. We specialize in setting up labs, providing hands-on workshops,
            and delivering digital tools training to schools across India.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">What We Do:</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Set up fully-equipped Robotics & Innovation Labs</li>
            <li>Deliver NEP 2020-aligned training programs</li>
            <li>Provide robotics kits and electronic components</li>
            <li>Offer digital marketing & AI tool training</li>
            <li>Cater to both online and offline clients across government and private institutions</li>
          </ul>
        </section>

        {/* Mission Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Our Mission:</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to bridge the gap between theory and technology by empowering students with practical, real-world knowledge.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
