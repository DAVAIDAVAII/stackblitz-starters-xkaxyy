import React from 'react'
import { Button } from './ui/button'

interface PricingCardProps {
  plan: string
  priceMonthly: string
  priceYearly: string
  monthlyPriceId: string
  yearlyPriceId: string
  features: string[]
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  priceMonthly,
  priceYearly,
  monthlyPriceId,
  yearlyPriceId,
  features,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-white mb-4">{plan}</h3>
      <div className="mb-6">
        <p className="text-3xl font-bold text-teal-400">{priceMonthly}</p>
        <p className="text-gray-400">ou {priceYearly} anualmente</p>
      </div>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <svg
              className="w-4 h-4 mr-2 text-teal-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
        Escolher Plano
      </Button>
    </div>
  )
}

export default PricingCard