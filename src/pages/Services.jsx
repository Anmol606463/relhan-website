import React from 'react';

const services = [
  {
    title: 'Robotics Lab Setup',
    description:
      'We provide end-to-end robotics lab setups with complete decoration, advanced kits, essential tools, and instructor training. Ideal for schools wanting to promote innovation.',
  },
  {
    title: 'Robotics Training Programs',
    description:
      'Structured training for school students from beginner to advanced levels, focusing on hands-on robotics, sensor integration, and real-world applications.',
  },
  {
    title: 'NEP 2020-Aligned Curriculum Design',
    description:
      'We create innovative and practical curriculum modules that align with the National Education Policy (NEP) 2020, encouraging experiential and skill-based learning.',
  },
  {
    title: 'AI Tools & Digital Skills Workshops',
    description:
      'Workshops on modern tools like Canva, web development platforms, and influencer branding. Helps students gain future-ready digital skills.',
  },
  {
    title: 'Prompt Engineering & ChatGPT Training',
    description:
      'Interactive training on writing effective prompts for AI tools like ChatGPT, ideal for enhancing creativity, productivity, and digital fluency.',
  },
  {
    title: 'Social Media & Digital Marketing Training',
    description:
      'Hands-on learning in content creation, branding, and advertising with real-time project implementation for school-level campaigns.',
  },
  {
    title: 'Custom School Training Solutions',
    description:
      'We provide tailor-made education technology solutions for both private and government schools, including curriculum design, teacher training, and infrastructure planning.',
  },
];

const Services = () => {
  return (
    <div className="bg-orange-400 min-h-screen py-12 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Core Services</h2>
        <p className="text-lg text-gray-600 mb-12">
          We proudly serve both private and government schools and are listed on the GeM (Government e-Marketplace) platform.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
              <p className="text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
