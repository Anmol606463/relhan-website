import React from "react";

const components = [
  {
    name: "Arduino UNO R3",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
    category: "Microcontroller",
    price: 499,
  },
  {
    name: "NodeMCU ESP8266",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/NodeMCU_DEVKIT_1.0.jpg",
    category: "Microcontroller",
    price: 299,
  },
  {
    name: "IR Sensor Module",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Infrared_Sensor_Module.jpg",
    category: "Sensor",
    price: 99,
  },
  {
    name: "Ultrasonic Sensor HC-SR04",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Hc-sr04_ultrasonic_sensor.jpg",
    category: "Sensor",
    price: 120,
  },
  {
    name: "MQ-2 Gas Sensor",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/76/MQ-2_Gas_Sensor_Module.jpg",
    category: "Sensor",
    price: 150,
  },
  {
    name: "L298N Motor Driver Module",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/L298N_Motor_Driver_Module.jpg",
    category: "Motor Driver",
    price: 250,
  },
  {
    name: "Breadboard",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/400_points_breadboard.jpg",
    category: "Prototyping",
    price: 50,
  },
  {
    name: "Jumper Wires (Male-Male)",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Jumper_wire_set.jpg",
    category: "Wiring",
    price: 20,
  },
  {
    name: "5V Power Adapter",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/5v-adapter.jpg",
    category: "Power Supply",
    price: 100,
  },
  {
    name: "LEDs Variety Pack",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/LEDs_variety.jpg",
    category: "Basic Component",
    price: 150,
  },
  {
    name: "Buzzer Module",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Buzzer_module.jpg",
    category: "Basic Component",
    price: 50,
  },
  {
    name: "Tactile Push Button",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Tactile_Button_Switch.jpg",
    category: "Switch",
    price: 20,
  },
];

// Razorpay script loader
function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Helper to save order to localStorage
function saveOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

const Catalog = () => {
  // Razorpay payment handler
  const handleRazorpay = async (item) => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Demo key, replace with your own in production
      amount: item.price * 100, // in paise
      currency: "INR",
      name: "Shopsy Catalog",
      description: `Purchase: ${item.name}`,
      image: item.image,
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Save order to localStorage
        saveOrder({
          name: item.name,
          image: item.image,
          category: item.category,
          price: item.price,
          paymentId: response.razorpay_payment_id,
          date: new Date().toLocaleString(),
        });
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#F97316",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Paytm payment handler (placeholder)
  const handlePaytm = (item) => {
    alert("Paytm integration coming soon! (Demo only)");
  };

  return (
    <div className="bg-orange-400 min-h-screen py-12 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Components Catalog</h2>
        <p className="text-lg text-center text-gray-600 mb-10">
          Browse and order electronics, sensors, and microcontrollers—perfect for hobbyists, students, and schools.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {components.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain bg-gray-800 p-4 rounded-t-xl"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-blue-700">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                <div className="text-orange-600 font-bold mb-3">₹{item.price}</div>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-3 rounded"
                    onClick={() => handleRazorpay(item)}
                  >
                    Pay with Razorpay
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded"
                    onClick={() => handlePaytm(item)}
                  >
                    Pay with Paytm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
