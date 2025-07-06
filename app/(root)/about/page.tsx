import React from 'react'
import { Heart, Award, Users, Clock, MapPin, Star } from 'lucide-react'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            About <span className="text-red-600">DePizzaTown</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our story, mission, and the passion that drives us to serve the best food in town.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2020, DePizzaTown began as a small family-owned restaurant with a big dream: to serve the most delicious and authentic food to our community. What started as a humble pizza place has grown into one of North Nazimabad's most beloved food destinations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our journey has been driven by a simple philosophy: use the freshest ingredients, maintain the highest quality standards, and treat every customer like family. Today, we're proud to serve thousands of happy customers who have made us their go-to choice for delicious meals.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Est. 2020</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>North Nazimabad</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <Image 
                    src="/pizza.png" 
                    alt="DePizzaTown" 
                    width={120} 
                    height={120}
                    className="mx-auto mb-4 rounded-full"
                  />
                  <p className="text-gray-600 font-medium">Our Restaurant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To provide exceptional food experiences that bring joy to our customers while maintaining the highest standards of quality and service.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every ingredient is carefully selected and every dish is prepared with love and attention to detail.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">
              We're proud to be part of the North Nazimabad community and strive to give back through local partnerships and community events.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose DePizzaTown?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fresh Ingredients</h3>
              <p className="text-sm text-gray-600">Daily sourced fresh vegetables and premium quality meat</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Average delivery time of 30-45 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">Consistent quality across all our dishes</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer First</h3>
              <p className="text-sm text-gray-600">Your satisfaction is our top priority</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
            <div className="text-gray-600">Menu Items</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">4.8</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">3+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Chefs</h3>
              <p className="text-gray-600">
                Experienced culinary experts who bring creativity and passion to every dish they prepare.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Team</h3>
              <p className="text-gray-600">
                Professional and friendly delivery personnel committed to getting your food to you quickly and safely.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Service</h3>
              <p className="text-gray-600">
                Dedicated team members who ensure every customer interaction is positive and memorable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience DePizzaTown?</h2>
            <p className="text-red-100 mb-6">
              Join thousands of satisfied customers who have made us their favorite food destination.
            </p>
            <a 
              href="/"
              className="bg-white text-red-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold inline-block"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage 