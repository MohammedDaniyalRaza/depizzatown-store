"use client"
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqData: FAQItem[] = [
    // Ordering
    {
      question: "How do I place an order?",
      answer: "You can place an order through our website by browsing our menu, adding items to your cart, and proceeding to checkout. We also accept phone orders at +92 300 123 4567.",
      category: "ordering"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash on delivery, online payments through our website, and mobile banking transfers. All major credit and debit cards are also accepted.",
      category: "ordering"
    },
    {
      question: "Can I modify my order after placing it?",
      answer: "You can modify your order within 5 minutes of placing it by calling us. After that, changes may not be possible as we start preparing your food immediately.",
      category: "ordering"
    },
    {
      question: "Is there a minimum order amount?",
      answer: "Yes, there is a minimum order amount of Rs. 500 for delivery orders. For pickup orders, there is no minimum amount.",
      category: "ordering"
    },

    // Delivery
    {
      question: "What are your delivery areas?",
      answer: "We deliver to North Nazimabad and surrounding areas within a 5km radius. Delivery charges vary based on distance, and free delivery is available for orders above Rs. 1000.",
      category: "delivery"
    },
    {
      question: "How long does delivery take?",
      answer: "Our average delivery time is 30-45 minutes. However, delivery times may vary during peak hours or bad weather conditions. We'll keep you updated on your order status.",
      category: "delivery"
    },
    {
      question: "Do you offer free delivery?",
      answer: "Yes! We offer free delivery on all orders above Rs. 1000. For smaller orders, a nominal delivery fee applies based on your location.",
      category: "delivery"
    },
    {
      question: "Can I track my delivery?",
      answer: "Yes, you can track your delivery through our website or by calling us. We'll also send you SMS updates about your order status.",
      category: "delivery"
    },

    // Menu & Food
    {
      question: "Are your ingredients fresh?",
      answer: "Absolutely! We use only the freshest ingredients sourced from local suppliers. Our vegetables are delivered daily, and our meat is sourced from certified suppliers.",
      category: "menu"
    },
    {
      question: "Do you offer vegetarian options?",
      answer: "Yes, we have a wide variety of vegetarian options including vegetarian pizzas, pasta, salads, and appetizers. All our vegetarian dishes are clearly marked on our menu.",
      category: "menu"
    },
    {
      question: "Can I customize my order?",
      answer: "Yes! You can customize your order by adding or removing toppings, choosing different sizes, and selecting your preferred spice level. Just let us know your preferences.",
      category: "menu"
    },
    {
      question: "Do you have gluten-free options?",
      answer: "We offer some gluten-free options, but please note that our kitchen handles gluten-containing ingredients. For severe allergies, please contact us before ordering.",
      category: "menu"
    },

    // Returns & Refunds
    {
      question: "What if my order is wrong or damaged?",
      answer: "If your order is incorrect or damaged, please contact us immediately. We'll either replace your order or provide a full refund. Your satisfaction is our priority.",
      category: "returns"
    },
    {
      question: "Can I cancel my order?",
      answer: "You can cancel your order within 10 minutes of placing it. After that, cancellation may not be possible as we start preparing your food. Please call us immediately for cancellations.",
      category: "returns"
    },
    {
      question: "How do refunds work?",
      answer: "Refunds are processed within 3-5 business days. For online payments, the refund will be credited back to your original payment method. For cash orders, we'll arrange a pickup or credit for your next order.",
      category: "returns"
    },

    // Business Hours & Location
    {
      question: "What are your business hours?",
      answer: "We're open Monday to Friday from 11:00 AM to 11:00 PM, and Saturday to Sunday from 12:00 PM to 12:00 AM. We're closed on major holidays.",
      category: "business"
    },
    {
      question: "Do you offer catering for events?",
      answer: "Yes! We offer catering services for events, parties, and corporate functions. Please contact us at least 24 hours in advance for catering orders.",
      category: "business"
    },
    {
      question: "Can I dine in at your restaurant?",
      answer: "Currently, we offer takeout and delivery services only. We're working on opening our dine-in facility soon. Stay tuned for updates!",
      category: "business"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'ordering', name: 'Ordering' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'menu', name: 'Menu & Food' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'business', name: 'Business Hours & Location' }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our services, ordering process, and more.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Contact us directly and we'll be happy to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                Contact Us
              </a>
              <a 
                href="tel:+923001234567"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage 